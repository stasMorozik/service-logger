import {left, Either} from '@sweet-monads/either';
import { SortingDto } from '../dtos/sorting.dto';
import { FilterDto } from '../dtos/filter.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { DomainError } from '../errors/domain.error';
import { InfrastructureError } from '../errors/infrastructure.error';
import { LogEntity } from '../log.entity';
import { GetListLogsPort } from '../ports/get-list-logs.port';
import { FilterValueObject } from '../value-objects/filter.value-object';
import { PaginationValueObject } from '../value-objects/pagination.value-object';
import { SortingValueObject } from '../value-objects/sorting.value-object';

export class GetListLogsUseCase {
  constructor(
    private readonly getListLogsPort: GetListLogsPort
  ){}

  async get(
    paginationDto: PaginationDto,
    filterDto?: FilterDto,
    sortingDto?: SortingDto
  ): Promise<Either<DomainError, LogEntity[]> | Either<InfrastructureError, LogEntity[]>> {
    
    const maybePaginationValueObject = PaginationValueObject.new(
      paginationDto.page, 
      paginationDto.limit
    );

    if (maybePaginationValueObject.isLeft()) {
      return left(maybePaginationValueObject.value);
    }

    let filterValueObject: FilterValueObject | null = null;
    if (filterDto) {
      const maybeFilterValueObject = FilterValueObject.new(
        filterDto.createdFrom,
        filterDto.createdTo,
        filterDto.service,
        filterDto.level
      );
      
      if (maybeFilterValueObject.isLeft()) {
        return left(maybeFilterValueObject.value);
      }

      if (maybeFilterValueObject.isRight()) {
        filterValueObject = maybeFilterValueObject.value;

        if (filterValueObject.createdFrom && filterValueObject.createdto) {
          if (filterValueObject.createdFrom.getTime() >= filterValueObject.createdto.getTime()) {
            return left(new DomainError('Invalid date period'));
          } 
        }
      }
    }

    let sortingValueObject: SortingValueObject | null = null;
    if (sortingDto) {
      const maybeSortingValueObject = SortingValueObject.new(
        sortingDto.created,
        sortingDto.level
      );
      
      if (maybeSortingValueObject.isLeft()) {
        return left(maybeSortingValueObject.value);
      }

      if (maybeSortingValueObject.isRight()) {
        sortingValueObject = maybeSortingValueObject.value;
      }
    }

    return this.getListLogsPort.get(
      maybePaginationValueObject.value,
      filterValueObject,
      sortingValueObject
    );
  }
}