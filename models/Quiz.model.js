const   mongoose    = require("mongoose");
        Schema      = mongoose.Schema;

const questionSchema = new Schema({
    type:String,
    statement:String,
    proposal:[
        {
            text:String,value:Boolean
        }
    ],
    feedback:{
        good:String,
        bad:String
    }
})

const quizSchema = new Schema({
    title:{type:String, unique:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    category:{type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    description:String,
    introduction:String,
    date:{ type:Date, default:Date.now},
    question:[questionSchema],
    image:String
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;