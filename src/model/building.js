var Cycle = require('cyclejs'),
    h = Cycle.h,
    Rx = Cycle.Rx;

var BuildingDataFlowNode = Cycle.createDataFlowNode(function (attributes) {
  var BuildingModel = Cycle.createModel(function (attributes, intent) {
    return {
      provides$: attributes.get('ticker$').withLatestFrom(attributes.get('tile$'), function (ticker, tile) {
        return tile.provides();
      }),
      tile$: attributes.get('tile$'),
    };
  });

  var BuildingView = Cycle.createView(function (model) {
    return {
      vtree$: model.get('tile$').map(function (tile) {
        return h(`.tile.${tile.type}${(tile.selected) ? '.selected' : ''}`,
                { key: `${tile.y}.${tile.x}`,
                  attributes: {
                    'data-y': tile.y,
                    'data-x': tile.x },
                  onclick: 'tileClick$' });
      })
    };
  });

  var BuildingIntent = Cycle.createIntent(function (view) {
    return {};
  });

  BuildingIntent.inject(BuildingView);
  BuildingView.inject(BuildingModel);
  BuildingModel.inject(attributes, BuildingIntent);

  return {
    vtree$: BuildingView.get('vtree$'),
    provides$: BuildingModel.get('provides$'),
    click$: BuildingView.get('tileClick$'),
  };
});

module.exports = BuildingDataFlowNode;
