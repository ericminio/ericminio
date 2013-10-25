var load = require('../../public/minesweeper/load.grid.js');
var play = require('../../public/minesweeper/play.js');
var $ = require('jquery');

describe('Playing', function() {
	
	var data = [
		[ 'bomb',  'empty', 'empty', 'empty', 'empty'],
		[ 'empty', 'bomb',  'empty', 'empty', 'empty'],
		[ 'empty', 'empty', 'bomb' , 'empty', 'empty'],
	];
	
	beforeEach(function() {
		$('body').append('<table id="grid"></table>');
		document = { grid: data };
		load();
		
		this.addMatchers({ 
			toBeLost: function() {
				this.message = function() {
					return "Expected '" + this.actual.attr('class') + "' to equal 'lost'";
				};
				return this.actual.attr('class') == 'lost';
			}, 
			toBeSafe: function() {
				this.message = function() {
					return "Expected '" + this.actual.attr('class') + "' to equal 'safe'";
				};
				return this.actual.attr('class') == 'safe';
			},
			toBeSafeWithBombCountAroundEqualTo: function(n) {
				this.message = function() {
					return "Expected " + this.actual.attr('class') + ":'" + this.actual.text() + "' to equal 'safe':'" + n + "'";
				};
				return this.actual.attr('class') == 'safe' && this.actual.text() == n;
			},
			toBeSafeWithNoBombAround: function() {
				this.message = function() {
					return "Expected " + this.actual.attr('class') + ":''" + this.actual.text() + " to equal 'safe':''";
				};
				return this.actual.attr('class') == 'safe' && this.actual.text() == '';
			},
			toBeSuspect: function() {
				this.message = function() {
					return "Expected '" + this.actual.attr('class') + "' to contain 'suspect'";
				};
				return this.actual.attr('class').indexOf('suspect') != -1;
			},
		});
	});

	afterEach(function() {
		$('#grid').remove();
	});

	it('turns a bomb cell into lost', function() {
		play(1, 1);
		expect(play.cellAt(1, 1)).toBeLost();
	});	
	
	it('turns an empty cell into safe', function() {
		play(1, 2);
		expect(play.cellAt(1, 2)).toBeSafe();
	});	
	
	describe('Clues', function() {
	
		it('displays when there are 2 bombs around', function() {
			play(1, 2);
			expect(play.cellAt(1, 2)).toBeSafeWithBombCountAroundEqualTo(2);
		});

		it('displays when there is 1 bomb around', function() {
			play(1, 3);
			expect(play.cellAt(1, 3)).toBeSafeWithBombCountAroundEqualTo(1);
		});

		it('displays nothing when there is 0 bomb around', function() {
			play(1, 4);
			expect(play.cellAt(1, 4)).toBeSafeWithNoBombAround();
		});
	});
	
	describe('Opening', function() {
		
		it('opens the cells around', function() {
			play(1, 5);
			expect(play.cellAt(1, 4)).toBeSafeWithNoBombAround();
		});
		
		it('opens recurcively', function() {
			play(1, 5);
			expect(play.cellAt(1, 3)).toBeSafeWithBombCountAroundEqualTo(1);
		});
	});
	
	describe('accessing cells', function() {
	
		it('is possbile inside of the board', function() {
			expect(play.cellAt(1, 1)).toBeDefined();
		});
		
		it('is not possible outside of the board', function() {
			expect(play.cellAt(0, 0)).toBe(undefined);
		});
	});
	
	describe('Suspect mode', function() {
		
		beforeEach(function() {
			$('body').append('<input type="checkbox" id="suspect-mode">');
		});
		
		afterEach(function() {
			$('#suspect-mode').remove();
		});

		it('allows the player to identify a cell as suspect', function() {
			$('#suspect-mode').prop('checked', true);
			play(1, 1);
			expect(play.cellAt(1, 1)).toBeSuspect();
		});
		
		it('lets you open a cell when you come back to normal mode', function() {
			$('#suspect-mode').prop('checked', true);
			play(1, 2);
			$('#suspect-mode').prop('checked', false);
			play(1, 2);
			
			expect(play.cellAt(1, 2)).toBeSafeWithBombCountAroundEqualTo(2);
		});
		
		it('lets you loose when you come back to normal mode', function() {
			$('#suspect-mode').prop('checked', true);
			play(1, 1);
			$('#suspect-mode').prop('checked', false);
			play(1, 1);
			
			expect(play.cellAt(1, 1)).toBeLost();
		});
	});
	
	describe('Loosing', function() {
		
		beforeEach(function() {
			$('body').append('<label id="message" class="alert">any</label>');
			play(1, 1);
		});
		
		afterEach(function() {
			$('#message').remove();
		});

		it('styles the message to failure', function() {
			expect($('#message').attr('class')).toContain('alert-danger');
		});
		
		it('invites to play again', function() {
			expect($('#message').text()).toContain('play again');
		});
	});
	
	describe('Winning', function() {

		beforeEach(function() {
			var data = [
				[ 'bomb',  'empty'],
				[ 'empty', 'bomb' ],
			];
			document = { grid: data };
			load();			
			$('body').append('<label id="message" class="alert">any</label>');
			play(1, 2);
			play(2, 1);
		});

		afterEach(function() {
			$('#message').remove();
		});

		it('styles the message to success', function() {
			expect($('#message').attr('class')).toContain('alert-success');
		});

		it('invites to play again', function() {
			expect($('#message').text()).toContain('play again');
		});
	});
	
});