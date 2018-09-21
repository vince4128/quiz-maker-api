const   express = require("express"),
        router  = express.Router({mergeParams:true}),        
        Quiz    = require("../models/Quiz.model");

// Index show all quiz
router.get("/", (req,res)=>{
    //get all otem from db
    Quiz.find({}, (err, allQuiz)=>{
        if(err){
            console.log(err)
        }else{
            res.send(allQuiz);
        }
    })
})

// Add a quiz
router.post("/", (req,res)=>{
    
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    
    const title = req.body.title;
    //const author = req.body.author;
    //const category = req.body.category;
    const description = req.body.description;
    const introduction = req.body.introduction;
    const question = req.body.question;
    const image = req.body.image;

    const newQuiz = {title,description,introduction,question,image};

    Quiz.create(newQuiz, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new quiz created', newlyCreated);
            res.send(newlyCreated);
        }
    })

});

// show a quiz
router.get("/:id", (req,res)=>{
    //find the item with the provided ID
    Quiz.findById(req.params.id, (err, foundQuiz)=>{
        if(err){
            console.log(err);
        }else{
            console.log(foundQuiz);
            res.send(foundQuiz);
        }
    });
})

// update a quiz
router.put("/:id", (req,res)=>{    
    Quiz.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedQuiz)=>{
        if(err){
            console.log(err);
        }else{
            console.log(updatedQuiz);
            res.send(updatedQuiz);
        }
    });
});

// delete a quiz
router.delete("/:id", (req,res)=>{
    Quiz.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("deleted");
            res.send(`deleted ${req.params.id}`);
        }
    })
})

module.exports = router;