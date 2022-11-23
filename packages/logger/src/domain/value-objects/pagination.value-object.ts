import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';

export class PaginationValueObject {
  protected constructor(
    readonly page: number,
    readonly limit: number
  ){}

  static new(page: number, limit: number): Either<DomainError, PaginationValueObject> {
    if (typeof page != 'number') {
      return left(new DomainError('Invalid page'));
    }

    if (typeof limit != 'number') {
      return left(new DomainError('Invalid limit'));
    }

    if (page < 1) {
      return left(new DomainError('Invalid page'));
    }

    if (limit < 1) {
      return left(new DomainError('Invalid limit'));
    }

    return right(new PaginationValueObject(page, limit));
  }
}