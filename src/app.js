var Cycle        = require('cyclejs'),
    View         = require('./view/main'),
    Intent       = require('./intent/intent'),
    Model        = require('./model/model'),
    InitialModel = require('./model/world'),
    InitialView  = require('./model/view'),
    InitialGame  = require('./model/game'),
    building     = require('./model/building');

var renderer = Cycle.createRenderer('#game');
renderer.registerCustomElement('fishery', building);
renderer.inject(View);
Intent.inject(View);
View.inject(Model);
Model.inject(Intent, InitialModel, InitialGame, InitialView);
