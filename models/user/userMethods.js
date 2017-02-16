const Promise = require('bluebird');




function addMethods(schema) {




    Promise.promisifyAll(schema.methods)
    return schema
}

module.exports = addMethods
