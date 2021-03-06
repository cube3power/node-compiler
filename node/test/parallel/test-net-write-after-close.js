'use strict';
const common = require('../common');
const net = require('net');

const server = net.createServer(common.mustCall(function(socket) {
  socket.resume();

  socket.on('error', common.mustCall(function(error) {
    console.error('got error, closing server', error);
    server.close();
  }));

  setTimeout(common.mustCall(function() {
    console.error('about to try to write');
    socket.write('test', common.mustCall(function(e) {}));
  }), 250);
}));

server.listen(0, function() {
  const client = net.connect(this.address().port, function() {
    client.end();
  });
});
