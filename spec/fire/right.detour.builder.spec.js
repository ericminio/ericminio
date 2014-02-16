var buildDetour = require('../../public/fire/detour.builder');

describe('Detour builder,', function() {
   
   var map, plane, fire, water;
   var detour;

   describe('When the water is just up-left,', function() {
       
       beforeEach(function() {
           map = [
               "..W..",
               "..FP.",
           ];
           plane = { x:3, y:1 };
           fire  = { x:2, y:1 };        
           water = { x:2, y:0 };
           detour = buildDetour(plane, fire, water, map);
       });       
       
       it('can build a detour to avoid the fire', function() {
           expect(detour).toEqual([ {x:3,y:0} ]);
       });
       
   });

   describe('When the water is just down-left,', function() {
       
       beforeEach(function() {
           map = [
               ".....",
               "..FP.",
               "..W..",
           ];
           plane = { x:3, y:1 };
           fire  = { x:2, y:1 };        
           water = { x:2, y:2 };
           detour = buildDetour(plane, fire, water, map);
       });       
       
       it('can build a detour to avoid the fire', function() {
           expect(detour).toEqual([ {x:3,y:2} ]);
       });
       
   });
});