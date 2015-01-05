var Cycle = require('cyclejs'),
    h = Cycle.h;

module.exports = Cycle.createIntent(function (view) {
  return {
    tileClick$: view.get('tileClick$').map(function (e) {
      return {
        y: parseInt(e.target.dataset.y, 10),
        x: parseInt(e.target.dataset.x, 10),
      }
    }),
    provides$: view.get('provides$'),
  };
});
