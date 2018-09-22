const   express = require("express"),
        router  = express.Router({mergeParams:true});
        User = require("../models/user.model"),
        passport        = require("passport"),
        requireAuth     = passport.authenticate('jwt', {session:false}),
        requireSignin   = passport.authenticate('local', {session:false});

//Index show all item
router.get("/", (req,res) => {

    //get all item from db
    User.find({}, (err, alluser)=>{
        if(err){
            console.log(err)
        }else{ res.send(
            alluser.map((user)=>{
                return {"_id":user._id,"email":user.email,"pseudo":user.pseudo};
            })
        )};
    })
});

//Create add a new item to data
router.post("/", (req,res)=>{

    //recuperer l'auteur dans la collection user
    const email = req.body.email;
    const pseudo = req.body.pseudo;
    const password = req.body.password;    
    
    const newUser = {email,password, pseudo};

    //create a new item and add it to the db
    User.create(newUser, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new item added ', newlyCreated);
            res.send(JSON.stringify(newlyCreated));
        }
    })
});

// SHOW - shows more info about one particular user

router.get("/:id", requireAuth, function(req, res){
    //find the user with the provided ID
    User.findById(req.params.id,(err, foundUser)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundUser);
            res.send({"_id":foundUser._id,"email":foundUser.email,"pseudo":foundUser.pseudo});        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", requireAuth, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedUser);
            res.send(JSON.stringify(updatedUser));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", requireAuth, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send(`deleted ${req.params.id}`);
        }
    })
    
 });

module.exports = router;