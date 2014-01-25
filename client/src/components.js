Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas');
  }
});

Crafty.c("MoveTo", {
  _speed: 2,

  _onmousemove: function (e) {
    if (this.disregardMouseInput) {
      return;
    }
    // clear any existing EnterFrame handlers
    this._stopMoving();

    this._target = { x: e.realX, y: e.realY };
    this.bind("EnterFrame", this._enterFrame);
  },

  _stopMoving: function () {
    this._target = undefined;
    this.unbind("EnterFrame", this._enterFrame);
  },

  _enterFrame: function () {
    if (this.disableControls || !this._target) {
      return;
    }

    // target (almost) reached - jump the last part.
    // We could be more fancy (circular check instead of square), but don't want to pay the sqrt penalty each frame.
    if (Math.abs(this._target.x - (this.x + this.w / 2)) < this._speed && Math.abs(this._target.y - (this.y + this.h / 2)) < this._speed) {
      var prev_pos = {
        x: (this.x + this.w / 2),
        y: (this.y + this.h / 2)
      };
      this.x = (this._target.x - this.w / 2);
      this.y = (this._target.y - this.h / 2);

      this._stopMoving();

      this.trigger('Moved', prev_pos);
      this.trigger('NewDirection', { x: 0, y: 0 });
      return;
    }

    // Pixels to move are calculated from location and target every frame to handle the case when something else (IE, collision detection logic) changes our position.
    // Some cleaver optimization could probably eliminate the sqrt cost...
    var dx = this._target.x - (this.x + this.w / 2),
        dy = this._target.y - (this.y + this.h / 2);
    var oldX = (this.x + this.w / 2),
        oldY = (this.y + this.h / 2);
    var movX = (dx * this._speed) / (Math.sqrt(dx * dx + dy * dy)),
        movY = (dy * this._speed) / (Math.sqrt(dx * dx + dy * dy));

    // Moved triggered twice to allow for better collision logic (like moving along diagonal walls)
    this.x += movX;
    this.trigger('Moved', { x: oldX, y: this.y });
    this.y += movY;
    this.trigger('Moved', { x: this.x, y: oldY });
  },

  moveTo: function (speed) {
    this._speed = speed;
    return this;
  },

  init: function () {
    this.requires("Mouse");
    this.oldDirection = { x: 0, y: 0 };

    Crafty.addEvent(this, Crafty.stage.elem, "mousemove", this._onmousemove);
  }
});