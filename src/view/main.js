var Cycle = require('cyclejs'),
    h = Cycle.h,
    _ = require('lodash');

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

  return h(`.tile.${first.type}${(first.selected) ? '.selected' : ''}`,
          { key: `${first.y}.${first.x}`,
            attributes: {
              'data-y': first.y,
              'data-x': first.x },
            onclick: 'tileClick$' },
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
  return h('#resources', Object.keys(resources).map(function(key) {
    return `${key}: ${resources[key]} `; // XXX put each in own elem use css
  }));
};

var vrStatus = function (selectedTile) {
  return h('#status', `type: ${selectedTile.type} x: ${selectedTile.x} y: ${selectedTile.y}`);
};

var vrMain = function (ticker, as) {
  return h('section', [
    vrMap(as.gs.world, ticker),
    vrResources(as.gs.resources),
    vrStatus(as.vs.selectedTile),
  ])
};

module.exports = Cycle.createView(function (model) {
  return {
    vtree$: model.get('ticker$').withLatestFrom(model.get('appState$'), function(ticker, as) {
      return vrMain(ticker, as);
    })
  };
});
