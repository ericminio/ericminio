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
		
		var served = false;		
		if (params.path == '/yose') {			
			pong(response);
			served = true;
		}
		if (params.path.startsWith('/yose/primeFactors?number=')) {
			powerOfTwo(request, response);
			served = true;
		}
		if (params.path == '/yose/primeFactors/ui') {
			response.writeHead(200, { 'content-type': 'text/html' });
			response.write(fs.readFileSync('./public/prime.factors.html'));
			response.end();
			served = true;
		}
		if (params.path.startsWith('/yose/primeFactors/ui/decompose?number=')) {
			response.writeHead(200, { 'content-type': 'text/html' });
			var number = params.query.number;
			var primeFactorsOf = require('./prime.factors');
			var result = number + " = " + primeFactorsOf(number).join(' x ');
			var content = '<html><body>' +
							'<label id="result">'+ result +'</label>' +
						  '</body></html>';
			response.write(content);
			response.end();
			served = true;
		}
		if (!served) {
			serve_static(folder, request, response);		
		}
	};
};

module.exports = serving;
