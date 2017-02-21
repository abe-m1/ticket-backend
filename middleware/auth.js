// const jwt = require('../helpers/jwt.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')



function authMiddleware(req, res, next) {        
    const token = req.headers['authorization']

    if (!token) {
        res.json({ message: 'missing token', status: 401 })
    }

    const decoded = verifyJwt(token)

    if (!decoded) {
        res.json({ message: 'bad token', status: 401 })
    } 

    req.decoded = decoded
    next()
}





   
   



 module.exports = authMiddleware;
