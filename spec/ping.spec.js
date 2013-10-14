var request = require('request');
var serving = require('../public/js/serving');
var Server = require('../public/js/server');

describe("Serving ping level", function() {

	var server = new Server(serving('public'));

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});

	it("answers to a ping from yose", function(done) {
		request("http://localhost:7000/yose/ping", function(error, response, body) {
			expect(response.statusCode).toEqual(200);
			done();
		});
	});
	
	it("answers with json to a ping from yose", function(done) {
		request("http://localhost:7000/yose/ping", function(error, response, body) {
			expect(response.headers['content-type']).toEqual('application/json');
			done();
		});
	});
	
	it("answers the expected response to a ping from yose", function(done) {
		request("http://localhost:7000/yose/ping", function(error, response, body) {
			expect(body).toEqual(JSON.stringify( { alive: true } ));
			done();
		});
	});
		
});

