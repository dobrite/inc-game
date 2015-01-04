var terrain = [
  'plain',
  'ocean',
  'forest',
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
    super(props);
    this.type = 'fishery';
  }

  provides() {
    return { fish: 1 };
  }
}

module.exports = {
  Tile: Tile,
  Fishery: Fishery,
}
