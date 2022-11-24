import { Either, left, right } from '@sweet-monads/either';
import { InfrastructureError } from '../../src/domain/errors/infrastructure.error';
import { LogEntity } from '../../src/domain/log.entity';
import { GetListLogsPort } from '../../src/domain/ports/get-list-logs.port';
import { FilterValueObject } from '../../src/domain/value-objects/filter.value-object';
import { PaginationValueObject } from '../../src/domain/value-objects/pagination.value-object';
import { SortingValueObject } from '../../src/domain/value-objects/sorting.value-object';

export class FakeGetListLogsAdapter implements GetListLogsPort {
  constructor(
    private readonly logs: LogEntity[]
  ){}

  async get(
    paginationValueObject: PaginationValueObject, 
    filterValueObject: FilterValueObject | null, 
    sortingValueObject: SortingValueObject | null
  ): Promise<Either<InfrastructureError, LogEntity[]>> {
    return right(this.logs);
  }
}