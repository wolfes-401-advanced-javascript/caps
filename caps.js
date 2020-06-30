'use strict';

const driver = require('./driver.js');
const vendor = require('./vendor.js');
const events = require('./events.js');

events.on('pickup', driver.pickedUp);
events.on('inTransit', driver.inTransit);
events.on('delivered', (payload) => { delivered(`Package ${payload.id} has been delivered`, payload); });

vendor.generateOrder();









// module.exports = {
//   delivered,
// };                          