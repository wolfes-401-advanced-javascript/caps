'use strict';

require('dotenv').config();
const net = require('net');
const faker = require('faker');

const storeName = process.env.STORE_NAME || 'Daves Store'; 

const Client = new net.Socket();

Client.connect(3000, 'localhost', () => {
  console.log('connected to the vendor server');
});

Client.on('data', monitorEvents);

function monitorEvents(buffer) {
  let data = JSON.parse(buffer.toString());
  if (data.event === 'delivered') {
    console.log(`Thank you for delivering ${data.payload.id}!`);
  }
}

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
  console.log(`Package ${payload.id} is ready for pickup.`);
  Client.write(JSON.stringify({payload, event: 'ready'}));
  return payload;
}

setTimeout(() => {
  generateOrder();

}, 5000);


