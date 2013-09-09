var fs = require('fs');
var pong = require('../../public/js/pong.js');
var serve_static = require('../../public/js/serve-static.js');
var powerOfTwo = require('../../public/js/power.of.two.js');

String.prototype.startsWith = function(prefix) {
	return this.indexOf(prefix) != -1;
};

serving = function(folder) {
	
	return function (request, response) {
		var params = require('url').parse(request.url, true);

		if (params.path == '/yose') {			
			pong(response);
		}
		if (params.path.startsWith('/yose?number=')) {
			powerOfTwo(request, response);
		}
		else {
			serve_static(folder, request, response);		
		}
	};
};

module.exports = serving;
