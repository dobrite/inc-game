var Cycle = require('cyclejs'),
    h = Cycle.h,
    Rx = Cycle.Rx,
    tileView = require('../view/tile');

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
        return tileView(tile)
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
