var positionOf = require('./../../public/fire/objects.position.in.map');

describe('Plane position', function() {
    
    var plane;
    
    beforeEach(function() {
        plane = positionOf.planeIn([
                ".....",
                "..P..",
                "....."
            ]);
    });
    
    it('is known in a map (x)', function() {
        expect(plane.x).toEqual(2);
    });

    it('is known in a map (y)', function() {
        expect(plane.y).toEqual(1);
    });
});