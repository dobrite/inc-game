var Cycle = require('cyclejs'),
    h = Cycle.h,
    Rx = Cycle.Rx;

var BuildingDataFlowNode = Cycle.createDataFlowNode(function (attrs) {
  var BuildingModel = Cycle.createModel(function (attrs, intent) {
    return {
      tile$: attrs.get('tile$'),
      highlighted$: Rx.Observable
        .merge(
          intent.get('startHighlight$').map(function () { return true; }),
          intent.get('stopHighlight$').map(function () { return false; })
        ).startWith(false)
    };
  });

  var BuildingView = Cycle.createView(function (model) {
    return {
      vtree$: model.get('tile$').combineLatest(
        model.get('highlighted$'),
        function (tile, highlighted) {
          var selected = (tile.selected) ? '.selected' : '';
          var highlighted = (highlighted) ? '.highlighted' : '';

          return h(
            `.tile.${tile.type}${selected}${highlighted}`, {
            key: `${tile.y}.${tile.x}`,
            attributes: {
              'data-y': tile.y,
              'data-x': tile.x
            },
            onclick: 'tileClick$',
            onmouseenter: 'mouseenter$',
            onmouseleave: 'mouseleave$',
          });
      })
    };
  });

  var BuildingIntent = Cycle.createIntent(function (view) {
    return {
      startHighlight$: view.get('mouseenter$'),
      stopHighlight$: view.get('mouseleave$')
    };
  });

  BuildingIntent.inject(BuildingView);
  BuildingView.inject(BuildingModel);
  BuildingModel.inject(attrs, BuildingIntent);

  return {
    vtree$: BuildingView.get('vtree$'),
    click$: BuildingView.get('tileClick$'),
  };
});

module.exports = BuildingDataFlowNode;
