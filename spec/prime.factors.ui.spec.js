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

	xit('has an appropriate title and invitation', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:7000/yose/primeFactors/ui').
			then(function() {
				expect(browser.query('#title')).toBeDefined();
				done();
			}).
			then(function() {
				expect(browser.query('#invitation')).toBeDefined();
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	xit('has the required form', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:7000/yose/primeFactors/ui').
			then(function() {
				expect(browser.query('input#number')).toBeDefined();
				done();
			}).
			then(function() {
				expect(browser.query('button#go')).toBeDefined();
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	xit('offers a way to ask for a decomposition', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:7000/yose/primeFactors/ui').
			then(function() {
				return browser.fill('input#number', '42').pressButton('button#go');
			}).
			then(function() {
				expect(browser.text('#result')).toEqual('42 = 2 x 3 x 7');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
	
	xdescribe('Protection', function() {
		
		var browser = new Browser();

		it('is strong enough to resist the string attack', function(done) {
			browser.visit('http://localhost:7000/yose/primeFactors/ui').
				then(function() {
					return browser.fill('input#number', 'carl').pressButton('button#go');
				}).
				then(function() {
					expect(browser.text('#result')).toEqual('carl is not a number');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

		it('is strong enough to resist the too big number attack', function(done) {
			browser.visit('http://localhost:7000/yose/primeFactors/ui').
				then(function() {
					return browser.fill('input#number', '1000001').pressButton('button#go');
				}).
				then(function() {
					expect(browser.text('#result')).toEqual('too big number (>1e6)');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

		it('is strong enough to resist the negative number attack', function(done) {
			browser.visit('http://localhost:7000/yose/primeFactors/ui').
				then(function() {
					return browser.fill('input#number', '-10').pressButton('button#go');
				}).
				then(function() {
					expect(browser.text('#result')).toEqual('-10 is not an integer > 1');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	it('offers a way to ask for the decomposition of several numbers', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:7000/yose/primeFactors/ui').
			then(function() {
				return browser.fill('input#number', '42, 15,21').pressButton('button#go');
			}).
			then(function() {
				expect(browser.text('#result')).toEqual('');
				done();
			}).
			then(function() {
				expect(browser.queryAll('ol#results li').length).toEqual(3);
				done();
			}).
			then(function() {
				expect(browser.text('ol#results li:nth-of-type(1)')).toEqual('42 = 2 x 3 x 7');
				done();
			}).
			then(function() {
				expect(browser.text('ol#results li:nth-of-type(2)')).toEqual('15 = 3 x 5');
				done();
			}).
			then(function() {
				expect(browser.text('ol#results li:nth-of-type(3)')).toEqual('21 = 3 x 7');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});

	it('resists the string attack when the user asks for several decomposition', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:7000/yose/primeFactors/ui').
			then(function() {
				return browser.fill('input#number', '42, hello').pressButton('button#go');
			}).
			then(function() {
				expect(browser.text('#result')).toEqual('');
			}).
			then(function() {
				expect(browser.queryAll('ol#results li').length).toEqual(2);
				done();
			}).
			then(function() {
				expect(browser.text('ol#results li:nth-of-type(1)')).toEqual('42 = 2 x 3 x 7');
				done();
			}).
			then(function() {
				expect(browser.text('ol#results li:nth-of-type(2)')).toEqual('hello is not a number');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});	
	
});
		
		
