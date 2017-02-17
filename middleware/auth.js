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

function signin(req, res, next) {
    res.json({ message: 'route has been reached' })    
}


function init(app) {
    // routes before middleware don't require token
   app.post('/api/testsignin', signin);
   app.use(authMiddleware);    
}


// module.exports = authMiddleware;
module.exports.init = init;