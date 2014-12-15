(function (module) {
    "use strict";

    var User = module.parent.require('./user'),
        meta = module.parent.require('./meta'),
        jwt = module.parent.require('jsonwebtoken'),
        _ = module.parent.require('lodash');

    var constants = Object.freeze({
        'name': "JWT",
        'admin': {
            'route': '/plugins/jwt',
            'icon': 'fa-file-archive-o'
        }
    });

    var JWT = {};

    JWT.init = function (data, callback) {
        function render(req, res, next) {
            res.render('admin/plugins/jwt', {});
        }

        data.router.get('/admin/plugins/jwt', data.middleware.admin.buildHeader, render);
        data.router.get('/api/admin/plugins/jwt', render);

        function getToken(req, res, next) {
            var token = jwt.sign(_.omit(req.user, 'password'), 'foo', { expiresInMinutes: 60*5 });

            req.send(token);
        }

        data.router.get('/api/jwt', getToken);

        callback();
    };

    JWT.addMenuItem = function (custom_header, callback) {
        custom_header.authentication.push({
            "route": constants.admin.route,
            "icon": constants.admin.icon,
            "name": constants.name
        });

        callback(null, custom_header);
    };

    module.exports = JWT;
}(module));
