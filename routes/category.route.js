const   express         = require("express"),
        router          = express.Router({mergeParams:true}),
        Category        = require("../models/Category.model"),
        passport        = require("passport"),
        requireAuth     = passport.authenticate('jwt', {session:false});

//Index show all categories
router.get("/",(req,res)=>{
    //get all category from db
    Category.find({}, (err, allCategories)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allCategories));
    })
});

//Create add a new category to data
router.post("/", requireAuth, (req,res)=>{
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    const title = req.body.title;
    const description = req.body.description;
    const shortDescription = req.body.shortDescription;
    
    const newCategory = {title,description,shortDescription};

    //create a new category and add it to the db
    Category.create(newCategory, (err,newlyCreated)=>{
        if(err){
            console.log(err);                        
        }else{
            console.log('new category added ', newlyCreated);
            res.send(JSON.stringify(newlyCreated));
        }
    })
});

// SHOW - shows more info about one particular category
router.get("/:id", (req, res) => {
    //find the category with the provided ID
    Category.findById(req.params.id,(err, foundCategory)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundCategory);
            res.send(JSON.stringify(foundCategory));        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", requireAuth, (req, res) => {
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCategory)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedCategory);
            res.send(JSON.stringify(updatedCategory));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", requireAuth, (req, res) => {
    Category.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send(`deleted ${req.params.id}`);
        }
    })
    
 });

module.exports = router;