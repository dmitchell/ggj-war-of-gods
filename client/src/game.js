Game = {
  // initialize game
  start: function() {
    Crafty.init(1024, 636);
    Crafty.background('rgb(0, 0, 0)');

    hero = Crafty.e('Actor, Color, Collision, MoveTo')
                 .color('rgb(255, 255, 255)')
                 .attr({x: 500, y: 300, z: 1, w: 40, h: 40});
  }
};