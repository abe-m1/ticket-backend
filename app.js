var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var http = require('http')

var config = require('./config')
const helpers = require('./helpers')
const routes = require('./routes')
const middleware = require('./middleware')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

middleware.init(app)
config.init(app)
apiRouter = routes.init(app)
helpers.printRoutes(apiRouter.stack, 'Router', apiRouter.mountPath)

app.use(function (req, res, next) {
    return res.render('index');
});

//server setup
const port = process.env.PORT || config.port

//create HTTP server and forward it to our express application
const server = http.createServer(app)

//tell server to listen
server.listen(port)
console.log('server listen on: ', port)

module.exports.app = app