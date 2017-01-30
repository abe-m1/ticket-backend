var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var UserController = require('../controllers/user_controller')

var User = require('../models/user.model');

router.post('/', UserController.signup);

router.post('/signin', UserController.signin);

module.exports = router;
