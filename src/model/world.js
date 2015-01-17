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

var defaultGameState = {
  world: genWorld(),
};

// TODO this should maybe go in an appState that merges world, view and game state and
// loads from localstorage
//var savedGameState = JSON.parse(localStorage.getItem('inc-game-state')) || {};
//var combinedGameState = _.assign(defaultGameState, savedGameState);

module.exports = Cycle.createDataFlowSource({
  world$: Rx.Observable.just(defaultGameState)
});
