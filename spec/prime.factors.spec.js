var request = require('request');
var serving = require('../public/js/serving');
var Server = require('../public/js/server');

describe("Serving PrimeFactors", function() {

	var server = new Server(serving('public'));

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});

	it('answers with json to a request from yose', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=8", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('application/json');
			done();
		});
	});
	
	it('answers the expected response to a request from yose', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=8", function(error, response, body) {
			expect(body).toEqual(JSON.stringify( { 
				number : 8,
				decomposition : [2, 2, 2]
			} ));
			done();
		});
	});
	
	it('resists beginner hackers', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=toto", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 'toto',
				error : 'not a number'
			}));
			done();
		});
	});
		
	it('resists experts hackers', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=1000001", function(error, response, body) {
			expect(response.statusCode).toEqual(501);
			expect(body).toEqual(JSON.stringify( { 
				number : 1000001,
				error : 'Too big number (>1e6)'
			}));
			done();
		});
	});
});

