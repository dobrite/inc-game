var Cycle        = require('cyclejs'),
    View         = require('./view/main'),
    Intent       = require('./intent/intent'),
    Model        = require('./model/model'),
    InitialModel = require('./model/world'),
    InitialView  = require('./model/view'),
    InitialGame  = require('./model/game'),
    building     = require('./model/building'),
    { tileTypes } = require('./model/tile');

var renderer = Cycle.createRenderer('#game');

tileTypes.map(function (tile) {
  renderer.registerCustomElement(tile, building);
});

renderer.inject(View);
Intent.inject(View);
View.inject(Model);
Model.inject(Intent, InitialModel, InitialGame, InitialView);
