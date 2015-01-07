var Cycle = require('cyclejs'),
    _     = require('lodash'),
    Rx    = Cycle.Rx,
    tile  = require('./tile');

var TICK_RATE = 250;

module.exports = Cycle.createModel(function (intent, world, gameState, viewState) {
    var tileSelected$ = intent.get('tileClick$').map(function (coords) {
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

    var provides$ = intent.get('provides$').map(function (resources) {
        return function (as) {
          _.keys(resources).forEach(function (resource) {
            as.gs.resources[resource] += resources[resource];
          });
          return as;
        };
      });

    var state = Rx.Observable.combineLatest(
      world.get('world$'),
      gameState.get('gameState$'),
      viewState.get('viewState$'),
      function (world, gs, vs) {
        var gs = _.assign(gs, world);
        return {
          gs: gs,
          vs: vs,
        };
      });

    var affords = function (as) {
      var resources = as.gs.resources;
      as.vs.affords = tile.BUILDING_COSTS.filter(function (building) {
        return _.every(_.values(building)[0], function (amt, type) {
          return resources[type] !== 'undefined' && resources[type] >= amt
        })
      });
      return as;
    }

    return {
      appState$: Rx.Observable
        .merge(tileSelected$, provides$)
        .merge(state)
        .scan(function (as, f) {
          return f(as);
        })
        .map(affords)
        .publish()
        .refCount(),
      ticker$: Rx.Observable
        .interval(TICK_RATE)
        .publish()
        .refCount(),
    };
});
