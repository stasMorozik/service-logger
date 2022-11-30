import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from './errors/domain.error';
import { IpValueObject } from './value-objects/ip.value-object';
import { LevelValueObject } from './value-objects/level.value-object';
import { ServiceValueObject } from './value-objects/service.value-object';

export class LogEntity {
  protected constructor(
    readonly created: Date,
    readonly ip: IpValueObject,
    readonly service: ServiceValueObject,
    readonly level: LevelValueObject,
    readonly messages: string
  ){}

  static new(
    created: string,
    ip: string,
    service: string,
    level: string,
    message: string
  ): Either<DomainError, LogEntity> {
    if (!new Date(created).getDate()) {
      return left(new DomainError('Invalid date'));
    }

    const maybeIpValueObject = IpValueObject.new(ip);
    if (maybeIpValueObject.isLeft()) {
      return left(maybeIpValueObject.value);
    }

    const maybeServiceValueObject = ServiceValueObject.new(service);
    if (maybeServiceValueObject.isLeft()) {
      return left(maybeServiceValueObject.value);
    }

    const maybeLevelValueObject = LevelValueObject.new(level);
    if (maybeLevelValueObject.isLeft()) {
      return left(maybeLevelValueObject.value);
    }

    if (typeof message != 'string') {
      return left(new DomainError('Invalid message'));
    }

    return right(new LogEntity(
      new Date(created),
      maybeIpValueObject.value,
      maybeServiceValueObject.value,
      maybeLevelValueObject.value,
      message
    ));
  }
  
  isDanger(): boolean {
    return this.level.isDanger();
  }

  isWarning(): boolean {
    return this.level.isWarning();
  }
}