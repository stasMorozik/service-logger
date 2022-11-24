
import { LogEntity } from '../src/domain/log.entity';


test('create log', () => {
  const maybeLogEntity = LogEntity.new(
    '2011-12-12',
    '192.168.23.11',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(maybeLogEntity.isRight()).toBe(true);
});

test('invalid created', () => {
  const maybeLogEntity = LogEntity.new(
    '2011--12',
    '192.168.23.11',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(maybeLogEntity.isLeft()).toBe(true);
});

test('invalid created', () => {
  const maybeLogEntity = LogEntity.new(
    '2012-13-12',
    '192.168.23.11',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(maybeLogEntity.isLeft()).toBe(true);
});

test('invalid ip', () => {
  const maybeLogEntity = LogEntity.new(
    '2012-12-12',
    '192-168-23-11',
    'Tasker',
    'DANGER',
    'Exception'
  );
  expect(maybeLogEntity.isLeft()).toBe(true);
});

test('invalid service', () => {
  const maybeLogEntity = LogEntity.new(
    '2012-12-12',
    '192.168.23.11',
    'Tasker!',
    'DANGER',
    'Exception'
  );
  expect(maybeLogEntity.isLeft()).toBe(true);
});

test('invalid level', () => {
  const maybeLogEntity = LogEntity.new(
    '2012-12-12',
    '192.168.23.11',
    'Tasker',
    'DANGE',
    'Exception'
  );
  expect(maybeLogEntity.isLeft()).toBe(true);
});


