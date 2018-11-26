const   express = require("express"),
        router  = express.Router({mergeParams:true}),
        Image = require("../models/Image.model"),
        passport        = require("passport"),
        requireAuth     = passport.authenticate('jwt', {session:false});

//Index show all item
router.get("/",(req,res)=>{
    //get all item from db
    Image.find({}, (err, allImage)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allImage));
    })
});

//Create add a new image
router.post("/", requireAuth, (req,res)=>{

    //uploader un fichier, recuperer le nom
    const title = req.body.title;
    
    const newImg = {title};

    //create a new item and add it to the db
    Image.create(newImg, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new image added ', newlyCreated);
            res.send(newlyCreated);
        }
    })
});

// SHOW - shows more info about one particular image

router.get("/:id", (req, res)=>{
    //find the image with the provided ID
    Image.findById(req.params.id,(err, foundImage)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundImage);
            res.send(foundImage);        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", requireAuth, (req, res)=>{
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Image.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedImage)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedImage);
            res.send(JSON.stringify(updatedImage));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", requireAuth, (req, res)=>{

    //find the image with the provided ID
    Image.findById(req.params.id,(err, foundImage)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundImage);
            //delete comment when upload is added
            //const path = `./upload/${foundImage.title}`;
            //fs.unlinkSync(path);
        }
    });

    Image.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send(`deleted ${req.params.id}`);                        
        }
    })
    
 });

module.exports = router;