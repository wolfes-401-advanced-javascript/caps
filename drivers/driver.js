'use strict';

const net = require('net'); // require net
const Client = new net.Socket();

Client.connect(3000, 'localhost', () => {
  console.log('connected to driver');
});

Client.on('data', monitorEvents);

function monitorEvents(buffer) {
  let data = JSON.parse(buffer.toString());
  if (data.event === 'ready') {
    handlePackage(data);
  }
  return data;
}

function handlePackage(data) {
  setTimeout(function() {
    //console.log(`Driver picked up ${data.payload.id}`);
    Client.write(JSON.stringify({payload: data.payload, event: 'picked up'}));
  }, 1000);

  setTimeout(function() {
    //console.log(`Package ${data.payload.id} has been delivered`);
    Client.write(JSON.stringify({payload: data.payload, event: 'delivered'}));
  }, 3000);
}

// function pickedUp(payload) {
//   setTimeout(() => {
  
//     console.log(`Package ${payload.id} has been picked up by driver`, payload);
    
//     events.emit('pickedUp', payload);
//   }, 1000);
// }

// function inTransit(payload) {
//   console.log(`Package ${payload.id} is in transit`, payload);

//   events.emit('inTransit', payload);
// }

// function delivered(payload) {
//   setTimeout(() => {

//     console.log(`Package ${payload.id} has been delivered`, payload);
//     let time = new Date;
      
//     events.emit('delivered', payload);
//   }, 3000);
// }

module.exports = monitorEvents;