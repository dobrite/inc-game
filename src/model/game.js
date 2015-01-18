var Cycle = require('cyclejs'),
    _ = require('lodash'),
    { tiles } = require('./tile');

var WIDTH = 50;
var HEIGHT = 50;

var genWorld = function () {
  var world = [];
  var beach = 5;
  var forest = 35;
  var type;

  for (var y = 0; y < HEIGHT; y++) {
    world[y] = [];

    for (var x = 0; x < WIDTH; x++) {
      if (x < beach) {
        type = 'ocean';
      } else if (x < forest) {
        type = 'plain';
      } else {
        type = 'forest';
      }

      world[y][x] = [new tiles.Tile({ y, x, type })];
    }
  }

  return world;
};

var world = genWorld();
var resources = { gold: 250, fish: 0 };
var buildings = [
  new tiles.Fishery({y: 13, x: 5}),
  new tiles.Fishery({y: 14, x: 5}),
  new tiles.Fishery({y: 15, x: 5})
];

buildings.map(function (bldg) {
  world[bldg.y][bldg.x].push(bldg);
});

module.exports = Cycle.createDataFlowSource({
  initialResourcesState$: Rx.Observable.just(resources),
  initialWorldState$: Rx.Observable.just(world),
  initialBuildingsState$: Rx.Observable.just(buildings),
});
