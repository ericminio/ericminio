var buildPathBetween = require('../../public/fire/path.builder');

describe('Finding a path between an object and a target', function() {

    it('is easy when the target is one x away on the right', function() {
        var plane = { x:3, y:3 };
        var water = { x:4, y:3 };
        
        expect(buildPathBetween(plane, water)).toEqual([{ dx:1, dy: 0 }]);
    });

    it('is easy when the target is two x away on the right', function() {
        var plane = { x:3, y:3 };
        var water = { x:5, y:3 };
        
        expect(buildPathBetween(plane, water)).toEqual([
            { dx:1, dy: 0 }, { dx:1, dy: 0 }]);
    });
    
    it('does not actually move the given object', function() {
        var plane = { x:3, y:4 };
        var water = { x:5, y:3 };
        buildPathBetween(plane, water);
        
        expect(plane.x).toEqual(3);
        expect(plane.y).toEqual(4);
    });
    
    it('is easy too when the target is on the left', function() {
        var plane = { x:3, y:3 };
        var water = { x:0, y:3 };
        
        expect(buildPathBetween(plane, water)).toEqual([
            { dx:-1, dy: 0 }, { dx:-1, dy: 0 }, { dx:-1, dy: 0 }]);
    });
    
    it('is even easy when the target is above', function() {
        var plane = { x:3, y:3 };
        var water = { x:3, y:1 };
        
        expect(buildPathBetween(plane, water)).toEqual([
            { dx:0, dy: -1 }, { dx:0, dy: -1 }]);
    });

    it('is actually starting with x', function() {
        var plane = { x:3, y:5 };
        var water = { x:4, y:3 };
        
        expect(buildPathBetween(plane, water)).toEqual([
            { dx:1, dy: 0 }, { dx:0, dy: -1 }, { dx:0, dy: -1 }]);
    });
});