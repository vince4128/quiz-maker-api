const jwt = require('jwt-simple');
const User = require('../models/User.model');
const config = require("../server/server.config");

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub:user.id, iat:timestamp}, config.secret);
}

exports.signin = (req,res,next) => {
    // give token to user
    res.send({token: tokenForUser(req.user)})
    next();
}

exports.signup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const pseudo = req.body.pseudo;

    if(!email || !password || !pseudo){
        return res.status(422).send({error: 'You must provide email, password and pseudo'});
    }

    // see if user with a given email exist
    User.findOne({ $or : [{email:email}, {pseudo:pseudo}]}, (err,existingUser) => {
        if(err) {return next(err);}

        //if user with email does exist, return an error
        if(existingUser) {
            return res.status(422).send({error: 'Email or pseudo already in use'});
        }

        // if user does not exist, create and save record
        const user = new User({
            email:email,
            password:password,
            pseudo:pseudo,
            admin:true
        });

        User.save((err) => {
            if(err) {return next(err);}
            // respond to request
            res.json({token:tokenForUser(user)});
        });

    });

};