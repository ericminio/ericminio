var buildPathBetween = require('./path.builder');
var equal = require('deep-equal');
var buildDetour = require('./detour.builder');
var positionOf = require('./objects.position.in.map');

var buildPositionsFromMovesStartingFrom = function(start, moves) {
    var positions = [];

    var last = { x:start.x, y:start.y };
    positions.push(last);
    for (var i=0; i<moves.length; i++) {
        var next = { x:last.x + moves[i].dx , y:last.y + moves[i].dy };
        positions.push(next);
        last = next;
    }
    
    return positions;
};

var indexOfPosition = function(target, positions) {
    for (var i=0; i<positions.length; i++) {
        if (equal(positions[i], target)) {
            return i;
        }
    }
};

var convertDetourIntoMoves = function(start, positions, end) {
    var moves = [];
    var current = { x:start.x, y:start.y }
    for (var i=0; i<positions.length; i++) {
        var position = positions[i];
        moves.push({ dx:position.x-current.x, dy:position.y-current.y});
        current = position;
    }
    moves.push({ dx:end.x-current.x, dy:end.y-current.y });
    return moves;
};

var replaceMovesAtIndex = function(index, moves, detour) {
    var after = moves.slice(index + 1);
    return moves.slice(0, index - 1).concat(detour).concat(after);
};

var avoid = function(fire, start, end, map) {
    var moves = buildPathBetween(start, end);
    var positions = buildPositionsFromMovesStartingFrom(start, moves);
    
    var indexOfFire = indexOfPosition(fire, positions);
    var indexBeforeFire = indexOfFire - 1;
    var indexAfterFire = indexOfFire + 1;
    var detour = buildDetour(positions[indexBeforeFire], fire, positions[indexAfterFire], map);
    var movesOfDetour = convertDetourIntoMoves(positions[indexBeforeFire], detour, positions[indexAfterFire]);
    
    return replaceMovesAtIndex(indexOfFire, moves, movesOfDetour);
};

var avoidFire = function(map) {
    var plane = positionOf.planeIn(map);
    var fire  = positionOf.fireIn(map);
    var water = positionOf.waterIn(map);
    
    return avoid(fire, plane, water, map);
};

module.exports = avoidFire;
module.exports.avoid = avoid;
module.exports.buildPositionsFromMovesStartingFrom = buildPositionsFromMovesStartingFrom;
module.exports.indexOfPosition = indexOfPosition;
module.exports.convertDetourIntoMoves = convertDetourIntoMoves;
module.exports.replaceMovesAtIndex = replaceMovesAtIndex;

