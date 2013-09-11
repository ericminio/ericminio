var primeFactorsOf = require('../../public/js/prime.factors');

describe('Prime Factors decomposition', function() {

	it('is available', function() {
		expect(primeFactorsOf(0)).toEqual([]);
	});
	
	it('can decompose power of two numbers', function() {
		expect(primeFactorsOf(4)).toEqual([2, 2]);
	});
	
	it('can decompose power of three numbers', function() {
		expect(primeFactorsOf(27)).toEqual([3, 3, 3]);
	});
	
	it('can decompose 8946', function() {
		expect(primeFactorsOf(8946)).toEqual([2,3,3,7,71]);
	});
});