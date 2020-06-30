'use strict';

const EventEmitter = require('events');
const driver = require('./driver.js');
const vendor = require('./vendor.js');

const events = new EventEmitter();

events.on('save', packageReady);
events.on('update', pickedUp);
events.on('cache-update', (payload) => { delivered(`Package ${payload.id} has been delivered`, payload); });

function packageReady(payload) {
  console.log(`Package ${payload.id} is ready for pickup`);
  events.emit('cache-update', payload);
}

function pickedUp(payload) {
  console.log(`Package ${payload.id} has been picked up by driver`);
  events.emit('cache-update', payload);
}

function delivered(event, payload) {
  let time = new Date;
  console.log({ event, time, payload });
}

events.emit('save', { id: 100, name: 'John' });
events.emit('update', { id: 101, name: 'Diane' });