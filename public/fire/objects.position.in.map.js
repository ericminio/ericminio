var objectIn = function(map, code) {
    var x;
    var y = -1;
    var found = false;
    for (var i=0; i< map.length; i++) {
        var line = map[i];
        y = y + 1;
        var planeIndex = line.indexOf(code);
        if (planeIndex !== -1) {
            x = planeIndex;
            return { x: planeIndex, y:y };
        }
    }
}

var planeIn = function(map) {
    return objectIn(map, 'P');
}

var waterIn = function(map) {
    return objectIn(map, 'W');
}

var fireIn = function(map) {
    return objectIn(map, 'F');
}

module.exports.planeIn = planeIn;
module.exports.waterIn = waterIn;
module.exports.fireIn  = fireIn;
