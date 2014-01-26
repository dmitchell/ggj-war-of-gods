Crafty.c("Dungeon", {
	joinRooms: function(bar) {
		var newroom = this.rooms[bar.myroom.xid + bar.xdir][bar.myroom.yid + bar.ydir];
		
		if(bar.ydir == -1){
			bar.myroom.u = true;
			newroom.d = true;
			if(newroom.dBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.dBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.dBar = -1;
			bar = -1;
		}
		else if(bar.ydir == 1){
			bar.myroom.d = true;
			newroom.u = true;
			if(newroom.uBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.uBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.uBar = -1;
			bar = -1;
		}
		else if(bar.xdir == -1){
			bar.myroom.l = true;
			newroom.r = true;
			if(newroom.dBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.rBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.rBar = -1;
			bar = -1;
		}
		else if(bar.xdir == 1){
			bar.myroom.r = true;
			newroom.l = true;
			if(newroom.dBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.lBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.lBar = -1;
			bar = -1;
		}
		
		if(!newroom.attached){
			newroom.attached = 1;
			if(!newroom.u && newroom.uBar != -1){
				this.bars.push(newroom.uBar);
				newroom.uBar.inList = true;
			}
			if(!newroom.d && newroom.dBar != -1){
				this.bars.push(newroom.dBar);
				newroom.dBar.inList = true;
			}
			if(!newroom.l && newroom.lBar != -1){
				this.bars.push(newroom.lBar);
				newroom.lBar.inList = true;
			}
			if(!newroom.r && newroom.rBar != -1){
				this.bars.push(newroom.rBar);
				newroom.rBar.inList = true;
			}
		}
	},
	
	deleteBars: function(bar) {
		var newroom = this.rooms[bar.myroom.xid + bar.xdir][bar.myroom.yid + bar.ydir];
		
		if(bar.ydir == -1){
			if(newroom.dBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.dBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.dBar = -1;
			bar = -1;
		}
		else if(bar.ydir == 1){
			if(newroom.uBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.uBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.uBar = -1;
			bar = -1;
		}
		else if(bar.xdir == -1){
			if(newroom.rBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.rBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.rBar = -1;
			bar = -1;
		}
		else if(bar.xdir == 1){
			if(newroom.lBar.inList){
				this.bars.splice(this.bars.indexOf(newroom.lBar),1);
			}
			if(bar.inList){
				this.bars.splice(this.bars.indexOf(bar),1);
			}
			newroom.lBar = -1;
			bar = -1;
		}
		
		if(!newroom.attached){
			if(!newroom.u && newroom.uBar != -1){
				this.bars.push(newroom.uBar);
			}
			if(!newroom.d && newroom.dBar != -1){
				this.bars.push(newroom.dBar);
			}
			if(!newroom.l && newroom.lBar != -1){
				this.bars.push(newroom.lBar);
			}
			if(!newroom.r && newroom.rBar != -1){
				this.bars.push(newroom.rBar);
			}
		}
	},
	
	buildDungeon: function(jsonDungeon) {
    // outer border
		wall = Crafty.e('Wall, Color')
      .attr({x: -10, y: -13, w: 1200, h: 32});
    wall = Crafty.e('Wall, Color')
      .attr({x: -13, y: -10, w: 30, h: 720});
    wall = Crafty.e('Wall, Color')
      .attr({x: -10, y: 617, w: 1200, h: 32});
    wall = Crafty.e('Wall, Color')
      .attr({x: 1007, y:-10, w: 30, h: 720});
	
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 5; j++){
				var room = jsonDungeon.rooms[i][j];
				
        // intersections
        if(i > 0 && j > 0){
          wall = Crafty.e('Wall, Color')
            .attr({x: i*204 - 70, y: j*126 - 13, w: 144, h: 32});
          wall = Crafty.e('Wall, Color')
            .attr({x: i*204 - 13, y: j*126 - 30, w: 30, h: 66});
        }
				
        // walls over doorspaces
        if(room.leftDoor == false){
          wall = Crafty.e('Wall, Color')
            .attr({x: i*204 - 13, y: (j+1)*126 - 90, w: 30, h: 60});
        }
        else {
          door = Crafty.e('2D, Canvas, horiz_door')
            .attr({x: i*204 - 13, y: (j+1)*126 - 96});
        }

        if(room.upDoor == false){
         wall = Crafty.e('Wall, Color')
           .attr({x: (i+1)*204 - 130, y: j*126 - 13, w: 60, h: 32});
        }
        else {
          door = Crafty.e('2D, Canvas, vert_door')
            .attr({x: (i+1)*204 - 136, y: j*126 - 13});
        }
        
        if(room.weakMonster || room.strongMonster){
          Crafty.e('Monster, ' + 
            ( role==='hero'? 'gray_monster_pic' : 'blue_monster_pic'))
            .attr({x: i*200 + 100, y: j*120 + 60, z: 2});
        }
				if(room.potion){
					Crafty.e('Treasure')
						.attr({x: i*200 + 100, y: j*120 + 60});
				}
				if(room.key){
					Crafty.e('Key')
						.attr({x: i*200 + 100, y: j*120 + 60});
				}
				if(room.exit){
					Crafty.e('Exit')
						.attr({x: i*200 + 100, y: j*120 + 60});
				}
			}

      // edge walls
      if(i > 0){
        wall = Crafty.e('Wall, Color')
          .attr({x: -26, y: i*126 - 13, w: 100, h: 32});
        wall = Crafty.e('Wall, Color')
          .attr({x: 950, y: i*126 - 13, w: 100, h: 32});
        wall = Crafty.e('Wall, Color')
          .attr({x: i*204 - 13, y: -24, w: 30, h: 60});
        wall = Crafty.e('Wall, Color')
          .attr({x: i*204 - 13, y: 600, w: 30, h: 60});
      }
		}
	},
	
	generateDungeon: function() {
		this.requires('2D, Canvas');
		
		this.bars = new Array(0);
		this.rooms = new Array(5);
		for(var i = 0; i < 5; i++){
			this.rooms[i] = new Array(5);
			
			for(var j = 0; j < 5; j++){
				this.rooms[i][j] = Crafty.e("Room");//.attr({x: i*100 + 100, y: j*100 + 100});
				this.rooms[i][j].xid = i;
				this.rooms[i][j].yid = j;
			}
		}

		this.startroom = this.rooms[2][2];
		this.startroom.attached = true;
		this.bars.push(this.startroom.uBar);
		this.startroom.uBar.inList = true;
		this.bars.push(this.startroom.dBar);
		this.startroom.dBar.inList = true;
		this.bars.push(this.startroom.lBar);
		this.startroom.lBar.inList = true;
		this.bars.push(this.startroom.rBar);
		this.startroom.rBar.inList = true;

		//tear down these walls
		while(this.bars.length > 0){
			var randNum = Math.floor(Math.random()*this.bars.length);
			var randBar = this.bars[randNum];
			
			if((randBar.myroom.xid == 0 && randBar.xdir == -1)
				|| (randBar.myroom.xid == 4 && randBar.xdir == 1)
				|| (randBar.myroom.yid == 0 && randBar.ydir == -1)
				|| (randBar.myroom.yid == 4 && randBar.ydir == 1)){
				this.bars.splice(randNum, 1);
			}
			else{
				var newroom = this.rooms[randBar.myroom.xid + randBar.xdir][randBar.myroom.yid + randBar.ydir];
				if(!newroom.attached || Math.random() < .4){
					this.joinRooms(randBar);
				}
				else{
					this.deleteBars(randBar);
				}
			}
		}
		
		for(var k = 0; k < 15; k++){
			var i = Math.floor(Math.random()*5);
			var j = Math.floor(Math.random()*5);
			var room = this.rooms[i][j];
			
			while(room.monster){
				i = Math.floor(Math.random()*5);
				j = Math.floor(Math.random()*5);
				var room = this.rooms[i][j];
			}
			
			room.monster = true;
			room.weakmonster = true;
		}
		
		for(var k = 0; k < 3; k++){
			var i = Math.floor(Math.random()*5);
			var j = Math.floor(Math.random()*5);
			var room = this.rooms[i][j];
			
			while(room.monster){
				i = Math.floor(Math.random()*5);
				j = Math.floor(Math.random()*5);
				var room = this.rooms[i][j];
			}
			
			room.monster = true;
			room.strongmonster = true;
		}
		
			var i = Math.floor(Math.random()*5);
			var j = Math.floor(Math.random()*5);
			var room = this.rooms[i][j];
			while(room.item || (i > 0 && i < 4) || (j > 0 && j < 4)){
				i = Math.floor(Math.random()*5);
				j = Math.floor(Math.random()*5);
				var room = this.rooms[i][j];
			}
			room.item = true;
			room.exit = true;
		
		for(var k = 0; k < 5; k++){
			var i = Math.floor(Math.random()*5);
			var j = Math.floor(Math.random()*5);
			var room = this.rooms[i][j];
			
			while(room.item){
				i = Math.floor(Math.random()*5);
				j = Math.floor(Math.random()*5);
				var room = this.rooms[i][j];
			}
			
			room.item = true;
			room.potion = true;
		}
		
		for(var k = 0; k < 2; k++){
			var i = Math.floor(Math.random()*5);
			var j = Math.floor(Math.random()*5);
			var room = this.rooms[i][j];
			
			while(room.item){
				i = Math.floor(Math.random()*5);
				j = Math.floor(Math.random()*5);
				var room = this.rooms[i][j];
			}
			
			room.item = true;
			room.key = true;
		}

		
		/*for(var i = 0; i < 5; i++){
			for(var j = 0; j < 5; j++){
				var room = this.rooms[i][j];
				
				if(room.u){
					Crafty.e("Marker").attr({x: room.xid*100 + 100, y: room.yid*100 + 80});
				}
				if(room.d){
					Crafty.e("Marker").attr({x: room.xid*100 + 100, y: room.yid*100 + 120});
				}
				if(room.l){
					Crafty.e("Marker").attr({x: room.xid*100 + 80, y: room.yid*100 + 100});
				}
				if(room.r){
					Crafty.e("Marker").attr({x: room.xid*100 + 120, y: room.yid*100 + 100});
				}
			}
		}*/
		
		var jsonDungeon = {
			rooms: []
		};
		
		for(var i = 0; i < 5; i++){
			var row = new Array(0);
			for(var j = 0; j < 5; j++){
				var room = this.rooms[i][j];
				
				row.push({
					"leftDoor" : room.l,
					"rightDoor" : room.r,
					"upDoor" : room.u,
					"downDoor" : room.d,
					"weakMonster" : room.weakmonster,
					"strongMonster" : room.strongmonster,
					"potion" : room.potion,
					"key" : room.key,
					"exit" : room.exit
				});
			}
			jsonDungeon.rooms.push(row);
		}
		
		console.log(jsonDungeon);
		
		return jsonDungeon;
	}
});

Crafty.c("Marker", {
	init: function() {
		this.requires('2D, Canvas, Color, Collision');
		this.attr({z: 0, w: 20, h: 20})
			.color('rgb(0, 255, 255)')
	}
});

Crafty.c("Room", {
	init: function() {
		/*this.requires('2D, Canvas, Color, Collision');
		this.attr({z: 0, w: 20, h: 20})
			.color('rgb(255, 255, 255)')*/
		
		this.u = false;
		this.d = false;
		this.l = false;
		this.r = false;
		this.attached = false;
		
		this.monster = false;
		this.weakmonster = false;
		this.strongmonster = false;
		
		this.item = false;
		this.potion = false;
		this.key = false;
		this.exit = false;
		
		this.uBar = Crafty.e("Bar");
		this.uBar.myroom = this;
		this.uBar.xdir = 0;
		this.uBar.ydir = -1;
		
		this.dBar = Crafty.e("Bar");
		this.dBar.myroom = this;
		this.dBar.xdir = 0;
		this.dBar.ydir = 1;
		
		this.lBar = Crafty.e("Bar");
		this.lBar.myroom = this;
		this.lBar.xdir = -1;
		this.lBar.ydir = 0;
		
		this.rBar = Crafty.e("Bar");
		this.rBar.myroom = this;
		this.rBar.xdir = 1;
		this.rBar.ydir = 0;
	}
});

Crafty.c("Bar", {
	init: function() {
		this.inList = false;
	}
});

Crafty.c("Treasure", {
  init: function() {
    this.requires('2D, Canvas, Collision, potion_pic');
    this.attr({z: 0})
        .collision().onHit("Actor", function(e){
          hero.heal(10);
          this.destroy();
	  Crafty.audio.play('potion');
        });
  }
});

Crafty.c("Key", {
  init: function() {
    this.requires('2D, Canvas, Collision, key_pic');
    this.attr({z: 0})
        .collision().onHit("Actor", function(e){
          hero.getKey();
          this.destroy();
        });
  }
});

Crafty.c("Exit", {
  init: function() {
    this.requires('2D, Canvas, Collision, exit');
    this.attr({z: 0, w:62, h:51})
        .collision().onHit("Actor", function(e){
          if(hero.hasKey() && this.active){
			Crafty.e("2D, Canvas, Text").attr({x: 400, y: 280 }).text("You win!")
				.textColor('#FFFFFF"').textFont({size:'64px'});
			this.active = false;
			hero.clear();
		  }
        });
	this.active = true;
  }
});

Crafty.c("Monster", {
  _isMoving: false,

  _speed: 1.5,

  _direction: -1,
  
  pathfinding: function() {
	this.requires('Collision');

    // movement calculated from location and target at every frame
    var dx = hero.x + hero.w /2 - (this.x + this.w / 2),
        dy = hero.y + hero.h /2  - (this.y + this.h / 2);
    var oldX = (this.x + this.w / 2),
        oldY = (this.y + this.h / 2);
    var movX = (dx * this._speed) / (Math.sqrt(dx * dx + dy * dy)),
        movY = (dy * this._speed) / (Math.sqrt(dx * dx + dy * dy));

    if (movX > 0 && this._direction === 1) {
      this.unflip();
      this._direction = -1;
    }
    else if (movX < 0 && this._direction === -1) {
      this.flip();
      this._direction = 1;
    }

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

  init: function() {
    this.requires('2D, Canvas, Collision');

    this.attr({z: 0})
        .collision().onHit("Actor", function(e){
			if(this.active){
				hero.damage(20);
				this.visible = false;
				this.active = false;
			        Crafty.audio.play("enemy_dead");
				this.unbind('EnterFrame', this.pathfinding);
			}
        });
	
	this.active = true;
	this.oldDirection = { x: 0, y: 0 };
	
	this.bind('EnterFrame', this.pathfinding);
  }
});

Crafty.c("Wall", {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.color('rgba(128, 128, 128, 0)');
  }
});
