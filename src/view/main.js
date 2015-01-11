var Cycle = require('cyclejs'),
    h = Cycle.h,
    _ = require('lodash'),
    tileView = require('./tile');

var vrTile = function (tiles, ticker) {
  var first = _.first(tiles),
      rest = _.rest(tiles);

  rest = rest.map(function (tile) {
    return h(tile.type, {
      attributes: {
        ticker: ticker,
        tile: tile,
      },
      onprovides: 'provides$',
      onclick: 'tileClick$',
    })
  });

  return tileView(first, rest);
};

var vrRow = function (row, ticker) {
  return h('.row', row.map(function (tiles) {
    return vrTile(tiles, ticker);
  }));
};

var vrMap = function (world, ticker) {
  return h('#map', world.map(function (row) {
    return vrRow(row, ticker);
  }));
};

var vrResources = function (resources) {
  return h('#resources', _.keys(resources).map(function (key) {
    return h('div', `${key}: ${resources[key]}`);
  }));
};

var vrAffords = function (affords) {
  return h('#affords', _.flatten(affords, _.keys).map(function (bldg) {
    return h('button.bldg',
             { type: 'button',
               value: bldg,
               onclick: 'buildingStamp$' },
             bldg);
  }));
};

var vrStatus = function (vs) {
  return h('#status', [
    h('div', `type: ${vs.tile.selected.type}`),
    h('div', `x: ${vs.tile.selected.x}`),
    h('div', `y: ${vs.tile.selected.y}`),
    vrAffords(vs.affords),
  ]);
};

var vrStyle = function (as) {
  return h('style', `.tile:hover { background-color: black;}`);
};

var vrMain = function (ticker, as) {
  return h('section', [
    vrMap(as.gs.world, ticker),
    vrResources(as.gs.resources),
    vrStatus(as.vs),
  ])
};

module.exports = Cycle.createView(function (model) {
  return {
    vtree$: model.get('ticker$').withLatestFrom(model.get('appState$'), function(ticker, as) {
      return vrMain(ticker, as);
    })
  };
});
