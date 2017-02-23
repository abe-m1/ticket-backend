const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken')
const Promise = require('bluebird')
const crypto = Promise.promisifyAll(require('crypto'))
const Helpers = require('../helpers')



function tokenForUser(user){
    console.log('run')
    // const timestamp = new Date().getTime()
    return jwt.sign({user: user}, 'secret', {expiresIn: 7200});
}

const signup = (req, res, next) =>{

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

        const user = new User({
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


const test  = (req, res, next) => {
	return res.status(200).json({ message: ' this is working' })	
}



const signin = (req, res, next) => {
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
        const token = tokenForUser(user)
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            firstName: user.firstName
        });
    });

}



const getAllUsers = (req, res, next)=> {
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


const getOneUser = ( req, res, next ) => {	
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


const editUser = (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
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

const deleteUser = (req, res, next)=> {
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


const forgotPassword = (req, res, next) =>{
   

    const email = req.body.email
    User.findOne({ email: email })
        .then(user => {
            return crypto.randomBytesAsync(32).then(function(buf) {
            const token = buf.toString('hex')
            user.reset_password_token = token
            user.reset_password_set_at = Date.now() + 3600000; // 1 hour
            sendEmail(user.email, token)
            console.log('forgot password token = ', token)
            return user.save().then(user => {
                return res.status(200).json({
            message: 'email sent to user for reset'
        })
            })
            })
    })        
}

function sendEmail(email, token) {
    const mailOptions = {
        from: 'ticketApp',
        to: email,
        subject: 'TicketApp Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:8100#/app' + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }

    Helpers.email.transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
        if (info) {
            console.log("Message sent: " + info.response)
        }

    })

}

function resetPassword( req, res ) {
   
    
       User.findOne( { reset_password_token: req.params.token, reset_password_set_at: { $gt: Date.now() } }, function( err, user ) {
          if ( !user ) {
            res.json( 'Password reset token is invalid or has expired.' )
            return
          }
          const password =  bcrypt.hashSync(req.body.password, 10)
         user.password = password
         user.reset_password_token = null
         user.reset_password_set_at = null

         user.save( function( err, user ) {
            return res.status(200).json({
            message: 'password updated',
            obj: user
        })
        
    }) 
         } )
       
    
 }

module.exports = {
    signin: signin,
    signup: signup,
    routeTest: test,
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    editUser: editUser,
    deleteUser: deleteUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
}


