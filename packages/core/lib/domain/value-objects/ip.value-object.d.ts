import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
export declare class IpValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(ip: string): Either<DomainError, IpValueObject>;
}
