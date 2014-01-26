var moving_creatures = [];
var creatures = {};
function xmit_move() {
    var move = {};
    for (var i = 0; i < moving_creatures.length; i++) {
	var creature = moving_creatures[i];
	move[creature.name] = [creature.x, creature.y];
    }
    cloak.message('move', move);
}
function update_locations(move) {
    for (creature_id in move) {
	var creature = creatures[creature_id];
	if (creature) {
	    var payload = move[creature_id];
	    creature.x = payload[0];
	    creature.y = payload[1];
	}
    }
}

Game = {
  // initialize game
  start: function() {
    Crafty.init(1024, 636);
    //Crafty.bind('EnterFrame', xmit_move);

    Crafty.background('url("assets/bg.png") 2px 3px');
    Crafty.audio.play('background', -1, 1.0);

    hero = Crafty.e('Actor, DOM' + (role==='hero'?', HasFOV, MoveTo':''))
                 .attr({x: 500, y: 300, z: 2});

    // pingLayer = Crafty.e('PingLayer');
    // bluePowers = Crafty.e('GodPowers');
    // redPowers = Crafty.e('GodPowers');
  }
};
