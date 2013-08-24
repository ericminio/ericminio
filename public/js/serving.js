var fs = require('fs');
var pong = require('../../public/js/pong.js');
var serve_static = require('../../public/js/serve-static.js');
var powerOfTwo = require('../../public/js/power.of.two.js');

serving = function(folder) {
	
	return function (request, response) {
		var params = require('url').parse(request.url, true);
		
		if (params.pathname == '/ping') {			
			pong(response);
		}
		if (params.pathname == '/power.of.two') {
			powerOfTwo(request, response);
		}
		else {
			serve_static(folder, request, response);		
		}
	};
};

module.exports = serving;
