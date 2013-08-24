var http 			= require('http');
var url 			= require('url');
var primeFactorsOf 	= require('./prime.factors');

http.ServerResponse.prototype.answerWithBadRequestNotANumber = function(number) {
	this.answerWith(400, {
		number : number,
		error : 'Not a number'
	});
};

http.ServerResponse.prototype.answerWithBadRequestNumberNotProvided = function(number) {
	this.answerWith(400, {
		number : 'undefined',
		error : 'Number not provided'
	});
};

http.ServerResponse.prototype.answerWithTooBigNumber = function(number) {
	this.answerWith(501, {
		number : number,
		error : 'Too big number (>1e6)'
	});
};

http.ServerResponse.prototype.answerWithDecomposition = function(number) {
	this.answerWith(200, {
		number : number,
		decomposition : primeFactorsOf(number)
	});		
};

http.ServerResponse.prototype.answerWith = function(code, body) {
	this.writeHead(code, {"Content-Type": "application/json"});
	this.write(JSON.stringify(body));		
	this.end();
};

powerOfTwo = function(incoming, response) {
	var params = url.parse(incoming.url, true);	
	if (params.query.number == undefined) response.answerWithBadRequestNumberNotProvided(params.query.number);	
	var number = parseInt(params.query.number);
	if (isNaN(number)) response.answerWithBadRequestNotANumber(params.query.number);
	if (number > 1e6)  response.answerWithTooBigNumber(number);
	response.answerWithDecomposition(number);
}

module.exports = powerOfTwo;