var request = require('request');
var Server = require('../public/js/server');

describe("Server", function() {

	var server = new Server(function (request, response) { response.end(); });
	
	beforeEach(function() {	
		server.start();
	});
	afterEach(function() {
		server.stop();
	});
	
	it("ping", function(done) {
		request("http://localhost:7000/ping", function(error, response, body) {
			expect(response.statusCode).toEqual(200);
			done();
		});
	});
	
});	