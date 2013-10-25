var shuffle = require('../../public/minesweeper/shuffle');

var forEachCellIn = function(array, callback) {
	for(var i=0; i<array.length; i++) {
		for(var j=0; j<array[i].length; j++) {
			callback(array[i][j]);
		}
	}
};

describe('Shuffle', function() {

	describe('returns a grid', function() {
		var data;
		
		beforeEach(function() {
			data = shuffle(2, 3);
		});

		it('with expected line count', function() {
			expect(data.length).toEqual(2);
		});
		
		it('expected column count', function() {
			expect(data[0].length).toEqual(3);
			expect(data[1].length).toEqual(3);
		});
		
		it('with a majority of empty cells', function() {
			var count = 0;
			forEachCellIn(data, function(item) { if (item == 'empty') count ++; });

			expect(count).toBeGreaterThan(2*3 / 2);
		});
		
		it('with 10% of bombs', function() {
			var count = 0;
			forEachCellIn(data, function(item) { if (item == 'bomb') count ++; });

			expect(count).toBeGreaterThan(Math.ceil(2*3 / 10));
		});
	});
	
	it('returns often a different grid', function() {
		var first = shuffle(2, 3);
		var same = true;
		for(var i=0; i<=5; i++) {
			var second = shuffle(2, 3);
			if (second != first) {
				same = false;
			}
		}
		
		expect(same).toBe(false);
	});
	
});