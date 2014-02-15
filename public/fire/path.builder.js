var pathBuilder = function(object, target) {
    var plane = { x:object.x, y:object.y };
    
    var moves = []; 
    
    var offset = plane.x < target.x ? 1 : -1;
    while (plane.x - target.x != 0) {
        moves.push({ dx:offset, dy:0 });
        plane.x += offset;
    }
    
    var offset = plane.y < target.y ? 1 : -1;
    while (plane.y - target.y != 0) {
        moves.push({ dx:0, dy:offset });
        plane.y += offset;
    }
    
    return moves;
};

module.exports = pathBuilder;