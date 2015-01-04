var Cycle = require('cyclejs'),
    h = Cycle.h,
    Rx = Cycle.Rx;

var BuildingDataFlowNode = Cycle.createDataFlowNode(['tile$', 'ticker$'], function (attributes) {
  var BuildingModel = Cycle.createModel(['tile$', 'ticker$'], [], function (attributes, intent) {
    return {
      provides$: attributes.ticker$.withLatestFrom(attributes.tile$, function (ticker, tile) {
        return tile.provides();
      }),
      tile$: attributes.tile$,
    };
  });

  var BuildingView = Cycle.createView(['tile$'], function (model) {
    return {
      events: ['tileClick$'],
      vtree$: model.tile$.map(function (tile) {
        return h(`.tile.${tile.type}${(tile.selected) ? '.selected' : ''}`,
                { 'key': `${tile.y}.${tile.x}`,
                  'attributes': {
                    'data-y': tile.y,
                    'data-x': tile.x },
                  'ev-click': 'tileClick$' });
      }),
    };
  });

  var BuildingIntent = Cycle.createIntent([], function (view) {
    return {};
  });

  BuildingIntent.inject(BuildingView);
  BuildingView.inject(BuildingModel);
  BuildingModel.inject(attributes, BuildingIntent);

  return {
    vtree$: BuildingView.vtree$,
    provides$: BuildingModel.provides$,
    click$: BuildingView.tileClick$,
  };
});

module.exports = BuildingDataFlowNode;
