var serving = require('../../public/js/serving');
var Server  = require('../../public/js/server');
var Browser = require('zombie');

describe("Minesweeper page", function() {

	var minesweeperUrl = 'http://localhost:7000/yose/minesweeper';
	var server = new Server(serving('public'));
	var browser;
	
	beforeEach(function() {
		server.start();
		browser = new Browser();
	});

	afterEach(function() {
		server.stop();
	});
	
	var selector = function(line, column) {
		return '#grid [id^=cell-' + line + 'x' + column + ']';
	};
	var play = function(line, column, browser) {
		var onclick = browser.query(selector(line, column)).onclick;
		browser.evaluate(onclick);
	};
	var cellClass = function(line, column, browser) {
		return browser.query(selector(line, column)).className;
	};
	var cellContent = function(line, column, browser) {
		return browser.text(selector(line, column));
	};

	describe('initial grid', function() {
	
		it('has a 64 cells', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					expect(browser.queryAll('#grid [id^=cell]').length).toEqual(64);				
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

		it('has a 8 columns', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					for(var line=0; line<8; line ++) {
						expect(browser.queryAll('#grid [id^=cell-' + (line+1) + ']').length).toEqual(8);
					}
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
	});

	describe('Loading a game', function() {

		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('sets up the board correctly', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					expect(cellClass(1, 1, browser)).toEqual('bomb');
				}).
				then(function() {
					expect(cellClass(1, 2, browser)).toEqual('empty');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

	});
	
	describe('playing', function() {

		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('might lead to loosing when clicking on a cell containing a bomb', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					play(1, 1, browser);
				}).
				then(function() {
					expect(cellClass(1, 1, browser)).toEqual('lost');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('might keep you safe when clicking on an empty cell', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					play(1, 2, browser);
				}).
				then(function() {
					expect(cellClass(1, 2, browser)).toEqual('safe');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe('playing by clicking', function() {

		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('might lead to loosing when clicking on a cell containing a bomb', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					browser.click('#cell-1x1');
				}).
				then(function() {
					expect(cellClass(1, 1, browser)).toEqual('lost');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		
	});
	
    describe('Clues', function() {
		
		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('are displayed when playing next to a bomb', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					play(1, 2, browser);
				}).
				then(function() {
					expect(cellContent(1, 2, browser)).toEqual('2');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe('Opening', function() {
		
		var data = [
			[ 'bomb',  'empty', 'empty', 'empty'],
			[ 'empty', 'bomb',  'empty', 'empty'],
			[ 'empty', 'empty', 'bomb' , 'empty'],
		];

		it('lets the opening cell empty', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					play(1, 4, browser);
				}).
				then(function() {
					expect(cellContent(1, 4, browser)).toEqual('');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('makes safe all surrounding safe cells', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					play(1, 4, browser);
				}).
				then(function() {
					expect(cellClass(1, 3, browser)).toEqual('safe');
				}).
				then(function() {
					expect(cellContent(1, 3, browser)).toEqual('1');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});

	});
	
	describe('marking a cell as suspect', function() {
	
		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('is done by switching to suspect mode', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					browser.check('#suspect-mode');
				}).
				then(function() {
					play(1, 1, browser);
				}).
				then(function() {
					expect(cellClass(1, 1, browser)).toContain('suspect');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		it('does not prevent you from loosing if you play normally on it', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					browser.check('#suspect-mode');
				}).
				then(function() {
					play(1, 1, browser);
				}).
				then(function() {
					browser.uncheck('#suspect-mode');
				}).
				then(function() {
					play(1, 1, browser);
				}).
				then(function() {
					expect(cellClass(1, 1, browser)).toEqual('lost');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
		
		
	});
	
	describe('Loosing', function() {
		
		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('stops the game and invites to reload the page to play again', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					expect(browser.query('#message').className).toEqual('alert');
				}).
				then(function() {
					play(1, 1, browser);
				}).
				then(function() {
					expect(browser.query('#message').className).toContain('alert-danger');
				}).
				then(function() {
					expect(browser.text('#message')).toContain('You loose');
					expect(browser.text('#message')).toContain('Reload');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});				
	});
	
	describe('Winning', function() {
	
		var data = [
			[ 'bomb',  'empty', 'empty'],
			[ 'empty', 'bomb',  'empty'],
			[ 'empty', 'empty', 'bomb' ],
		];

		it('congratulates and to play again', function(done) {
			browser.visit(minesweeperUrl).
				then(function() {
					browser.document.grid = data;
					browser.evaluate("load()");
				}).
				then(function() {
					play(2, 1, browser);
					play(3, 1, browser);
					play(1, 2, browser);
					play(3, 2, browser);
					play(1, 3, browser);
					play(2, 3, browser);
				}).
				then(function() {
					expect(browser.query('#message').className).toContain('alert-success');
				}).
				then(function() {
					expect(browser.text('#message')).toContain('You win!');
					expect(browser.text('#message')).toContain('Reload');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
	describe('Game', function() {
	
		it('is new everytime you play', function(done) {
			var first;
			var second;
			browser.visit(minesweeperUrl).
				then(function() {
					first = browser.document.grid;
					browser.visit(minesweeperUrl).
						then(function() {
							second = browser.document.grid;
						}).
						then(function() {
							expect(second).not.toEqual(first);
							done();
						}).
						fail(function(error) {
							expect(error.toString()).toBeNull();
							done();
						});
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	});
	
});
		
		
