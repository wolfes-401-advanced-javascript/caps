'use strict';

const net = require('net');

const server = net.createServer();

const socketPool = {};

server.on('connection', (socket) => {
  const id = Math.floor(Math.random() * 100000);
  socketPool[id] = socket;
  console.log('connected at ' + id);

  socket.on('data', handleData);
  socket.on('error', (err) => console.log('socket error', err));
  socket.on('end', () => { delete socketPool[id]; });
  
});

server.on('error', (error => {
  console.log('SERVER ERROR: ', error);
}));

function handleData(buffer) {
  let data = JSON.parse(buffer.toString());
  if (data.event && data.payload) {
    logger(data);
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(data));
    }
  }
  return data;
}

function logger(data) {
  let time = new Date();
  let event = data.event;
  let payload = data.payload;
  console.log({ event: event, time, payload});
}

// driver.pickedUp();
// server.on('pickedUp', driver.inTransit);
// server.on('inTransit', driver.delivered);
// server.on('delivered', vendor.thanks);
server.listen(3000, () => {
  console.log('Whee! We are running');
});

module.exports = handleData;

                   