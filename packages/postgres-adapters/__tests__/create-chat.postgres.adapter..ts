'use strict';

import { ChatEntity } from 'core';
import { Client } from 'pg';
import { CrateChatPostgresAdapter } from '../src/adapters/create-chat.postgres.adapter';

let client: Client | null = null
let counterForEnd = 0;

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
  const query = `DELETE FROM chats`;
  await client?.query(query, []);
  if (counterForEnd >= 2) {
    await client?.end();
  }
});

test('create chat', async () => {
  const adapter = new CrateChatPostgresAdapter(client as Client);
  const chatEntity = ChatEntity.new(3453462);
  if (chatEntity.isRight()) {
    const resultCreated = await adapter.create(chatEntity.value);
    counterForEnd = counterForEnd + 1;
    expect(resultCreated.isRight()).toBe(true);
  }
});

test('already exists', async () => {
  const adapter = new CrateChatPostgresAdapter(client as Client);
  const chatEntity = ChatEntity.new(3453462);
  if (chatEntity.isRight()) {
    await adapter.create(chatEntity.value);
    const resultCreated = await adapter.create(chatEntity.value);
    counterForEnd = counterForEnd + 1;
    expect(resultCreated.isLeft()).toBe(true);
  }
});