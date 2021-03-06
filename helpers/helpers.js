var print = require('./printRoutes')
var fs = require('fs')
const nodeMailer = require('nodemailer')
const dev = require('../config/dev.js')

function reqDir(dir) {
    // Grab the name of the directory to not include it's main file
    var dirName = dir.split('/')
    dirName = dirName[dirName.length - 1] + '.js'
    var reqObj = {};
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Don't include the index or directory's main file
        if (file !== dirName && file !== 'index.js') {
            reqObj[file] = require(dir + '/' + file);
        }
    }
    return reqObj;
}

function failure(req, next, status) {
    return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
}

const email = {
    transporter: nodeMailer.createTransport(dev.smtp),
    checkEmail: function (email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    },
}


module.exports = {
    printRoutes: print,
    require: reqDir,
    failure: failure,
    email: email
}