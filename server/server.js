var cloak = require('cloak');

cloak.configure({
  port: 8090,
  messages: {
    init: function(msg, user) {
	cloak.messageAll('init', msg);
    }
  }

});

cloak.run();
