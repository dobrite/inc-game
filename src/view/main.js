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

var vrMap = function ({world}) {
  return h('#map', world.map(function (row) {
    return vrRow(row);
  }));
};

var vrResources = function ({resources}) {
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

var vrStatus = function ({tile}) {
  return h('#status', [
    h('div', `type: ${tile.type}`),
    h('div', `x: ${tile.x}`),
    h('div', `y: ${tile.y}`),
    //vrAffords(vs.affords),
  ]);
};

var vrMain = function (gs, vs, ws) {
  return h('section', [
    vrMap(ws),
    vrResources(gs),
    vrStatus(vs),
  ]);
};

module.exports = Cycle.createView(function (model) {
  return {
    vtree$: Rx.Observable.combineLatest(
      model.get('gameState$'),
      model.get('viewState$'),
      model.get('worldState$'),
      function(gs, vs, ws) {
        return vrMain(gs, vs, ws);
    })
  };
});
