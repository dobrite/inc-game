var Cycle = require('cyclejs'),
    tile  = require('./tile');

var initialViewState = {
  selectedTile: new tile.Tile({ y: 0, x: 0 }),
};

module.exports = Cycle.createDataFlowSource({
  viewState$: Rx.Observable.just(initialViewState)
});
