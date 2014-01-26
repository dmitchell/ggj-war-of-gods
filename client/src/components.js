Crafty.c('Actor', {
  init: function() {
	health = 100;
  
    this.requires('2D, Canvas');
  },
  
  heal: function(amount) {
	health -= amount;
	if(health > 100){
		health = 100;
	}
  }
});

// adapted from https://github.com/sorenbs/MoveTo
Crafty.c('MoveTo', {
  _isMoving: false,

  _speed: 2,

  _onmousedown: function(e) {
    if (this.disregardMouseInput) {
      return;
    }

    this._isMoving = true;
    this._target = { x: e.realX, y: e.realY };
    this.bind('EnterFrame', this._enterFrame);
  },

  _onmouseup: function(e) {
    this._isMoving = false;
    this._stopMoving();
  },

  _onmousemove: function(e) {
    if (this._isMoving) {
      this._stopMoving();
      this._isMoving = true;
      this._target = { x: e.realX, y: e.realY };
      this.bind('EnterFrame', this._enterFrame);
    }
  },

  _stopMoving: function() {
    this._target = undefined;
    this.unbind('EnterFrame', this._enterFrame);
  },

  _enterFrame: function() {
	this.requires('Collision');
  
    if (this.disableControls || !this._target) {
      return;
    }

    // target (almost) reached - jump the last part
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

    // movement calculated from location and target at every frame
    var dx = this._target.x - (this.x + this.w / 2),
        dy = this._target.y - (this.y + this.h / 2);
    var oldX = (this.x + this.w / 2),
        oldY = (this.y + this.h / 2);
    var movX = (dx * this._speed) / (Math.sqrt(dx * dx + dy * dy)),
        movY = (dy * this._speed) / (Math.sqrt(dx * dx + dy * dy));

    // move triggered twice to allow for better collision logic
    this.x += movX;
    this.trigger('Moved', { x: oldX, y: this.y });
	if(this.hit("Wall") != false){
		this.x -= movX;
	}
    this.y += movY;
    this.trigger('Moved', { x: this.x, y: oldY });
	if(this.hit("Wall") != false){
		this.y -= movY;
	}
  },

  moveTo: function(speed) {
    this._speed = speed;
    return this;
  },

  init: function() {
    this.requires('Mouse, Collision');
    this.oldDirection = { x: 0, y: 0 };

    Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', this._onmousedown);
    Crafty.addEvent(this, Crafty.stage.elem, 'mouseup', this._onmouseup);
    Crafty.addEvent(this, Crafty.stage.elem, 'mousemove', this._onmousemove);
  }
});

Crafty.c('HasFOV', {
  init: function() {
    var fov = Crafty.e('2D, Canvas, Color, DOM, MoveTo, Shape')
                    .color('rgba(255, 255, 255, 0.2)')
                    .attr({z: 1, w: 200, h: 200})
                    .css('border-radius','50%');
    this.bind('EnterFrame', function() {
      fov._x = this._x + this._w / 2 - fov._w / 2;
      fov._y = this._y + this._h / 2 - fov._h / 2;
    });
  }
});