var buildDetour = require('../../public/fire/detour.builder');

describe('Detour builder,', function() {
   
   var map, plane, fire, water;
   var detour;

   describe('When from top to bottom: P F W,', function() {
       
       beforeEach(function() {
           plane = { x:2, y:0 };
           fire  = { x:2, y:1 };        
           water = { x:2, y:2 };
       });
       
       describe('And there is room on the right', function() {
           
           beforeEach(function() {
                map = [
                    "..P....",
                    "..F....",
                    "..W....",
                ];
                detour = buildDetour(plane, fire, water, map);
           });

           it('can build a detour to avoid the fire', function() {
               expect(detour).toEqual([ {x:3,y:0}, {x:3,y:1}, {x:3, y:2} ]);
           });
       });

       describe('And there is no room on the right', function() {
           
           beforeEach(function() {
                map = [
                    "..P",
                    "..F",
                    "..W",
                ];
                detour = buildDetour(plane, fire, water, map);
           });

           it('can build a detour to avoid the fire', function() {
               expect(detour).toEqual([ {x:1,y:0}, {x:1,y:1}, {x:1, y:2} ]);
           });
       });
   });
   
   describe('When from bottom to top: W F P,', function() {

          beforeEach(function() {
              plane = { x:2, y:2 };
              fire  = { x:2, y:1 };        
              water = { x:2, y:0 };
          });

          describe('And there is room on the right', function() {

              beforeEach(function() {
                   map = [
                       "..W....",
                       "..F....",
                       "..P....",
                   ];
                   detour = buildDetour(plane, fire, water, map);
              });

              it('can build a detour to avoid the fire', function() {
                  expect(detour).toEqual([ {x:3,y:2}, {x:3,y:1}, {x:3, y:0} ]);
              });
          });
          
          describe('And there is no room on the right', function() {

                beforeEach(function() {
                     map = [
                         "..W",
                         "..F",
                         "..P",
                     ];
                     detour = buildDetour(plane, fire, water, map);
                });

                it('can build a detour to avoid the fire', function() {
                    expect(detour).toEqual([ {x:1,y:2}, {x:1,y:1}, {x:1, y:0} ]);
                });
            });
      });
});