var Cycle = require('cyclejs'),
    _ = require('lodash'),
    Rx = Cycle.Rx;

var TICK_RATE = 250;

module.exports = Cycle.createModel(
  ['tileClick$', 'provides$'],
  ['world$'],
  ['gameState$'],
  ['viewState$'],
  function (intent, world, gameState, viewState) {
    var tileSelected$ = intent
      .tileClick$.map(function (coords) {
        return function (as) {
          var last = as.vs.selectedTile;
          last.selected = false;

          var tiles = as.gs.world[coords.y][coords.x]
          var tile = tiles[tiles.length - 1];
          tile.selected = true;
          as.vs.selectedTile = tile;

          return as;
        };
      });

    var provides$ = intent
      .provides$.map(function (resources) {
        return function (as) {
          Object.keys(resources).forEach(function (resource) {
            as.gs.resources[resource] += resources[resource];
          });
          return as;
        };
      });

    var state = Rx.Observable.combineLatest(
      world.world$,
      gameState.gameState$,
      viewState.viewState$,
      function (world, gs, vs) {
        var gs = _.assign(gs, world);
        return {
          gs: gs,
          vs: vs,
        };
      });

    return {
      appState$: Rx.Observable
        .merge(tileSelected$, provides$)
        .merge(state)
        .scan(function (as, f) {
          return f(as);
        })
        .publish()
        .refCount(),
      ticker$: Rx.Observable
        .interval(TICK_RATE)
        .publish()
        .refCount(),
    };
});
