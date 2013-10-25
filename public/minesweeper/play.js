var $ = $ || require('jquery');

var around = [
	[-1, -1], [-1, 0], [-1, +1],
	[ 0, -1],		   [ 0, +1],
	[+1, -1], [+1, 0], [+1, +1],			
];

var rowCount = function() {
	return $('#grid [id^=cell]').length / columnCount();
};

var columnCount = function() {
	return $('#grid [id^=cell1]').length;
};

var thereIsABombIn = function(cell) {
	return cell == undefined ? false : cell.attr('class').indexOf('bomb') != -1;
};

var isStillHidden = function(cell) {
	return cell == undefined ? false : cell.attr('class') == 'bomb' || cell.attr('class') == 'empty';
};

var cellAt = function(line, column) {
	var cell = $('#grid [id^=cell' + line + column + ']');
	return cell.length == 0 ? undefined: cell;
};

var youLoose = function(cell) {
	cell.attr('class', 'lost');
	$('#message').addClass('alert-danger');
	$('#message').text('You loose. Reload the page to play again');
};

var youAreSafe = function(cell) {
	cell.attr('class', 'safe');
};

var declareSuspect = function(cell) {
	cell.addClass('suspect');
};

var bombNeighbourCount = function(line, column) {
	var count = 0;
	for(var i=0; i<around.length; i++) {
		var offset = around[i];
		if (thereIsABombIn(cellAt(line + offset[0], column + offset[1]))) {
			count ++;
		}
	}
	return count;
};

var displayClueIn = function(line, column) {
	var count = bombNeighbourCount(line, column);
	if (count > 0 ) {
		cellAt(line, column).text(count);
	}
};

var open = function(line, column) {
	var cell = cellAt(line, column);
	
	youAreSafe(cell);
	displayClueIn(line, column);
	
	if (bombNeighbourCount(line, column) == 0) {
		for(var i=0; i<around.length; i++) {
			var offset = around[i];
			var cell = cellAt(line + offset[0], column + offset[1]);
			if (cell != undefined && isStillHidden(cell)) {
				open(line + offset[0], column + offset[1]);
			}
		}
	}
};

var play = function(line, column) {
	var cell = cellAt(line, column);
	
	if ($('#suspect-mode').prop('checked') == true) {
		declareSuspect(cell);
		return;
	}
	
	
	if (thereIsABombIn(cell)) {
		youLoose(cell);
	}
	else {
		open(line, column);
		
		var notPlayedCount = 0;
		for(var i=1; i<=rowCount(); i++) {
			for(var j=1; j<=columnCount(); j++) {
				if (cellAt(i, j).attr('class').indexOf('empty') != -1) notPlayedCount ++;
			}
		}
		
		if (notPlayedCount == 0) {
			$('#message').addClass('alert-success');
			$('#message').text('You win! Reload the page to play again');
		}
	}
};

var module = module || {};
module.exports = play;
module.exports.cellAt = cellAt;