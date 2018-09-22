const   express = require("express"),
        router  = express.Router({mergeParams:true});

const   Authentication  = require("../controllers/authentication"),
        passport        = require("passport"),
        requireSignin   = passport.authenticate("local", {session:false});

module.exports = (app) => {
    router.post("/signin", requireSignin, Authentication.signin);
    router.post("/signup", Authentication.signup);
};