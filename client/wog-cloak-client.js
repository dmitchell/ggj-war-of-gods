/* global cloak */
var log = document.querySelector('#log');

cloak.configure({
  messages: {
    init: function(msg) {
	log.innerText = "init: " + msg;
    }
  }
});

// get server url not localhost
cloak.run('http://localhost:8090');

// map.addEventListener('submit', function(e) {
//   cloak.message('chat', msg);
// });
