import {left, right, Either} from '@sweet-monads/either';
import { FilterDto } from '../dtos/filter.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { DomainError } from '../errors/domain.error';
import { InfrastructureError } from '../errors/infrastructure.error';
import { LogEntity } from '../log.entity';
import { GetListPort } from '../ports/get-list.port';
import { FilterValueObject } from '../value-objects/filter.value-object';
import { PaginationValueObject } from '../value-objects/pagination.value-object';
import { SortingValueObject } from '../value-objects/sorting.value-object';

export class GetListUseCase {
  constructor(
    private readonly getListPort: GetListPort
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
        filterDto?.createdFrom,
        filterDto?.createdTo,
        filterDto?.service,
        filterDto?.level
      );
      
      if (maybeFilterValueObject.isLeft()) {
        return left(maybeFilterValueObject.value);
      }

      if (maybeFilterValueObject.isRight()) {
        filterValueObject = maybeFilterValueObject.value;
      }
    }

    let sortingValueObject: SortingValueObject | null = null;
    if (filterDto) {
      const maybeSortingValueObject = SortingValueObject.new(
        sortingDto?.created,
        sortingDto?.level
      );
      
      if (maybeSortingValueObject.isLeft()) {
        return left(maybeSortingValueObject.value);
      }

      if (maybeSortingValueObject.isRight()) {
        sortingValueObject = maybeSortingValueObject.value;
      }
    }

    return this.getListPort.get(
      maybePaginationValueObject.value,
      filterValueObject,
      sortingValueObject
    );
  }
}