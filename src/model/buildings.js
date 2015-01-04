var Building = function (y, x, type) {
  this.y = y;
  this.x = x;
  this.type = type;
  this.efficiency = 0.000;
}

var Fishery = function (y, x) {
  this.y = y;
  this.x = x;
  this.type = 'Fishery';
  this.efficiency = 0.000;
  this.prototype.cost = {
    gold: 100
  };

  this.prototype.provides = {
    qty: 1,
    name: 'fish'
  };

  this.prototype.tick = function () {
    return {
      this.provides.name: this.efficiency * this.provides.qty,
    };
  };
}

module.exports = {
  Building: Building,
  Fishery: Fishery,
}
