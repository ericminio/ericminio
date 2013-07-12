var fs = require('fs');
var pong = require('../../public/js/pong.js');
var serve_static = require('../../public/js/serve-static.js');

serving = function(folder) {
	
	return function (request, response) {
		var params = require('url').parse(request.url, true);
		
		if (params.pathname == '/ping') {			
			pong(response);
		}
		else {
			serve_static(folder, request, response);		
		}
	};
};

module.exports = serving;
