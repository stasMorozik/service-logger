import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
export declare class LevelValueObject {
    readonly value: string;
    protected constructor(value: string);
    static INFO: string;
    static DEBUG: string;
    static WARNING: string;
    static DANGER: string;
    static new(level: string): Either<DomainError, LevelValueObject>;
    isWarning(): boolean;
    isDanger(): boolean;
}
