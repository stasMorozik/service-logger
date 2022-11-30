import { Either } from '@sweet-monads/either';
import { SortingDto } from '../dtos/sorting.dto';
import { FilterDto } from '../dtos/filter.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { DomainError } from '../errors/domain.error';
import { InfrastructureError } from '../errors/infrastructure.error';
import { LogEntity } from '../log.entity';
import { GetListLogsPort } from '../ports/get-list-logs.port';
export declare class GetListLogsUseCase {
    private readonly getListLogsPort;
    constructor(getListLogsPort: GetListLogsPort);
    get(paginationDto: PaginationDto, filterDto?: FilterDto, sortingDto?: SortingDto): Promise<Either<DomainError, LogEntity[]> | Either<InfrastructureError, LogEntity[]>>;
}
