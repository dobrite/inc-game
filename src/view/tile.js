var Cycle = require('cyclejs'),
    h = Cycle.h;

module.exports = function (tile, children) {
  return h(
    `.tile.${tile.type}${(tile.selected) ? '.selected' : ''}${(tile.hovered) ? '.hover' : ''}`, {
      key: `${tile.y}.${tile.x}`,
      attributes: {
        'data-y': tile.y,
        'data-x': tile.x },
      onclick: 'tileClick$',
      onmouseover: 'tileHover$'
    }, children
  );
};
