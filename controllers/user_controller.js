const User = require('../models/user.model')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

function tokenForUser(user){
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret)
}

exports.signup = function(req, res, next){
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