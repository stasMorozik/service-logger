import { ChatEntity } from 'core';
import { Client } from 'pg';
import { GetLisChatPostgresAdapter } from '../src/adapters/get-list-chat.postgres.adapter';
import { CrateChatPostgresAdapter } from '../src/adapters/create-chat.postgres.adapter';

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
  const query = `DELETE FROM chats`;
  await client?.query(query, []);
  await client?.end();
});

test('create log', async () => {
  const getListadapter = new GetLisChatPostgresAdapter(client as Client);
  const createAdapter = new CrateChatPostgresAdapter(client as Client);
  const chatEntity = ChatEntity.new(3453462);
  if (chatEntity.isRight()) {
    await createAdapter.create(chatEntity.value);
    const resultCreated = await getListadapter.get();
    expect(resultCreated.isRight()).toBe(true);
  }
});