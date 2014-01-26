var cloak = require('cloak');
var roles = ['hero','blue','red'];
var index = 0;

cloak.configure({
  port: 8090,
  messages: {
    init: function(msg, user) {
	user.name = roles[index++];
	console.log(msg, user.name);
	index %= 3;
	user.message('role', user.name);
	cloak.messageAll('init_response', user.name + ' joined');
    },
    world_state_submission: function(msg, user) {
	// tell every client to sync to this world state
	cloak.messageAll('world_state_receipt', msg);
    },
    move: function(msg, user) {
	// for every object which changed location, the object's id and new locn
	cloak.messageAll('move_receipt', msg);
    },
    combat_results: function(msg, user) {
	// for every object which changed health, the object id and hp (0 == dead)
	// god scores are hp
	cloak.messageAll('combat_receipt', msg);
    },
    
    exited: function(msg, user) {
	cloak.messageAll('exited', msg);
    }
  },
  room: {
      memberLeaves: function(user) {
	  cloak.messageAll('pause', user.name);
      }
  },
  lobby: {
      memberLeaves: function(user) {
	  cloak.messageAll('pause', user.name);
      }
  }
});

cloak.run();
