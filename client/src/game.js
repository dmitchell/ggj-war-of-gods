Game = {
  // initialize game
  start: function() {
    Crafty.init(1024, 636);
    Crafty.background('rgb(64, 64, 64)');

    hero = Crafty.e('Actor, DOM, HasFOV' + (role==='hero'?', MoveTo':''))
                 .attr({x: 500, y: 300, z: 2});
  }
};
