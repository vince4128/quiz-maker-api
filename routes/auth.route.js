const   express = require("express"),
        router  = express.Router({mergeParams:true});

const   Authentication  = require("../controllers/authentication"),
        passport        = require("passport"),
        requireSignin   = passport.authenticate("local", {session:false}),
        requireAuth     = passport.authenticate('jwt', { session: false }),
        passportService = require('../services/passport');

router.post("/signin", requireSignin, Authentication.signin);
router.post("/signup", Authentication.signup);

module.exports = router;