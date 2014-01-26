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
    Crafty.background('rgb(64, 64, 64)');
    //Crafty.bind('EnterFrame', xmit_move);

    // if (role==='hero') {
    // 	hero = Crafty.e('Actor, DOM, HasFOV' + (role==='hero'?', MoveTo':''))
    //         .attr({x: 500, y: 300, z: 2});
    // 	hero.name = 'hero';
    // 	moving_creatures.push(hero);
    // 	creatures[hero.name] = hero;

    // 	treasure1 = Crafty.e('Treasure')
    //         .attr({x: 100, y: 100});
    // 	treasure2 = Crafty.e('Treasure')
    //         .attr({x: 100, y: 200});
    // 	treasure3 = Crafty.e('Treasure')
    //         .attr({x: 200, y: 200});
    // 	treasure4 = Crafty.e('Treasure')
    //         .attr({x: 200, y: 100});

    // 	monster1 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'blue_monster_pic'))
    //         .attr({x: 300, y: 300, name: 'monster1'});
    // 	monster1.god = 'blue';
    // 	moving_creatures.push(monster1);
    // 	creatures[monster1.name] = monster1;
    // 	monster2 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'red_monster_pic'))
    //         .attr({x: 400, y: 300, god: 'red', name: 'monster2'});
    // 	moving_creatures.push(monster2);
    // 	creatures[monster2.name] = monster2;
    // 	monster3 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'blue_monster_pic'))
    //         .attr({x: 200, y: 300, god: 'blue'});
    // 	monster3.god = 'blue';
    // 	moving_creatures.push(monster3);
    // 	creatures[monster3.name] = monster3;
    // 	monster4 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'blue_monster_pic'))
    //         .attr({x: 300, y: 400, god: 'blue'});
    // 	monster4.god = 'blue';
    // 	moving_creatures.push(monster4);
    // 	creatures[monster4.name] = monster4;
    // 	monster5 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'red_monster_pic'))
    //         .attr({x: 400, y: 400});
    // 	monster5.god = 'red';
    // 	moving_creatures.push(monster5);
    // 	creatures[monster5.name] = monster5;
    // 	monster6 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'red_monster_pic'))
    //         .attr({x: 200, y: 400});
    // 	monster6.god = 'red';
    // 	moving_creatures.push(monster6);
    // 	creatures[monster6.name] = monster6;
	
    // 	monster7 = Crafty.e('Monster, ' + 
    // 			    ( role==='hero'? 'gray_monster_pic' : 'blue_monster_pic'))
    //         .attr({x: 200, y: 400});
    // 	monster7.god = 'blue';
    // 	moving_creatures.push(monster7);
    // 	creatures[monster7.name] = monster7;

    //  }
  }
};
