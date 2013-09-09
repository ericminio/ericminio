var request = require('request');
var serving = require('../public/js/serving');
var Server = require('../public/js/server');

describe("Serving Power.Of.Two level", function() {

	var server = new Server(serving('public'));

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});

	it('answers with json to a request from yose', function(done) {
		request("http://localhost:5000/yose?number=8", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('application/json');
			done();
		});
	});
	
	it('answers the expected response to a request from yose', function(done) {
		request("http://localhost:5000/yose?number=8", function(error, response, body) {
			expect(body).toEqual(JSON.stringify( { 
				number : 8,
				decomposition : [2, 2, 2]
			} ));
			done();
		});
	});
	
	it('resists beginner hackers', function(done) {
		request("http://localhost:5000/yose?number=toto", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 'toto',
				error : 'Not a number'
			}));
			done();
		});
	});
		
	it('resists experts hackers', function(done) {
		request("http://localhost:5000/yose?number=12345678901234567890", function(error, response, body) {
			expect(response.statusCode).toEqual(501);
			expect(body).toEqual(JSON.stringify( { 
				number : 12345678901234567890,
				error : 'Too big number (>1e6)'
			}));
			done();
		});
	});
});

