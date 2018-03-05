var Recaptcha = require('express-recaptcha');
var config = require('../config.js');

var recaptcha = new Recaptcha(config.SITE_KEY, config.SECRET_KEY);

module.exports = recaptcha;
