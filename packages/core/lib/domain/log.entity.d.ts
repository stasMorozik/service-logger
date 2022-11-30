import { Either } from '@sweet-monads/either';
import { DomainError } from './errors/domain.error';
import { IpValueObject } from './value-objects/ip.value-object';
import { LevelValueObject } from './value-objects/level.value-object';
import { ServiceValueObject } from './value-objects/service.value-object';
export declare class LogEntity {
    readonly created: Date;
    readonly ip: IpValueObject;
    readonly service: ServiceValueObject;
    readonly level: LevelValueObject;
    readonly messages: string;
    protected constructor(created: Date, ip: IpValueObject, service: ServiceValueObject, level: LevelValueObject, messages: string);
    static new(created: string, ip: string, service: string, level: string, message: string): Either<DomainError, LogEntity>;
    isDanger(): boolean;
    isWarning(): boolean;
}
