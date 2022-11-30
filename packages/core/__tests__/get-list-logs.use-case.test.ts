import { FilterDto } from '../src/domain/dtos/filter.dto';
import { PaginationDto } from '../src/domain/dtos/pagination.dto';
import { SortingDto } from '../src/domain/dtos/sorting.dto';
import { LogEntity } from '../src/domain/log.entity';
import { GetListLogsUseCase } from '../src/domain/use-cases/get-list-logs.use-case';
import { FakeGetListLogsAdapter } from './fake-adapter/fake-get-list-logs.adapters';

test('get list logs', async () => {
  const logs: LogEntity[] = [];
  const getListLogsUseCase = new GetListLogsUseCase(
    new FakeGetListLogsAdapter(logs)
  );

  const resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
  );
  expect(resultGot.isRight()).toBe(true);
});

test('invalid get list logs', async () => {
  const logs: LogEntity[] = [];
  const getListLogsUseCase = new GetListLogsUseCase(
    new FakeGetListLogsAdapter(logs)
  );

  let resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
  );
  expect(resultGot.isRight()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(-1, 1),
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-22-12',
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-23-22'
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-13'
    )
  );
  expect(resultGot.isRight()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-12'
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-13',
      'Tasker!'
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-13',
      'Tasker',
      'DANGER!'
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-13',
      'Tasker',
      'DANGER'
    ),
    new SortingDto(
      '2012-29-13'
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-13',
      'Tasker',
      'DANGER'
    ),
    new SortingDto(
      '2012-12-12',
      'DANGER!'
    )
  );
  expect(resultGot.isLeft()).toBe(true);

  resultGot = await getListLogsUseCase.get(
    new PaginationDto(1, 1),
    new FilterDto(
      '2012-12-12',
      '2012-12-13',
      'Tasker',
      'DANGER'
    ),
    new SortingDto(
      '2012-12-12',
      'DANGER'
    )
  );
  expect(resultGot.isRight()).toBe(true);
});