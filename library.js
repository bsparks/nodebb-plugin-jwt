(function (module) {
    "use strict";

    var meta = module.parent.require('./meta'),
        user = module.parent.require('./user');

    var constants = Object.freeze({
        'name': "JWT",
        'admin': {
            'route': '/plugins/jwt',
            'icon': 'fa-file-archive-o'
        }
    });

    var JWT = {};

    JWT.init = function (router, middleware, controllers, callback) {
        var jwt = require('jsonwebtoken'),
            _ = require('lodash');

        function render(req, res, next) {
            res.render('admin/plugins/jwt', {});
        }

        router.get('/admin/plugins/jwt', middleware.admin.buildHeader, render);
        router.get('/api/admin/plugins/jwt', render);

        function getToken(req, res, next) {

            if (req.user && req.user.uid) {
                // TODO: prune data? support more sites?
                meta.settings.get('jwt', function (err, settings) {
                    user.getUserData(req.user.uid, function (err, user) {

                        var token = jwt.sign(_.omit(user, 'password'), settings.secret, {
                            expiresInMinutes: 60 * 5
                        });

                        res.send(token);
                    });
                });
            } else {
                res.redirect('/login');
            }
        }

        router.get('/api/jwt', getToken);

        callback();
    };

    JWT.addMenuItem = function (custom_header, callback) {
        custom_header.plugins.push({
            "route": constants.admin.route,
            "icon": constants.admin.icon,
            "name": constants.name
        });

        callback(null, custom_header);
    };

    module.exports = JWT;

}(module));
