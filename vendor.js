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
  console.log(`Package ${payload.id} is ready for pickup.`)
  events.emit('pickup', payload);
  return payload;
}

function thanks(payload) {
  console.log(`Thank you for delivering ${payload.id}!`);
}

module.exports = {
  generateOrder,
  thanks,
};
