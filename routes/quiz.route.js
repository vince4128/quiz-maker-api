const   express = require("express"),
        router  = express.Router({mergeParams:true}),        
        Quiz    = require("../models/index");

//Index show all quiz
router.get("/", (req,res)=>{
    //get all otem from db
    Item.find({}, (err, allQuiz)=>{
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