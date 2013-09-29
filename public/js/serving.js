var fs = require('fs');
var pong = require('../../public/js/pong.js');
var serve_static = require('../../public/js/serve-static.js');
var api = require('../../public/js/prime.factors.api.js');

String.prototype.startsWith = function(prefix) {
	return this.indexOf(prefix) != -1;
};

serving = function(folder) {
	
	return function (request, response) {
		var params = require('url').parse(request.url, true);
		
		var served = false;		
		if (params.path == '/yose') {			
			pong(response);
			served = true;
		}
		if (params.path.startsWith('/yose/primeFactors?number=') 
			|| params.path == '/yose/primeFactors?'
			|| params.path == '/yose/primeFactors') {
			api(request, response);
			served = true;
		}
		if (params.path == '/yose/primeFactors/ui') {
			response.writeHead(200, { 'content-type': 'text/html' });
			response.write(fs.readFileSync('./public/prime.factors.html'));
			response.end();
			served = true;
		}
		if (!served) {
			serve_static(folder, request, response);		
		}
	};
};

module.exports = serving;
