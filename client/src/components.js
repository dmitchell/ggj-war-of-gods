Crafty.sprite("assets//aJEpash.png",
        {hero_pic:[200,121,18,32],
         blue_monster_pic: [222, 121, 33, 45],
         red_monster_pic: [257, 121, 290-257, 45],
         gray_monster_pic: [292, 121, 325-292, 45],
         key_pic: [75, 148, 106-75, 31],
         potion_pic: [53, 152, 72-53, 31],
         helm_pic: [109, 148, 137-109, 33]
        });
Crafty.c('Actor', {
  init: function(id) {
    health = 100;
  
    this.requires('2D, Canvas, Collision, hero_pic');
  },
  
  heal: function(amount) {
  health += amount;
  if(health > 100){
    health = 100;
  }
  },
  
  damage: function(amount) {
  health -= amount;
  if(health <= 0){
    // put game end code here
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
    console.log('mask created');
    this._fov = Crafty.e('Mask')
                      .attr({x: 0, y: 0, z: 999, w: 1024, h: 636});
  }
});

Crafty.c('Mask', {
  drawMask: function(e) {
    var maskCanvas = document.createElement('canvas');
    maskCanvas.width = '1024';
    maskCanvas.height = '636';
    var maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = 'rgb(0,0,0)';
    maskCtx.fillRect(0, 0, 1024, 636);

    maskCtx.globalCompositeOperation = 'xor';
    maskCtx.fillStyle = 'rgb(255, 255, 255)';
    maskCtx.arc(hero._x + hero._w / 2, hero._y + hero._h / 2, 100, 0, 2 * Math.PI);
    maskCtx.fill();

    Crafty.canvas.context.drawImage(maskCanvas, 0, 0);
  },

  init: function() {
    this.requires('2D, Canvas, MoveTo');
    this.ready = true;
    this.bind('Draw', this.drawMask);
  }
});

Crafty.c('GodPowers', {
  init: function() {
    this.requires('Mouse');
    // TODO: check for god status
    Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', this.pingLocation);
  },

  pingLocation: function(e) {
    if (this.disregardMouseInput) {
      return;
    }

    console.log('ping!');
    ping = Crafty.e('Ping')
                 .color('rgb(255, 255, 255)')
                 .attr({alpha: 1.0, x: e.realX, y: e.realY, w: 0, h: 0, z: 1000, origin: 'center'})
                 .css('border-radius','50%')
                 .tween({alpha: 0.0, w: 50, h: 50, x: e.realX - 25, y: e.realY - 25}, 350);
  }
});

Crafty.c('Ping', {
  init: function() {
    this.requires('2D, Canvas, Color, DOM, Shape, Tween');
    this.bind('TweenEnd', this.cleanup);
  },

  cleanup: function() {
    this.destroy();
  }
});
