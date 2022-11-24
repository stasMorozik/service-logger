import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
import { LevelValueObject } from './level.value-object';
export declare class SortingValueObject {
    readonly created: Date | null;
    readonly level: LevelValueObject | null;
    protected constructor(created: Date | null, level: LevelValueObject | null);
    static new(created?: string, level?: string): Either<DomainError, SortingValueObject>;
}
