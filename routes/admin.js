var express = require('express');
var router = express.Router();
var adminController = require('../controller/admin');


router.post('/signup', adminController.SignUp);
router.post('/login', adminController.Login);

module.exports = router;
