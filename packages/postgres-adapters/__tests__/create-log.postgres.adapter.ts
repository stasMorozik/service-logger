'use strict';

import { LogEntity } from 'core';
import { CretaeLogPostgresAdapter } from '../src/adapters/create-log.postgres.adapter';
import { Client } from 'pg';

let client: Client | null = null;

beforeEach(async () => {
  if (!client) {
    client = new Client({
      host: 'localhost',
      user: 'db_user',
      password: '12345',
      database: 'service_logger',
      connectionTimeoutMillis: 2000
    });
    await client.connect();
  }
});

afterEach(async () => {
  const query = `DELETE FROM logs`;
  await client?.query(query, []);
  await client?.end();
});

test('create log', async () => {
  const adapter = new CretaeLogPostgresAdapter(client as Client);
  const logEntity = LogEntity.new('2022-11-12', '192.168.0.11', 'Tasker', 'DANGER', 'Exception');
  if (logEntity.isRight()) {
    const resultCreated = await adapter.create(logEntity.value);
    expect(resultCreated.isRight()).toBe(true);
  }
});
