var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const http = require('http')

var app = express()
mongoose.connect('localhost:27017/ticket2')

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

//server setup
const port = process.env.PORT || 5000

//create HTTP server and forward it to our express application
const server = http.createServer(app)

//tell server to listen
server.listen(port)
console.log('server listen on: ', port)