(function (module) {
    "use strict";

    var meta = module.parent.require('./meta'),
        user = module.parent.require('./user'),
        controllers = require('./lib/controllers'),
        nconf = require("nconf");

    var constants = Object.freeze({
        'name': "JWT",
        'admin': {
            'route': '/plugins/jwt',
            'icon': 'fa-file-archive-o'
        }
    });

    var JWT = {};

    JWT.init = function (params, callback) {
        var jwt = require('jsonwebtoken'),
            _ = require('lodash'),
            router = params.router,
            hostMiddleware = params.middleware,
            hostControllers = params.controllers,
            url=nconf.get("url");

        router.get('/admin/plugins/jwt', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
        router.get('/api/admin/plugins/jwt', controllers.renderAdminPage);
        
        function getToken(req, res, next) {

            if (req.user && req.user.uid) {
                
                meta.settings.get('jwt', function (err, settings) {
                    user.getUserData(req.user.uid, function (err, user) {
                        user._uid=user.uid;
                        var token = jwt.sign(_.omit(user, 'password'), settings.secret, {
                            expiresIn: 60 * 5
                        });

                        res.send(token);
                    });
                });
            } else {
                res.redirect('/login');
            }
        }

        router.get('/api/jwt', getToken);

        JWT.reloadSettings();

        callback();
    };

    JWT.addAdminNavigation = function (header, callback) {
        header.plugins.push({
            "route": constants.admin.route,
            "icon": constants.admin.icon,
            "name": constants.name
        });

        callback(null, header);
    };

    JWT.reloadSettings=function(){
        meta.settings.get('jwt', function(err, settings) {
            JWT.settings = settings;
        });
    };

    module.exports = JWT;

}(module));
