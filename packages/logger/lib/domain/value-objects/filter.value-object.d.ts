import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
import { LevelValueObject } from './level.value-object';
import { ServiceValueObject } from './service.value-object';
export declare class FilterValueObject {
    readonly createdFrom: Date | null;
    readonly createdto: Date | null;
    readonly service: ServiceValueObject | null;
    readonly level: LevelValueObject | null;
    protected constructor(createdFrom: Date | null, createdto: Date | null, service: ServiceValueObject | null, level: LevelValueObject | null);
    static new(from?: string, to?: string, level?: string, service?: string): Either<DomainError, FilterValueObject>;
}
