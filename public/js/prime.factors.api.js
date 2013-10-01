var http 			= require('http');
var url 			= require('url');
var primeFactorsOf 	= require('./prime.factors');

var notANumber = function(number) {
	return {
		number : number,
		error : 'not a number'
	};
};

var numberNotProvided = function(number) {
	return {
		number : 'undefined',
		error : 'number not provided'
	};
};

var tooBigNumber = function(number) {
	return {
		number : number,
		error : 'too big number (>1e6)'
	};
};

var notDecomposable = function(number) {
	return {
		number : number,
		error : 'not an integer > 1'
	};
};

var decomposition = function(number) {
	return {
		number : number,
		decomposition : primeFactorsOf(number)
	};		
};

var buildAnswer = function(input) {
	if (input == undefined) return { code:200, body: numberNotProvided(input) };
	var number = parseInt(input);
	if (isNaN(input*2) || isNaN(number)) return { code: 200, body: notANumber(input) };
	if (number > 1e6)  return { code: 200, body: tooBigNumber(number) };
	if (number < 2)  return { code: 200, body: notDecomposable(number) };
	return { code: 200, body: decomposition(number) };
}

api = function(incoming, response) {
	var params = url.parse(incoming.url, true);	
	var input = params.query.number;
	if (typeof input == 'object') {
		var answer = { code: 200, body: [] };
		for(var i=0; i<input.length; i++) {
			answer.body.push(buildAnswer(input[i]).body);
		}
	} 
	else {
		var answer = buildAnswer(input);
	}

	response.writeHead(answer.code, {"Content-Type": "application/json"});
	response.write(JSON.stringify(answer.body));		
	response.end();
	
}

module.exports = api;
module.exports.primeFactorsOf = buildAnswer;