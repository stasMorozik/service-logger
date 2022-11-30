import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';

export class IpValueObject {
  protected constructor(
    readonly value: string
  ){}

  static new(ip: string): Either<DomainError, IpValueObject> {
    if (typeof ip != 'string') {
      return left(new DomainError('Invalid ip'));
    }

    if (
      !ip.match(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      )
    ) {
      return left(new DomainError('Invalid ip'));
    }

    return right(new IpValueObject(ip));
  }
}