var Cycle = require('cyclejs'),
    h = Cycle.h,
    _ = require('lodash');

var vrCell = function (tiles) {
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
    return vrCell(tiles);
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

var vrStatus = function ({tile}, affords) {
  return h('#status', [
    h('div', `type: ${tile.type}`),
    h('div', `x: ${tile.x}`),
    h('div', `y: ${tile.y}`),
    vrAffords(affords),
  ]);
};

var vrMain = function (resources, vs, ws, affords) {
  return h('section', [
    vrMap(ws),
    vrResources(resources),
    vrStatus(vs, affords),
  ]);
};

module.exports = Cycle.createView(function (model) {
  return {
    vtree$: Rx.Observable.combineLatest(
      model.get('resources$'),
      model.get('viewState$'),
      model.get('worldState$'),
      model.get('affords$'),
      function(resources, vs, ws, affords) {
        console.log(resources);
        return vrMain(resources, vs, ws, affords);
    })
  };
});
