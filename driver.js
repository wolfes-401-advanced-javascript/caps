'use strict';

const events = require('./events.js');
//const caps = require('./caps.js');

// events.on('pickup',(payload) => {
//   //console.log(`driver picked up ${payload.id}`);
//   events.emit('inTransit', payload);
//   events.emit('delivered', payload);
// });

function pickedUp(payload) {
  console.log(`Package ${payload.id} has been picked up by driver`, payload);
  
  events.emit('pickedUp', payload);
}

function inTransit(payload) {
  console.log(`Package ${payload.id} is in transit`, payload);

  events.emit('inTransit', payload);
}

function delivered(event, payload) {
  let time = new Date;
  console.log({ event, time, payload });

  events.emit('delivered', time, payload);
}

module.exports = {
  pickedUp,
  inTransit,
  delivered,
};