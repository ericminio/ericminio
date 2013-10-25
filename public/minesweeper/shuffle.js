var shuffle = function(rowCount, columnCount) {
	var cells = [];
	for (i=0; i<rowCount; i++) {
		var row = [];
		for (var j=0; j<columnCount; j++) {
			row.push('empty');
		}
		cells.push(row);
	}
	
	var bombCount = Math.ceil(rowCount*columnCount / 10) + 1;
	for(var n=0; n<bombCount; n++) {
		var rnd = Math.floor( Math.random() * rowCount * columnCount );		
		var bombLine = Math.floor(rnd / columnCount);
		var bombColumn = rnd % columnCount;
		while(cells[bombLine][bombColumn] == 'bomb') {
			rnd = Math.floor( Math.random() * rowCount * columnCount );		
			bombLine = Math.floor(rnd / columnCount);
			bombColumn = rnd % columnCount;
		}
		
		cells[bombLine][bombColumn] = 'bomb';
	}
	return cells;
}

var module = module || {};
module.exports = shuffle;