var role;
var state;

function logResponse(response) {
    console.log(response);
    $("#log").prepend(response + "<br/>");    
}

cloak.configure({
  messages: {
    init: function(msg) {
	console.log("sending init: " + msg);
	logResponse("init: " + msg);
    },
    init_response: function(someone_joined) {
	console.log(someone_joined);
	logResponse(someone_joined);
    },
    role: function(provided_role) {
	role = provided_role;
	logResponse("Assigned to " + provided_role);
    },
    world_state_submission: function(state) {
	// tell the server the world state--only from 'hero'
    },
    world_state_receipt: function(received_state) {
	state = received_state;
	logResponse("Received state: " + state);
    },
    move_receipt: function(move) {
	// update state w/ the new info in move
    },
    combat_receipt: function(state_update) {
	// update state w/ the new info (primarily hp)
    },
    exited: function(final_state) {
	// tell the user the game is over and update final state
    }
  }
});

// get server url not localhost
cloak.run('http://' + (window.location.host || "localhost") + ':8090');

