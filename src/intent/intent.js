var Cycle = require('cyclejs'),
    h = Cycle.h;

var getTileCoords = function (e) {
  return {
    y: parseInt(e.target.dataset.y, 10),
    x: parseInt(e.target.dataset.x, 10),
  };
};

module.exports = Cycle.createIntent(function (view) {
  return {
    tileClick$: view.get('tileClick$').map(getTileCoords),
    buildingStamp$: view.get('buildingStamp$').map(function (e) {
      return { type: e.target.value };
    })
  };
});
