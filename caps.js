'use strict';

const driver = require('./driver.js');
const vendor = require('./vendor.js');
const events = require('./events.js');

events.on('pickup', driver.pickedUp);
events.on('pickedUp', driver.inTransit);
events.on('inTransit', driver.delivered);
events.on('delivered', vendor.thanks);

setInterval(() => {
  vendor.generateOrder();

}, 5000);









// module.exports = {
//   delivered,
// };                          