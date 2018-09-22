const   express = require("express"),
        router  = express.Router({mergeParams:true}),
        Image = require("../models/image.model"),
        crypto  = require('crypto'),
        path    = require('path'),
        multer  = require("multer"),
        passport        = require("passport"),
        requireAuth     = passport.authenticate('jwt', {session:false});

const storage = multer.diskStorage({    
    destination: './upload/',
    filename: function (req, file, cb) {
      if(req.body.filename){
        const name = req.body.filename + '-' + Date.now() + path.extname(file.originalname);
        //cb(null, req.body.filename + '-' + Date.now() + path.extname(file.originalname))
        cb(null, name)

        const newImg = {title:name};

        //add image to db
        Image.create(newImg, (err,newlyCreated)=>{
          if(err){
              console.log(err);
          }else{
              console.log('new image added ', newlyCreated);
          }
        })

      }else{
        let name = "";
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) return cb(err)
    
          let name = raw.toString('hex') + path.extname(file.originalname);
          cb(null, name)
        })

        const newImg = {title:name};

        //add image to db
        Image.create(newImg, (err,newlyCreated)=>{
            if(err){
                console.log(err);
            }else{
                console.log('new image added ', newlyCreated);
            }
          })
      }
    }
  })

upload = multer({storage});

//Create add a new upload
router.post("/", requireAuth, upload.single('file'), (req,res)=>{

    //fonctionne
    console.log('upload route', req.body, req.file, req.file.originalname);
    res.json({file: `upload/${req.body.filename}.jpg`});
    //end fonctionne

});

module.exports = router;