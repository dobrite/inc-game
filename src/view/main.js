var Cycle = require('cyclejs'),
    assign = Object.assign || require('object.assign'),
    h = Cycle.h;

var vrTile = function (tiles, ticker) {
  var first,
      rest = [];

  tiles.forEach(function (tile, i) {
    if (i == 0) {
      first = tile;
    } else {
      rest.push(tile);
    }
  });

  rest = rest.map(function (tile) {
    return h(tile.type, {
      attributes: {
        ticker: ticker,
        tile: tile,
      },
      'ev-provides': 'provides$',
      'ev-click': 'tileClick$',
    })
  });

  return h('.tile.' + first.type + ((first.selected) ? '.selected' : ''),
          { 'key': first.y + '.' + first.x,
            'attributes': {
              'data-y': first.y,
              'data-x': first.x },
            'ev-click': 'tileClick$' },
          rest);
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
  return h('#resources', [
    'gold: ',
    String(resources.gold),
  ]);
};

var vrStatus = function (selectedTile) {
  return h('#status', [
    'type: ',
    selectedTile.type,
    ' x: ',
    String(selectedTile.x),
    ' y: ',
    String(selectedTile.y),
  ]);
};

var vrMain = function (as, ticker) {
  return h('section', [
    vrMap(as.gs.world, ticker),
    vrResources(as.gs.resources),
    vrStatus(as.vs.selectedTile),
  ])
};

module.exports = Cycle.createView(['appState$', 'ticker$'], function (model) {
  return {
    events: [
      'tileClick$',
      'provides$',
    ],
    vtree$: Rx.Observable.combineLatest(model.appState$, model.ticker$, function(as, ticker) {
      return vrMain(as, ticker);
    }),
  };
});
