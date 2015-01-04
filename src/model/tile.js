var terrain = [
  'plain',
  'ocean',
  'forest',
]

var Tile = function (y, x, type) {
  this.y = y;
  this.x = x;
  this.type = type;
}

//Tile.prototype.isTerrain = function () {
//  return terrain.indexOf(this.type) > -1
//}

module.exports = {
  Tile: Tile,
}
