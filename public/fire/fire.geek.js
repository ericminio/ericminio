var url = require('url');
var positionOf = require('./objects.position.in.map');
var buildPathBetween = require('./path.builder');

var sendAnswer = function(response, answer) {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify(answer));		
	response.end();
};

var extractMap = function(incoming) {
	var params = url.parse(incoming.url, true);	
	
	var mapWidth = params.query.width;
    var regex = new RegExp('.{' + mapWidth + '}', 'g');

    return params.query.map.match(regex);
};

geek = function(incoming, response) {
    var map = extractMap(incoming);    
    var plane = positionOf.planeIn(map);
    var water = positionOf.waterIn(map);
    
    var answer = {
        map: map,
        moves: buildPathBetween(plane, water)
    };    
	sendAnswer(response, answer);
}

module.exports = geek;
