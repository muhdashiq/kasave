var express = require('express');
var router = express.Router();
var recaptcha = require('../security/recaptcha');

/* GET home page. */
router.get('/', recaptcha.middleware.render, function(req, res, next) {
  res.render('index', { title: 'Kasave', captcha: res.recaptcha });
});

module.exports = router;
