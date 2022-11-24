import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
export declare class ServiceValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(service: string): Either<DomainError, ServiceValueObject>;
}
