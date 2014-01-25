var role;

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
    }
  }
});

// get server url not localhost
cloak.run('http://' + (window.location.host || "localhost") + ':8090');

// map.addEventListener('submit', function(e) {
//   cloak.message('chat', msg);
// });
