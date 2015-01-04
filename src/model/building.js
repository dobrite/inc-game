var Cycle = require('cyclejs'),
    Rx = Cycle.Rx;

var Building = Cycle.createModel(['ticker$'], function (ticker) {
  return {
    provides$: ticker$.map(function (a) {
      return a;
    })
  };
});
