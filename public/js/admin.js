'use strict';
/* globals define, $, socket, ajaxify, app */

define('admin/plugins/jwt', ['settings'], function(Settings) {
	var Admin = {};

	Admin.init = function() {
		Admin.initSettings();
	};

	Admin.initSettings = function() {
		
		Settings.load('jwt', $('.jwt'));

		$('#save').on('click', function() {
			Settings.save('jwt', $('.jwt'), function() {
				app.alert({
					type: 'success',
					alert_id: 'jwt-saved',
					title: 'Settings Saved',
					timeout: 2500
				});
			});
		});
	};

	return Admin;

});	