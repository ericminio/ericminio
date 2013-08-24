primeFactorsOf = function(number) {
	if (number == 0) return [];
	if (number == 1) return [];
	if (number % 2 == 0) return [].concat(2, primeFactorsOf(number / 2));
};

module.exports = primeFactorsOf;