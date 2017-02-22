const User = require('../models/user')
var bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken')
const Promise = require('bluebird')
const crypto = Promise.promisifyAll(require('crypto'))



function tokenForUser(user){
    // const timestamp = new Date().getTime()
    return jwt.sign({user: user}, 'secret', {expiresIn: 7200});
}

const signup = function(req, res, next){

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

const  test = function(req,res,next){
    return res.status(200).json({
        message: ' this is working'
    })
}



const signin = function(req, res, next){
    console.log('REQ>BODY',req.body)

    User.findOne({email: req.body.email}, function(err, user) {
       
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(404).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(405).json({
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


const getAllUsers =function(req, res, next) {
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


const getOneUser =  function( req, res, next ) {	
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


const editUser = function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(req.params.id, function (err, ticket) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No User Found!',
                error: {message: 'User not found'}
            });
        }
        
        user.firstName = req.body.firstName;
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated user',
                obj: result
            });
        });
    });
};

const deleteUser = function(req, res, next){
    // var decoded  = jwt.decode(req.query.token)
    User.findById(req.params.id, function(err, user){
        if (err){
             return res.status(500).json({
            title: 'an error occured',
            error: err
            })
        } 
        if (!user){
            return res.status(500).json({
                title: 'no user found',
                error: {message: 'user not found'}
            })
        }
        

       
        user.remove(function(err, result){
        if (err){
            return res.status(500).json({
                title: 'an error occured',
                error: err

            })
        }
        console.log('saved')
        res.status(200).json({
            message: 'user ticket',
            obj: result
        })
    })
       
    })
}


const forgotPassword = function(req, res, next){
   

    const email = req.body.email
    User.findOne({ email: email })
        .then(user => {
            return crypto.randomBytesAsync(32).then(function(buf) {
            const token = buf.toString('hex')
            user.reset_password_token = token
            console.log('forgot password token = ', token)
            return user.save().then(user => console.log(user))
            })
    })        
}


module.exports = {
    signin: signin,
    signup: signup,
    routeTest: test,
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    editUser: editUser,
    deleteUser: deleteUser,
    forgotPassword: forgotPassword



}


