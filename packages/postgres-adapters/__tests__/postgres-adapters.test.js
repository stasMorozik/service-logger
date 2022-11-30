'use strict';

const postgresAdapters = require('..');
const assert = require('assert').strict;

assert.strictEqual(postgresAdapters(), 'Hello from postgresAdapters');
console.info("postgresAdapters tests passed");
