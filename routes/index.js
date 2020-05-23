var express = require('express');
var router = express.Router();
var user=require('../modules/query');
var path = require('path');
var db=require('../modules/dbconnect'); 
const multer=require('multer')

const storage = multer.diskStorage({
  destination: './static/images/',
  filename: function (req, file, cb) {
   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
 });
 var upload = multer({
  storage: storage
 });

router.get('/', function(req, res, next) {
    res.render('home')
});

router.post('/check_user',function(req,res,next){
      let post=req.body.Username;
      var que = "SELECT username FROM user WHERE username = '" +post+ "'";
      db.query(que, (err, user, result) => {
       if (err)
        throw err;
       else {
        if (user.length > 0) {
         console.log(false);
         res.send(false);
        }
        else {
         console.log(true);
         res.send(true);
        }
       }
      });
});

router.post('/reg', upload.single('image'), (req, res, next) => {
  console.log(req.file);
  var reg = '/jpeg|jpg|gif|png/';
  if (reg.match(path.extname(req.file.originalname).toLowerCase())){
   let post = {
      Id:'Null',
      Name:req.body.name,
      Username:req.body.username,
      Email: req.body.email,
      Password:req.body.password,
      ImagePath:'./public/images/' + req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname) + '',
      Aboutme:req.body.AboutMe
    };
  let sql = 'INSERT INTO user SET ?';
  user.sub(post,sql);
  res.send("Registration Successful");
  res.render('home');
}
});


module.exports = router;