const Router = require('express').Router(),
    helpers = require('../helpers'),
    routes = helpers.require(__dirname);

Router.mountPath = '/';

function init(app) {
    app.use(Router.mountPath, Router);
    return Router;
}

// Attach Routes to Router instance
for (const route in routes) {
    if (routes.hasOwnProperty(route)) {
        const element = routes[route];
        element.init(Router);
    }
}

module.exports.init = init;