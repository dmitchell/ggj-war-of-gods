var cloak = require('cloak');
var roles = ['hero','blue','red'];
var index = 0;

cloak.configure({
  port: 8090,
  messages: {
    init: function(msg, user) {
	console.log(msg, user);
	user.name = roles[index++];
	index %= 3;
	user.message('role', user.name);
	cloak.messageAll('init_response', user.name + ' joined');
    }
  }

});

cloak.run();
