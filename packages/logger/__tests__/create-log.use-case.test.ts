import { ChatEntity } from '../src/domain/chat.entity';
import { LogEntity } from '../src/domain/log.entity';
import { CreateLogUseCase } from '../src/domain/use-cases/create-log.use-case';
import { FakeCreateLogAdapter } from './fake-adapter/fake-create-log.adapter';
import { FakeGetListChatsAdapter } from './fake-adapter/fake-get-list-chats.adapter';
import { FakeNotifyAdapter } from './fake-adapter/fake-notify.adapter';

test('create log', async () => {
  const logs: LogEntity[] = [];
  const chats: ChatEntity[] = [];
  const createLogUseCase = new CreateLogUseCase(
    new FakeCreateLogAdapter(logs),
    new FakeGetListChatsAdapter(chats),
    new FakeNotifyAdapter(),
  );

  const resultCreated = await createLogUseCase.create(
    '2012-12-12',
    '192.168.32.11',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(resultCreated.isRight()).toBe(true);
});

test('invalid create', async () => {
  const logs: LogEntity[] = [];
  const chats: ChatEntity[] = [];
  const createLogUseCase = new CreateLogUseCase(
    new FakeCreateLogAdapter(logs),
    new FakeGetListChatsAdapter(chats),
    new FakeNotifyAdapter(),
  );

  let resultCreated = await createLogUseCase.create(
    '2012-23-',
    '192.168.32.11',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(resultCreated.isLeft()).toBe(true);

  resultCreated = await createLogUseCase.create(
    '2012-12-23',
    '192.-',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(resultCreated.isLeft()).toBe(true);

  resultCreated = await createLogUseCase.create(
    '2012-12-12',
    '192.168.32.11',
    'Tasker!',
    'DANGER',
    'Exception'
  );
  expect(resultCreated.isLeft()).toBe(true);

  resultCreated = await createLogUseCase.create(
    '2012-12-23',
    '192.168.32.11',
    'Tasker',
    'DANGERo',
    'Exception'
  );
  expect(resultCreated.isLeft()).toBe(true);
});