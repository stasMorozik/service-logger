import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';

export class LevelValueObject {
  protected constructor(
    readonly value: string
  ){}

  static INFO = 'INFO';
  static DEBUG = 'DEBUG';
  static WARNING = 'WARNING';
  static DANGER = 'DANGER';

  static new(level: string): Either<DomainError, LevelValueObject> {
    if (typeof level != 'string') {
      return left(new DomainError('Invalid level'));
    }

    switch(level) { 
      case LevelValueObject.INFO: {  
        return right(new LevelValueObject(level));
      } 
      case LevelValueObject.DEBUG: { 
        return right(new LevelValueObject(level));
      }
      case LevelValueObject.WARNING: { 
        return right(new LevelValueObject(level)); 
      }
      case LevelValueObject.DANGER: {
        return right(new LevelValueObject(level)); 
      } 
      default: { 
        return left(new DomainError('Invalid level')); 
      } 
    }
  }

  isWarning(): boolean {
    return this.value == LevelValueObject.WARNING;
  }

  isDanger(): boolean {
    return this.value == LevelValueObject.DANGER;
  }
}