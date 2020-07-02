'use strict';

const EventEmitter = require('events');
const caps = require('./caps/caps.js');


const events = new EventEmitter();

// events.on('save', caps.packageReady);
// events.on('update', caps.pickedUp);
// events.on('cache-update', (payload) => { caps.delivered(`Package ${payload.id} has been delivered`, payload); });

// events.emit('save', vendor.generateOrder());
// events.emit('update', vendor.generateOrder());

module.exports = events;
