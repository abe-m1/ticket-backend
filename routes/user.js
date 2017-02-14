
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
