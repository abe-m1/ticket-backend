const User = require('../models/user.model')
var bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken')

function tokenForUser(user){
    // const timestamp = new Date().getTime()
    return jwt.sign({user: user}, 'secret', {expiresIn: 7200});
}

exports.signup = function(req, res, next){

    console.log('REq Body', req.body)
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password =  bcrypt.hashSync(req.body.password, 10)
    const email = req.body.email

    if (!email || !password){
        return res.status(422).send({ error: 'you must provide email and password'})
    }

    User.findOne({ email: email}, function(err, existingUser){
        if (err) { return next(err)}

        if (existingUser){
            return res.status(422).send({ error: 'email already in use'})
        }

        var user = new User({
        firstName:  firstName,
        lastName:  lastName,
        password:  password,
        email: email
    });

        user.save(function(err, result){
            if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result,
            token: tokenForUser(user)
        });

           
        })
    })
}

exports.signin = function(req, res, next){
    
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = tokenForUser(user)
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            firstName: user.firstName
        });
    });

}


exports.getAllUsers =function(req, res, next) {
   User.find({}, function( err, users) {
     if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Successfully returned all user',
            users: users            
        });

   })
}


exports.getOneUser =  function( req, res, next ) {	
  	User.findById( req.params.id , function(err, user){
          if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Successfully returned all user',
            user: user          
        });
      })
}

