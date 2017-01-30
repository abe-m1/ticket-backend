const User = require('../models/user.model')
const Ticket = require('../models/ticket.model')
var bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken')


exports.getAllTickets = function (req, res, next) {
    Ticket.find()
        .populate('user', 'firstName')
        .exec(function (err, tickets) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: tickets
            });
        });
};

exports.newTicket = function (req, res, next) {
   var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var ticket = new Ticket({
            content: req.body.content,
            user: user,
            title : req.body.title ,
            category: req.body.category,
            description: req.body.description,
    
            status: 'new',
            
        });
        ticket.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.tickets.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved ticket',
                obj: result
            });
        });
    });
};

