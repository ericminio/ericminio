var Browser = require("zombie");
var serving = require('../public/js/serving');
var Server = require('../public/js/server');

describe("Prime factors UI", function() {

	var server = new Server(serving('public'));

	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});

	it('has an appropriate title', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:7000/yose/primeFactors/ui').
			then(function() {
				expect(browser.text('#title')).toEqual('Prime factors decomposition');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
});
		
		
