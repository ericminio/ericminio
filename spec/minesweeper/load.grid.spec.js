var load = require('../../public/minesweeper/load.grid.js');
var $ = require('jquery');

describe('Load grid', function() {
	
	var data = [
		[ 'bomb',  'empty', 'empty'],
		[ 'empty', 'bomb',  'empty'],
		[ 'empty', 'empty', 'bomb' ],
	];
	
	beforeEach(function() {
		$('body').append('<table id="grid"></table>');
		document = { grid: data };
		load();
	});
	
	it('creates a grid with 9 cells', function() {
		expect($('#grid [id^=cell]').length).toEqual(9);
	});
	
	it('creates the expected amount of columns for each line', function() {
		for(var line=0; line<data.length; line ++) {
			expect($('#grid [id^=cell-' + (line+1) + ']').length).toEqual(data[line].length);
		}
	});
	
	it('sets the class of bombs', function() {
		expect($('#grid [id=cell-1x1]').attr('class')).toEqual('bomb');
	});
	
	it('sets the class of empty slots', function() {
		expect($('#grid [id=cell-2x1]').attr('class')).toEqual('empty');
	});
	
	it('makes each cell playable', function() {
		expect($('#grid [id=cell-2x3]').attr('onclick')).toEqual('play(2, 3)');
	});
});