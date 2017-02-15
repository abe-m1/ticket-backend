const mongoose = require('mongoose')
const currentEnv = process.env.NODE_ENV
let gracefulShutdown

// Set mongoose's promises to bluebird promises
mongoose.Promise = require('bluebird')

/**
 * Set up mongoose db connection and import models
 */
module.exports = function configMongoose(dbUri) {
    let db
    //   Check to make sure uri is coming in
    if (!dbUri || typeof dbUri !== 'string') {
        throw 'No database uri provided please check config/dev.js'
    }

    // Prevent double connections, mostly when running test suite
    if (mongoose.connection.readyState === 0) {
        console.log('==> readyState: ', mongoose.connection.readyState)
        db = mongoose.connect(dbUri)
    }

    // CONNECTION EVENTS
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to ' + dbUri)
    })
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err)
    })
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected')
    })

    // CAPTURE APP TERMINATION / RESTART EVENTS
    // To be called when process is restarted or terminated
    gracefulShutdown = function (msg, callback) {
        mongoose.connection.close(function () {
            console.log('Mongoose disconnected through ' + msg)
            callback()
        })
    }
    // For nodemon restarts
    process.once('SIGUSR2', function () {
        gracefulShutdown('nodemon restart', function () {
            process.kill(process.pid, 'SIGUSR2')
        })
    })
    // For app termination
    process.on('SIGINT', function () {
        gracefulShutdown('app termination', function () {
            process.exit(0)
        })
    })

    return db
}