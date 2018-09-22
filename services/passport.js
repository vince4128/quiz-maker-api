const   passport        = require("passport"),
        User            = require("../models/User.model"),
        config          = require("../server/server.config"),
        JwtStrategy     = require("passport-jwt").Strategy,
        ExtractJwt      = require("passport-jwt").ExtractJwt,
        Localstrategy   = require("passport-local");

// local strategy (signing in)
const   localOptions    = {usernameField: 'email'},
        localLogin      = new Localstrategy(
            localOptions,
            (email, password, done) => {
                //verify username and password, call done with the user
                //if its the correct uername and password
                //otherwise, call done with false
                User.findOne({email:email}, (err,user) => {
                    if(err) {return done(err);}
                    if(!user) {return done(null, false);}

                    //compare password - is `password` equal to user.password ?
                    user.comparePassword(password, (err, isMatch) => {
                        if(err){return done(err);}
                        if(!isMatch){return done(null,false);}

                        return done(null, user);
                    });
                })
            }
        )

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    //payload sub and iat of the token
    //see if the user ID in the payload exists in our database
    //if it does, call 'done' with that
    //otherwise, call done without a user object
    User.findById(payload.sub, (err,user) => {
        if(err){
            return done(err, false);
        }

        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });

});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
        