var Cycle   = require('cyclejs'),
    tile    = require('./tile'),
    fishery = require('./fishery');

var initialGameState = {
  resources: {
    gold: 250,
  },
};

module.exports = Cycle.createDataFlowSource({
  gameState$: Rx.Observable.just(initialGameState)
});
