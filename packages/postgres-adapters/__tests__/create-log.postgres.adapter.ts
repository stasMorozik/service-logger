'use strict';

import { LogEntity } from 'core';
import { pool } from '../src/pool';
import { CretaeLogPostgresAdapter } from '../src/adapters/create-log.postgres.adapter';

afterEach(async () => {
  const poolClient = await pool.connect();
  const query = `DELETE FROM logs`;
  await poolClient.query(query, []);
  await pool.end();
});

test('create log', async () => {
  const poolClient = await pool.connect();
  const adapter = new CretaeLogPostgresAdapter(poolClient);

  const logEntity = LogEntity.new('2022-11-12', '192.168.0.11', 'Tasker', 'DANGER', 'Exception');
  if (logEntity.isRight()) {
    const resultCreated = await adapter.create(logEntity.value);
    expect(resultCreated.isRight()).toBe(true);
  }
});
