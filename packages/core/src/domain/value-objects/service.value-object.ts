import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';

export class ServiceValueObject {
  protected constructor(
    readonly value: string
  ){}

  static new(service: string): Either<DomainError, ServiceValueObject> {
    if (typeof service != 'string') {
      return left(new DomainError('Invalid name of service'));
    }

    if (!service.match(/^[a-zA-Z\w\s]+$/)) {
      return left(new DomainError('Invalid name of service'));
    }

    return right(new ServiceValueObject(service));
  }
}