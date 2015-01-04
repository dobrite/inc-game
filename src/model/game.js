var Cycle   = require('cyclejs'),
    tile    = require('./tile');

var initialGameState = {
  resources: {
    gold: 250,
    fish: 0,
  },
};

module.exports = Cycle.createDataFlowSource({
  gameState$: Rx.Observable.just(initialGameState)
});
