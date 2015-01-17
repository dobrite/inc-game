var Cycle = require('cyclejs'),
    _     = require('lodash'),
    Rx    = Cycle.Rx,
    { tiles } = require('./tile');

var TICK_RATE = 250;

module.exports = Cycle.createModel(function (intent, initialGameState, initialViewState) {
  var ticker$ = Rx.Observable.interval(TICK_RATE);
  var provides$ = ticker$.map(function () {
      return function (gs) {
        gs.buildings.forEach(function (bldg) {
          _.map(bldg.provides(), function (amt, resource) {
            gs.resources[resource] += amt;
          });
        })
        return gs;
      };
    });

  var affords = function (gs) {
    var resources = gs.resources;
    gs.vs.affords = tiles.BUILDING_COSTS.filter(function (building) {
      return _.every(_.values(building)[0], function (amt, type) {
        return resources[type] !== 'undefined' && resources[type] >= amt
      })
    });
    return gs;
  }

  var worldState$ = Rx.Observable
    .merge(initialGameState.get('initialWorldState$'))

  var gameState$ = Rx.Observable
    .merge(initialGameState.get('initialGameState$'))
    //.merge(provides$)
    .scan(function (gs, f) {
      return f(gs);
    });

  var tileSelected$ = intent.get('tileClick$')
    .combineLatest(worldState$, function ({y, x}, ws) {
      return function (vs) {
        vs.tile = ws.world[y][x][ws.world[y][x].length - 1];
        return vs
      };
    });

  var viewState$ = Rx.Observable
    .merge(initialViewState.get('initialViewState$'))
    .merge(tileSelected$)
    .scan(function (vs, f) {
      return f(vs);
    })

  return {
    gameState$: gameState$,
    viewState$: viewState$,
    worldState$: worldState$
    //affords$: gameState$.map(affords),
  };
});
