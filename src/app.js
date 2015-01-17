var Cycle = require('cyclejs'),
    View = require('./view/main'),
    Intent = require('./intent/intent'),
    Model = require('./model/model'),
    InitialGame = require('./model/game'),
    InitialView = require('./model/view'),
    building = require('./custom_element/building'),
    { tileTypes } = require('./model/tile');

var renderer = Cycle.createRenderer('#game');

tileTypes.map(function (tile) {
  renderer.registerCustomElement(tile, building);
});

renderer.inject(View);
Intent.inject(View);
View.inject(Model);
Model.inject(Intent, InitialGame, InitialView);
