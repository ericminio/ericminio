var buildPathBetween = require('../../public/fire/path.builder');
var equal = require('deep-equal');
var buildDetour = require('../../public/fire/detour.builder');
var positionOf = require('./../../public/fire/objects.position.in.map');
var avoidFire = require('./../../public/fire/avoid');
var avoid = avoidFire.avoid;
var buildPositionsFromMovesStartingFrom = avoidFire.buildPositionsFromMovesStartingFrom;
var indexOfPosition = avoidFire.indexOfPosition;
var convertDetourIntoMoves = avoidFire.convertDetourIntoMoves;
var replaceMovesAtIndex = avoidFire.replaceMovesAtIndex;

describe('Path modification', function() {
    
    var map;
    var plane, water, fire, moves, positions;
    var indexBeforeFire, indexOfFire, indexAfterFire;
    var detour, movesOfDetour;
    
    beforeEach(function() {
        map = [
            "P...F....W",
            "..........",
        ];
        plane = { x:0, y:0 };
        water = { x:9, y:0 };
        fire =  { x:4, y:0 };
        
        moves = avoidFire(map);
        positions = buildPositionsFromMovesStartingFrom(plane, moves);
    });
    
    it('allows to avoid a specific position', function() {        
        expect(positions).not.toContain({ x:4, y:0});
    });
    
    it('reaches the fire', function() {        
        expect(positions).toContain({ x:9, y:0});
    });
    
    describe('algo', function() {
        beforeEach(function() {
            moves = buildPathBetween(plane, water);
            positions = buildPositionsFromMovesStartingFrom(plane, moves);

            indexOfFire = indexOfPosition(fire, positions);
            indexBeforeFire = indexOfFire - 1;
            indexAfterFire = indexOfFire + 1;
            detour = buildDetour(positions[indexBeforeFire], fire, positions[indexAfterFire], map);
            movesOfDetour = convertDetourIntoMoves(positions[indexBeforeFire], detour, positions[indexAfterFire]);
            moves = replaceMovesAtIndex(indexOfFire, moves, movesOfDetour);

        });
        it('can detect position before fire in path', function() {                
            expect(positions[indexBeforeFire]).toEqual({ x:3, y:0 });
        });

        it('identifies the detour', function() {
            expect(detour).toEqual([ {x:3,y:1}, {x:4,y:1}, {x:5, y:1} ]);
        });

        it('can translate a detour into moves', function() {
            expect(movesOfDetour).toEqual([ {dx:0,dy:1}, {dx:1, dy:0}, {dx:1, dy:0}, {dx:0, dy:-1} ]);
        });
    });
    
});