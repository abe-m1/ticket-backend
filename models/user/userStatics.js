const Promise = require('bluebird')


function addStatics(schema) {



    Promise.promisifyAll(schema.statics)
    return schema;
}

module.exports = addStatics
