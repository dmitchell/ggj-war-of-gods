Crafty.c("Treasure", {
  init: function() {
    this.requires('2D, Canvas, Color, Collision');
    this.attr({z: 0, w: 20, h: 20})
        .color('rgb(255, 255, 0)')
        .collision().onHit("Actor", function(e){
          hero.heal(10);
          this.destroy();
        });
  }
});

Crafty.c("Wall", {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.color('rgb(128, 128, 128)');
  }
});
