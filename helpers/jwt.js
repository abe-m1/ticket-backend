const jwt = require('jsonwebtoken')
const secret = require('../config/dev.js').jwtSecret

function verifyJwt(token){
    return jwt.verify(token, secret)

}

function signJwt(data) {
    return jwt.sign(data, secret)
}


function auth(req, res, next){
    const token = req.headers['authorization']

    if (!token) throw { message: 'missing token', status: 401 }

    const decoded = verifyJwt(token)

    if (!decoded) throw { message: 'bad token', status: 401 }

    req.decoded = decoded

    next()
}