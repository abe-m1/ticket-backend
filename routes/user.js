

// router.post('/', UserController.signup);

// router.post('/signin', UserController.signin);
// router.get('/', UserController.getAllUsers)
// router.get('/:id', UserController.getOneUser)
// router.patch('/:id', UserController.editUser)
// router.delete('/:id', UserController.deleteUser)

// module.exports = router;





var userController = require('../controllers/user_controller')

function init(Router) {
    Router.post('/signin', userController.signin)
     Router.route('/user') 
        .post(userController.signup)
        .get(userController.getAllUsers)

    Router.route('/user/:id')
        .get(userController.getOneUser)
        .patch(userController.editUser)
        .delete(userController.deleteUser)

    


 }

module.exports.init = init
