var tileTypes = [
  'plain',
  'ocean',
  'forest',
  'fishery',
]

class Tile {
  constructor(props) {
    this.y = props.y;
    this.x = props.x;
    this.type = props.type;
  }
}

class Fishery extends Tile {
  constructor(props) {
    props.type = 'fishery';
    this.cost = props.cost || 100; // TODO this isn't right
    super(props);
  }

  provides() {
    return { fish: 1 };
  }

  // no public or static class variables yet
  static costs() {
    return {
      gold: 100
    };
  }

  static type() {
    return 'fishery';
  }
}

var tiles = {
  Fishery: Fishery,
}

tiles['BUILDING_COSTS'] = _.map(tiles, function (tile) {
  return { [tile.type()]: tile.costs() };
});

tiles['Tile'] = Tile;

module.exports = {
  tiles: tiles,
  tileTypes: tileTypes
}
