var Cycle = require('cyclejs'),
    { tiles } = require('./tile');

var initialViewState = {
  tile: {
    y: 0,
    x: 0,
    type: 'blah',
  },
  lastSelectedTile: {
    selected: false,
  }
};

module.exports = Cycle.createDataFlowSource({
  initialViewState$: Rx.Observable.just(initialViewState)
});
