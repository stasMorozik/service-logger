import { Either, right } from '@sweet-monads/either';
import { ChatEntity } from '../../src/domain/chat.entity';
import { InfrastructureError } from '../../src/domain/errors/infrastructure.error';
import { GetListChatPort } from '../../src/domain/ports/get-list-chats.port';

export class FakeGetListChatsAdapter implements GetListChatPort {
  constructor(
    private readonly chats: ChatEntity[]
  ){}
  
  async get(): Promise<Either<InfrastructureError, ChatEntity[]>> {
    return right(this.chats);
  }
}