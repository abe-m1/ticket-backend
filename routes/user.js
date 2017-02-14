// var express = require('express');
// var router = express.Router();
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var UserController = require('../controllers/user_controller')

// var User = require('../models/user.model');

// router.post('/', UserController.signup);

// router.post('/signin', UserController.signin);
// router.get('/', UserController.getAllUsers)
// router.get('/:id', UserController.getOneUser)
// router.patch('/:id', UserController.editUser)
// router.delete('/:id', UserController.deleteUser)

// module.exports = router;





var userController = require('../controllers/user_controller')

function init(Router) {
     Router.route('/authenticate') 
        .post(userController.signup)
        .get(userController.test)


 }

module.exports.init = init
