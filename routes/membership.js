var express = require('express');
var router = express.Router();
var members = require('../members/members');
var recaptcha = require('../security/recaptcha');
const uuidv1 = require('uuid/v1');

const utils = require('../utils/savefile')

/* GET users listing. */
router.post('/', recaptcha.middleware.verify, function(req, res, next) {
  const id = uuidv1();
  if (!req.recaptcha.error) {
    const {file, name, address, address2, gender, email, panjayath, ward, houseNo, mobile, guardian, education, bloodGroup, otherOrganisation}  = req.body;
    //Saving photo /data/images
    const targeImageLocation = utils.saveFileToLocation(req.files.file,path.resolve(`./data/${id}.png`))
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

router.get('/', recaptcha.middleware.render, function(req, res, next) {
  res.render('membership_registration', { title: 'Kasave', captcha: res.recaptcha });
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.json(members.list());
});

module.exports = router;
