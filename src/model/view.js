var Cycle = require('cyclejs'),
    { tiles } = require('./tile');

var initialViewState = {
  tile: {
    selected: new tiles.Tile({ y: 0, x: 0 }),
    hovered:  new tiles.Tile({ y: 0, x: 0 }),
  },
};

module.exports = Cycle.createDataFlowSource({
  viewState$: Rx.Observable.just(initialViewState)
});
