const helpers = require('../helpers')
const models = helpers.require(__dirname)


function init(app){
    console.log('--------------')
    console.log('initializing models: ' Object.keys(models).length)
    console.log('--------------')
}

for (const model in models) {
    if (models.hasOwnProperty(model)){
        const elem = models[model]
        //where is init method coming from ?
        elem.init()
    }
}

module.exports.init = init