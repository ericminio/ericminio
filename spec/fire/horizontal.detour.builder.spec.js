var buildDetour = require('../../public/fire/detour.builder');

describe('Detour builder,', function() {
   
   var map, plane, fire, water;
   var detour;

   describe('When from left to right: P F W,', function() {
       
       beforeEach(function() {
           plane = { x:0, y:1 };
           fire  = { x:1, y:1 };        
           water = { x:2, y:1 };
       });
       
       describe('And there is room below', function() {
           
           beforeEach(function() {
                map = [
                    ".....",
                    "PFW..",
                    ".....",
                ];
                detour = buildDetour(plane, fire, water, map);
           });

           it('can build a detour to avoid the fire', function() {
               expect(detour).toEqual([ {x:0,y:2}, {x:1,y:2}, {x:2, y:2} ]);
           });
       });
       
       describe('And there is no room below', function() {
           
           beforeEach(function() {
                map = [
                    ".....",
                    "PFW..",
                ];
                detour = buildDetour(plane, fire, water, map);
           });

           it('can avoid a fire on the left', function() {
               expect(detour).toEqual([ {x:0,y:0}, {x:1,y:0}, {x:2, y:0} ]);
           });
       });
   });
   
   describe('When from right to left: W F P,', function() {

       beforeEach(function() {
           plane = { x:2, y:1 };
           fire  = { x:1, y:1 };        
           water = { x:0, y:1 };
       });
       
       describe('And there is room below', function() {
           
           beforeEach(function() {
                map = [
                    ".....",
                    "WFP..",
                    ".....",
                ];
                detour = buildDetour(plane, fire, water, map);
           });

           it('can build a detour to avoid the fire', function() {
               expect(detour).toEqual([ {x:2,y:2}, {x:1,y:2}, {x:0, y:2} ]);
           });
       });

       describe('And there is no room below', function() {
           
           beforeEach(function() {
                map = [
                    ".....",
                    "PFW..",
                ];
                detour = buildDetour(plane, fire, water, map);
           });

           it('can build a detour to avoid the fire', function() {
               expect(detour).toEqual([ {x:2,y:0}, {x:1,y:0}, {x:0, y:0} ]);
           });
       });
   });

});