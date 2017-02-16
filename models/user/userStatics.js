const Promise = require('bluebird')

 function hello() {
     console.log('i am woking ')
 }


function addStatics(schema) {


     schema.statics.hello = hello
    Promise.promisifyAll(schema.statics)
    return schema;
}

module.exports = addStatics
