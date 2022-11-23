import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
import { LevelValueObject } from './level.value-object';
import { ServiceValueObject } from './service.value-object';

export class FilterValueObject {
  protected constructor(
    readonly createdFrom: Date | null,
    readonly createdto: Date | null,
    readonly service: ServiceValueObject | null,
    readonly level: LevelValueObject | null
  ){}

  static new(
    from?: string,
    to?: string,
    level?: string,
    service?: string
  ): Either<DomainError, FilterValueObject> {
    if (!from && !to && !level && !service) {
      return left(new DomainError('Invalid filter input data'));
    }

    let fromR: null | Date = null; 
    if (from) {
      if (!new Date(from).getDate()) {
        return left(new DomainError('Invalid date'));
      }
      fromR = new Date(from);
    }

    let toR: null | Date = null; 
    if (to) {
      if (!new Date(to).getDate()) {
        return left(new DomainError('Invalid date'));
      }
      toR = new Date(to); 
    }

    let levelValueObject: null | LevelValueObject = null;
    if (level) {
      const result = LevelValueObject.new(level);
      if (result.isLeft()) {
        return left(result.value);
      }

      result.mapRight(v => {
        levelValueObject = v;
      });
    }

    let serviceValueObject: null | ServiceValueObject = null;
    if (service) {
      const result = ServiceValueObject.new(service);
      if (result.isLeft()) {
        return left(result.value);
      }

      result.mapRight(v => {
        serviceValueObject = v;
      });
    }

    return right(new FilterValueObject(
      fromR,
      toR,
      serviceValueObject,
      levelValueObject   
    ));
  }
}