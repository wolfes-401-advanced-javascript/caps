'use strict';

const socketIo = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = socketIo(PORT);

io.on('connection', (socket) => {
  console.log('Someone has connected to the server');

  socket.on('error', (error) => console.log(error));
});

let caps = io.of('/caps');
caps.on('connection', (socket) => {
  console.log('Someone has connected the the caps namespace');

  socket.on('join', room => {
    console.log('Someone has joined room: ', room);
    socket.join(room);
  });
  
  socket.on('pickup', handlePickup);
  socket.on('in-transit', handleInTransit);
  socket.on('delivered', handleDelivered);
});

function handlePickup(payload) {
  let time = new Date;
  console.log({ event: `Package ${payload.id} is ready for pickup`, time });
  caps.emit('package-ready', payload);
}

function handleInTransit(payload) {
  let time = new Date;
  console.log({ event: `Package ${payload.id} is in transit`, time });
  caps.to(payload.vendor).emit('in-transit', payload);
}

function handleDelivered(payload) {
  let time = new Date;
  console.log({ event: `Package ${payload.id} has been delivered`, time, payload});
  caps.to(payload.vendor).emit('delivered', payload);
}

module.exports = {
  handlePickup,
  handleInTransit,
  handleDelivered,
};

                   