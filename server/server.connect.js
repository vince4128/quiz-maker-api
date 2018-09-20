const   mongoose        = require("mongoose"),
        db              = "mongodb://127.0.0.1/quizmaker?connectTimeoutMS=5000";

module.exports = {

    connect:function(){
        mongoose.connect(db, { useNewUrlParser:true }).then(
            ()=>console.log('connected to the database !'),
            err => console.log('an error has occured ', err.message)
        );
    }

}