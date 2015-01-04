var Cycle  = require('cyclejs'),
    assign = Object.assign || require('object.assign'),
    tile   = require('./tile');

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

      world[y][x] = [new tile.Tile(y, x, type)];

      // TODO remove this is for debug
      if (y == 13 && x == 5) {
        world[y][x].push(new tile.Tile(13, 5, 'fishery'));
      }
    }
  }

  return world;
};

var defaultGameState = {
  world: genWorld(),
};

// TODO this should maybe go in an appState that merges world, view and game state and
// loads from localstorage
//var savedGameState = JSON.parse(localStorage.getItem('inc-game-state')) || {};
//var combinedGameState = assign(defaultGameState, savedGameState);

module.exports = Cycle.createDataFlowSource({
  world$: Rx.Observable.just(defaultGameState)
});
