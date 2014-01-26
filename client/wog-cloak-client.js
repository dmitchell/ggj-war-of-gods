var role;
var dungeon;

function logResponse(response) {
    console.log(response);
}

cloak.configure({
  messages: {
    init_response: function(someone_joined) {
	logResponse(someone_joined);
	$("#log").append(someone_joined);
    },
    role: function(provided_role) {
	console.log("Assigned to " + provided_role);
	role = provided_role;
	if (role === 'hero') {
	    Game.start();

	    dungeon = Crafty.e("Dungeon");
		var jsonDungeon = dungeon.generateDungeon();
		dungeon.buildDungeon(jsonDungeon);
		cloak.message('world_state_submission', jsonDungeon);
	}
    },
    world_state_receipt: function(received_state) {
	logResponse("Received state: " + received_state);
	$("#log").empty();
	if (role !== 'hero') {
	    // FIXME replace below using received_state which is the object sent from above
	    // which the above sent
	    Game.start();
	    dungeon = Crafty.e("Dungeon");
		dungeon.buildDungeon(received_state);
	}
    },
    move_receipt: function(move) {
	// update state w/ the new info in move
	update_locations(move);
    },
    combat_receipt: function(state_update) {
	// update state w/ the new info (primarily hp)
    },
    exited: function(final_state) {
	// tell the user the game is over and update final state
    }
  },
  serverEvents: {
    begin: function() {
	cloak.message('init');
    }
  }
});

// get server url not localhost
cloak.run('http://' + (window.location.host || "localhost") + ':8090');

