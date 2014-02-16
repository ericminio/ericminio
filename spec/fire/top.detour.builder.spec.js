var buildDetour = require('../../public/fire/detour.builder');

describe('Detour builder,', function() {
   
   var map, plane, fire, water;
   var detour;

   describe('When the water is just down-left,', function() {
       
       beforeEach(function() {
           map = [
               "..P..",
               ".WF..",
           ];
           plane = { x:2, y:0 };
           fire  = { x:2, y:1 };        
           water = { x:1, y:1 };
           detour = buildDetour(plane, fire, water, map);
       });       
       
       it('can build a detour to avoid the fire', function() {
           expect(detour).toEqual([ {x:1,y:0} ]);
       });       
   });

   describe('When the water is just down-right,', function() {
       
       beforeEach(function() {
           map = [
               "..P..",
               "..FW.",
           ];
           plane = { x:2, y:0 };
           fire  = { x:2, y:1 };        
           water = { x:3, y:1 };
           detour = buildDetour(plane, fire, water, map);
       });       
       
       it('can build a detour to avoid the fire', function() {
           expect(detour).toEqual([ {x:3,y:0} ]);
       });       
   });
});