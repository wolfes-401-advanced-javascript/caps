'use strict';

const events = require('./events.js');
const faker = require('faker');
const caps = require('./caps.js');

const storeName = 'Cultural Cave';

async function generateOrder() {
  let randomName = await faker.name.findName();
  let randomAddress = await faker.address.streetAddress();
  let randomId = await faker.random.number();

  let payload = await {
    id: randomId,
    store: storeName,
    name: randomName,
    address: randomAddress,
  };
  // events.emit('cache-update', payload);
  // events.emit('pickedUp', payload);
  return payload;
}

module.exports = generateOrder;

