import {left, right, Either} from '@sweet-monads/either';
import { DomainError } from './errors/domain.error';

export class ChatEntity {
  protected constructor(
    readonly chatId: number
  ){}

  static new(chatId: number): Either<DomainError, ChatEntity> {
    if (typeof chatId != 'number') {
      return left(new DomainError('Invalid id chat'));
    }

    return right(new ChatEntity(chatId));
  }
}