var primeFactorsOf = require('../../public/js/prime.factors');

describe('Prime Factors decomposition', function() {

	it('is available', function() {
		expect(primeFactorsOf(0)).toEqual([]);
	});
	
	it('can decompose power of two numbers', function() {
		expect(primeFactorsOf(4)).toEqual([2, 2]);
	});
	
});