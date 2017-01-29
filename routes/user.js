var express = require('express');
var router = express.Router();

const User = require('../controllers/user_controller')


module.exports = function(app){ 
router.post('/signup', User.signup)

}