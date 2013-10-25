var $ = $ || require('jquery');

var load = function() {
	var data = document.grid;
	var table = $('table#grid');
	table.empty();
	for(var line=0; line < data.length; line++) {
		table.append('<tr></tr>');
		var row = $('table#grid tr:nth-child(' + (line+1) + ')');
		for(var column=0; column < data[line].length; column++) {
			var content = '<td class="empty" id="cell-' + (line+1) + 'x' + (column+1) + '" onclick="play(' + (line+1) + ', ' + (column+1) + ')"></td>';
			if (data[line][column] == 'bomb') {
				content = content.replace('empty', 'bomb');
			}
			row.append(content);
		}
	}
}

var module = module || {};
module.exports = load;