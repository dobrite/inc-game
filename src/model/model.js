var Cycle = require('cyclejs'),
    _     = require('lodash'),
    Rx    = Cycle.Rx,
    { tiles } = require('./tile');

var TICK_RATE = 250;

module.exports = Cycle.createModel(function (intent, initialGameState, initialViewState) {
  var ticker$ = Rx.Observable.interval(TICK_RATE);
  var provides$ = ticker$.map(function () {
      return function ({ buildings, resources }) {
        buildings.forEach(function (building) {
          _.map(building.provides(), function (amt, resource) {
            resources[resource] += amt;
          });
        })
        return { buildings, resources };
      };
    });

  var worldState$ = Rx.Observable
    .merge(initialGameState.get('initialWorldState$'))

  var resources$ = Rx.Observable
    .combineLatest(
      initialGameState.get('initialBuildingsState$'),
      initialGameState.get('initialResourcesState$'),
      function (buildings, resources) {
        return { buildings, resources };
      }
    )
    .merge(provides$)
    .scan(function ({ buildings, resources }, f) {
      return f({ buildings, resources });
    })

  var affords$ = resources$.map(function ({ buildings, resources }) {
    var affords = tiles.BUILDING_COSTS.filter(function (building) {
      return _.every(_.values(building)[0], function (amt, type) {
        return typeof resources[type] !== 'undefined' && resources[type] >= amt
      })
    });

    return {
      buildings,
      resources,
      affords,
    };
  });

  var tileSelected$ = intent.get('tileClick$')
    .combineLatest(worldState$, function ({y, x}, world) {
      return function (vs) {
        vs.lastSelectedTile = vs.tile;
        vs.lastSelectedTile.selected = false;

        var tile = world[y][x][world[y][x].length - 1];
        tile.selected = true;
        vs.tile = tile;
        return vs
      };
    });

  var viewState$ = Rx.Observable
    .merge(initialViewState.get('initialViewState$'))
    .merge(tileSelected$)
    .scan(function (vs, f) {
      return f(vs);
    });

  return {
    viewState$: viewState$,
    worldState$: worldState$,
    affords$: affords$
  };
});
