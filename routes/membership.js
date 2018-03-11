var express = require('express');
var router = express.Router();
var members = require('../members/members');
var recaptcha = require('../security/recaptcha');
var multer = require('multer');
const uuidv1 = require('uuid/v1');

const utils = require('../utils/savefile')

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./data/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});


var upload = multer({
     storage: Storage
 }).array("imgUploader", 3);

/* Image upalod*/
 router.get('/photo', recaptcha.middleware.render, function(req, res) {
   res.render('photoUpload', { title: 'Kasave', captcha: res.recaptcha });
});

/* Image upalod*/
router.post('/photo', function(req, res) {
  console.log(req);
   upload(req, res, function(err) {
       if (err) {
           return res.end("Something went wrong!");
       }
       return res.end("File uploaded sucessfully!.");
   });
});

/* GET for the membership registration form*/
router.get('/', recaptcha.middleware.render, function(req, res, next) {
  res.render('membership_registration', { title: 'Kasave', captcha: res.recaptcha });
});

/* POST the membership form. */
router.post('/', recaptcha.middleware.verify, function(req, res, next) {
  res.render('messages', { title: 'Error!!!', message: JSON.stringify(req.body) });
  const id = uuidv1();
  if (!req.recaptcha.error) {
    const {file, name, address, address2, gender, email, panjayath, ward, houseNo, mobile, guardian, education, bloodGroup, otherOrganisation}  = req.body;
    //Saving photo /data/images
    //const targeImageLocation = utils.saveFileToLocation(req.files.file,path.resolve(`./data/${id}.png`))
    if(members.add({id, name, address, address2, gender, email, panjayath, ward, houseNo, mobile, guardian, education, bloodGroup, otherOrganisation})){
      res.render('messages', { title: 'Registration completed!!!', message: `Membership request successfully added to our system, our coordinator will get in touch with you earliest as possible. Your unique registration id is ${id}, we highly recomend you to take a screenshot of this for your quick reference(s).`});
    } else {
      res.render('messages', { title: 'Failed!!!', message: 'This mobile number already registered with our system. Please contact secretary.' });
    }
  }
  else {
    res.render('messages', { title: 'Error!!!', message: 'Failed to verify the captcha. Please try again.' });
  }
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.json(members.list());
});

module.exports = router;
