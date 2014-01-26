Game = {
  // initialize game
  start: function() {
    Crafty.init(1024, 636);
    Crafty.background('rgb(64, 64, 64)');

    hero = Crafty.e('Actor, Color, Collision, DOM, HasFOV, MoveTo')
                 .color('rgb(255, 0, 0)')
                 .attr({x: 500, y: 300, z: 2, w: 40, h: 40});

    treasure1 = Crafty.e('Treasure, Color, Collision')
                     .attr({x: 100, y: 100});
    treasure2 = Crafty.e('Treasure, Color, Collision')
                     .attr({x: 100, y: 200});
    treasure3 = Crafty.e('Treasure, Color, Collision')
                     .attr({x: 200, y: 200});
    treasure4 = Crafty.e('Treasure, Color, Collision')
                     .attr({x: 200, y: 100});

	monster1 = Crafty.e('Monster, Color, Collision')
                     .attr({x: 300, y: 300});
	monster2 = Crafty.e('Monster, Color, Collision')
                     .attr({x: 400, y: 300});
	monster3 = Crafty.e('Monster, Color, Collision')
                     .attr({x: 200, y: 300});
	monster4 = Crafty.e('Monster, Color, Collision')
                     .attr({x: 300, y: 400});
	monster5 = Crafty.e('Monster, Color, Collision')
                     .attr({x: 400, y: 400});
	monster6 = Crafty.e('Monster, Color, Collision')
                     .attr({x: 200, y: 400});
	
  }
};
