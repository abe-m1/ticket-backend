
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
    Router.route('/forgot')
        .post(userController.forgotPassword)
    Router.route('/test')
        .get(userController.routeTest)

    


 }

module.exports.init = init
