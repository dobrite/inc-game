var Cycle = require('cyclejs'),
    h = Cycle.h,
    Rx = Cycle.Rx;

var FisheryDataFlowNode = Cycle.createDataFlowNode(['tile$', 'ticker$'], function (attributes) {
  var FisheryModel = Cycle.createModel(['tile$', 'ticker$'], [], function (attributes, intent) {
    return {
      provides$: attributes.ticker$.map(function (a) {
        console.log(a);
        return { fish: 1 };
      }),
      tile$: attributes.tile$,
    };
  });

  var FisheryView = Cycle.createView(['tile$', 'provides$'], function (model) {
    return {
      events: ['tileClick$'],
      vtree$: Rx.Observable.combineLatest(model.tile$, model.provides$, function (tile, provides) {
        return h('.tile.' + tile.type + ((tile.selected) ? '.selected' : ''),
                { 'key': tile.y + '.' + tile.x,
                  'attributes': {
                    'data-y': tile.y,
                    'data-x': tile.x },
                  'ev-click': 'tileClick$' });
      }),
    };
  });

  var FisheryIntent = Cycle.createIntent([], function (view) {
    return {};
  });

  FisheryIntent.inject(FisheryView);
  FisheryView.inject(FisheryModel);
  FisheryModel.inject(attributes, FisheryIntent);

  return {
    vtree$: FisheryView.vtree$,
    provides$: FisheryModel.provides$,
    click$: FisheryView.tileClick$,
  };
});

module.exports = FisheryDataFlowNode;
