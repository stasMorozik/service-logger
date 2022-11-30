import { Either } from '@sweet-monads/either';
import { InfrastructureError } from '../errors/infrastructure.error';
import { LogEntity } from '../log.entity';
import { FilterValueObject } from '../value-objects/filter.value-object';
import { PaginationValueObject } from '../value-objects/pagination.value-object';
import { SortingValueObject } from '../value-objects/sorting.value-object';

export interface GetListLogsPort {
  get(
    paginationValueObject: PaginationValueObject,
    filterValueObject: FilterValueObject | null,
    sortingValueObject: SortingValueObject | null
  ): Promise<Either<InfrastructureError, LogEntity[]>>
}