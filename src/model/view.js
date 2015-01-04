var Cycle = require('cyclejs'),
    tile  = require('./tile');

var initialViewState = {
  selectedTile: new tile.Tile(0, 0),
};

module.exports = Cycle.createDataFlowSource({
  viewState$: Rx.Observable.just(initialViewState)
});
