'use strict';

const amqpController = require('..');
const assert = require('assert').strict;

assert.strictEqual(amqpController(), 'Hello from amqpController');
console.info("amqpController tests passed");
