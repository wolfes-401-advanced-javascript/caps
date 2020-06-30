'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');

const storeName = process.env.STORE_NAME; 

function generateOrder() {
  let randomName = faker.name.findName();
  let randomAddress = faker.address.streetAddress();
  let randomId = faker.random.number();

  let payload =  {
    id: randomId,
    store: storeName,
    name: randomName,
    address: randomAddress,
  };
  // events.emit('cache-update', payload);
  events.emit('pickup', payload);
  return payload;
}

module.exports = {
  generateOrder,
};
