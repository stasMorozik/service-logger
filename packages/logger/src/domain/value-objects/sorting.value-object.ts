import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
import { LevelValueObject } from './level.value-object';

export class SortingValueObject {
  protected constructor(
    readonly created: Date | null,
    readonly level: LevelValueObject | null
  ){}

  static new(
    created?: string,
    level?: string
  ): Either<DomainError, SortingValueObject> {
    if (!created && !level) {
      return left(new DomainError('Invalid filter input data'));
    }

    let createdR: null | Date = null; 
    if (created) {
      if (!new Date(created).getDate()) {
        return left(new DomainError('Invalid date'));
      }
      createdR = new Date(created); 
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

    return right(new SortingValueObject(createdR, levelValueObject));
  }
}