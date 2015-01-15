var Cycle = require('cyclejs'),
    h = Cycle.h,
    _ = require('lodash');

var vrTile = function (tiles) {
  return h(
    '.cell',
    tiles.map(function (tile) {
      return h(tile.type, {
        attributes: { tile: tile },
        onclick: 'tileClick$'
      });
    })
  )
};

var vrRow = function (row) {
  return h('.row', row.map(function (tiles) {
    return vrTile(tiles);
  }));
};

var vrMap = function (world) {
  return h('#map', world.map(function (row) {
    return vrRow(row);
  }));
};

var vrResources = function (resources) {
  return h('#resources', _.keys(resources).map(function (key) {
    return h('div', `${key}: ${resources[key]}`);
  }));
};

var vrAffords = function (affords) {
  return h('#affords', _.flatten(affords, _.keys).map(function (bldg) {
    return h(
      'button.bldg', {
        type: 'button',
        value: bldg,
      }, bldg
    );
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

var vrMain = function (as) {
  return h('section', [
    vrMap(as.gs.world),
    vrResources(as.gs.resources),
    vrStatus(as.vs),
  ])
};

module.exports = Cycle.createView(function (model) {
  return {
    vtree$: model.get('ticker$').withLatestFrom(model.get('appState$'), function(ticker, as) {
      return vrMain(as);
    })
  };
});
