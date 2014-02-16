var areOnSameLine = function(one, two) {
    return one.y == two.y;
};

var areOnSameColumn = function(one, two) {
    return one.x == two.x;
};

var xDirection = function(one, two) {
    return (one.x < two.x) ? +1 : (one.x == two.x ) ? 0 : -1;
};

var yDirection = function(one, two) {
    return (one.y < two.y) ? +1 : (one.y == two.y) ? 0 : -1;
};

var buildDetour = function(before, fire, after, map) {
    var detour = [];
    
    if (areOnSameLine(before, after) || areOnSameColumn(before, after)) {
        var dx = xDirection(before, after);
        var dy = yDirection(before, after);
        if (areOnSameLine(before, after)) {
            var avoidanceX = 0;
            var avoidanceY = (before.y == map.length-1) ? -1 : +1;
        }
        else {
            var avoidanceX = (before.x == map[0].length-1) ? -1 : +1;
            var avoidanceY = 0;
        }
        detour.push({ x:before.x + avoidanceX,        y:before.y + avoidanceY });
        detour.push({ x:before.x + avoidanceX + dx,   y:before.y + avoidanceY + dy });
        detour.push({ x:before.x + avoidanceX + dx*2, y:before.y + avoidanceY + dy*2 });
    }
    else {
        if (areOnSameLine(before, fire)) {
            var dx = 0;
            var dy = yDirection(before, after);
        }
        else {
            var dx = xDirection(before, after);
            var dy = 0;
        }
        detour.push({ x:before.x + dx, y:before.y + dy });
    }
    
    
    
    
    return detour;
};

module.exports = buildDetour;