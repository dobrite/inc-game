var Cycle = require('cyclejs'),
    _     = require('lodash'),
    Rx    = Cycle.Rx,
    { tiles } = require('./tile');

var TICK_RATE = 250;

var storeLastTile = function (key, coords) {
  return function (as) {
    var last = as.vs.tile[key];
    delete last[key];

    var tiles = as.gs.world[coords.y][coords.x]
    var tile = tiles[0];
    tile[key] = true;
    as.vs.tile[key] = tile;

    return as;
  };
};

module.exports = Cycle.createModel(function (intent, world, gameState, viewState) {
  var ticker$ = Rx.Observable.interval(1000);
  var tileSelected$ = intent.get('tileClick$').map(storeLastTile.bind(null, 'selected'));
  //var tileHovered$ = intent.get('tileHover$').map(storeLastTile.bind(null, 'hovered'));

  //var buildingStamp$ = intent.get('buildingStamp$').map(function (type) {
  //  return function (as) {
  //    as.vs.buildingStamp = type;
  //    return as;
  //  };
  //});

  //var provides$ = intent.get('provides$').map(function (resources) {
  //    return function (as) {
  //      _.keys(resources).forEach(function (resource) {
  //        as.gs.resources[resource] += resources[resource];
  //      });
  //      return as;
  //    };
  //  });

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
    as.vs.affords = tiles.BUILDING_COSTS.filter(function (building) {
      return _.every(_.values(building)[0], function (amt, type) {
        return resources[type] !== 'undefined' && resources[type] >= amt
      })
    });
    return as;
  }

  return {
    appState$: Rx.Observable
      .merge(tileSelected$)
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
