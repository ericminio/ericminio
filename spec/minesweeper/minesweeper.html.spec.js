var cheerio = require('cheerio');
var fs 		= require('fs');

describe("Minesweeper page", function() {

	var page;
	
	beforeEach(function() {
		var html = fs.readFileSync('./public/minesweeper/minesweeper.html').toString();
		page = cheerio.load(html);		
	})

	it('has an appropriate title', function() {
		expect(page('#title').text()).toContain('Minesweeper');
	});
	
	it('has a grid', function() {
		expect(page('table#grid').length).toEqual(1);
	});
	
});
		
		
