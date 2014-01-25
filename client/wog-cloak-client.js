cloak.configure({
  messages: {
    init: function(msg) {
	console.log("init: " + msg);
	$("#log").text("init: " + msg);
    }
  }
});

// get server url not localhost
cloak.run('http://' + (window.location.host || "localhost") + ':8090');

// map.addEventListener('submit', function(e) {
//   cloak.message('chat', msg);
// });
