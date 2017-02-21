var logger = require('morgan');
var bodyParser = require('body-parser');
const authMiddleware = require('./auth.js')
const userController = require('../controllers/user_controller')



module.exports.init = (app) => {
 


    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    });

    

    app.post('/api/signin', userController.signin);
    app.post('api/signup', userController.signup)
    app.use(authMiddleware)

}