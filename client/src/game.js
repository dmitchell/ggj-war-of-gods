Game = {
  // initialize game
  start: function() {
    Crafty.init(1024, 636);
    Crafty.background('rgb(0, 0, 0)');

    hero = Crafty.e('Actor, Color, Collision, MoveTo')
                 .color('rgb(255, 255, 255)')
                 .attr({x: 500, y: 300, z: 1, w: 40, h: 40});

    treasure = Crafty.e('treasure, Color, Collision')
				 .attr({x: 100, y: 100});
	treasure = Crafty.e('treasure, Color, Collision')
				 .attr({x: 100, y: 200});
	treasure = Crafty.e('treasure, Color, Collision')
				 .attr({x: 200, y: 200});
	treasure = Crafty.e('treasure, Color, Collision')
				 .attr({x: 200, y: 100});
  }
};