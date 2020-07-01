'use strict';

const events = require('./events.js');

function pickedUp(payload) {
  setTimeout(() => {
  
    console.log(`Package ${payload.id} has been picked up by driver`, payload);
    
    events.emit('pickedUp', payload);
  }, 1000);
}

function inTransit(payload) {
  console.log(`Package ${payload.id} is in transit`, payload);

  events.emit('inTransit', payload);
}

function delivered(payload) {
  setTimeout(() => {

    console.log(`Package ${payload.id} has been delivered`, payload);
    let time = new Date;
      
    events.emit('delivered', payload);
  }, 3000);
}

module.exports = {
  pickedUp,
  inTransit,
  delivered,
};