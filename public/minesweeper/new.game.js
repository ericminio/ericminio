var $ 		= $ || require('jquery');
var load	= load || require('./load.grid');
var shuffle = shuffle || require('./shuffle');

var newGame = function() {
	document.grid = shuffle(8, 8);
	load();
}

var module = module || {};
module.exports = newGame;