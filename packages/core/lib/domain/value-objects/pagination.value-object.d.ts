import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
export declare class PaginationValueObject {
    readonly page: number;
    readonly limit: number;
    protected constructor(page: number, limit: number);
    static new(page: number, limit: number): Either<DomainError, PaginationValueObject>;
}
