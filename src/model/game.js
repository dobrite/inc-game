var Cycle   = require('cyclejs'),
    tile    = require('./tile');

var initialGameState = {
  resources: {
    gold: 250,
    fish: 0,
  },
  improvements: {
    buildings: {[
      new tiles.Fishery({y: 13, x: 5}),
      new tiles.Fishery({y: 14, x: 5}),
      new tiles.Fishery({y: 15, x: 5})
    ]}
  }
};

module.exports = Cycle.createDataFlowSource({
  gameState$: Rx.Observable.just(initialGameState)
});
