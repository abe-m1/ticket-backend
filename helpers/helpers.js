var print = require('./printRoutes')
var fs = require('fs')

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

module.exports = {
    printRoutes: print,
    require: reqDir
}