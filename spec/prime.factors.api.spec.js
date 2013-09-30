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
			expect(response.statusCode).toEqual(200);
			expect(body).toEqual(JSON.stringify( { 
				number : 8,
				decomposition : [2, 2, 2]
			} ));
			done();
		});
	});
	
	it('resists string attacks', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=toto", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 'toto',
				error : 'not a number'
			}));
			done();
		});
	});
		
	it('resists big number attacks', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=1000001", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 1000001,
				error : 'too big number (>1e6)'
			}));
			done();
		});
	});

	it('resists not decomposable number attacks', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=1", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 1,
				error : 'not an integer > 1'
			}));
			done();
		});
	});

	it('resists mixed attacks', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=2zer", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : '2zer',
				error : 'not a number'
			}));
			done();
		});
	});
		
	it('resists not provided number attacks', function(done) {
		request("http://localhost:7000/yose/primeFactors?", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 'undefined',
				error : 'number not provided'
			}));
			done();
		});
	});

	it('resists not provided at all number attacks', function(done) {
		request("http://localhost:7000/yose/primeFactors", function(error, response, body) {
			expect(response.statusCode).toEqual(400);
			expect(body).toEqual(JSON.stringify( { 
				number : 'undefined',
				error : 'number not provided'
			}));
			done();
		});
	});
	
	it('can decompose several numbers', function(done) {
		request("http://localhost:7000/yose/primeFactors?number=8&number=21", function(error, response, body) {
			expect(response.statusCode).toEqual(200);
			expect(body).toEqual(JSON.stringify( 
				[
					{ 
						number : 8,
						decomposition : [2, 2, 2]
					},
					{ 
						number : 21,
						decomposition : [3, 7]
					},
				]
 			));
			done();
		});		
	});
});

