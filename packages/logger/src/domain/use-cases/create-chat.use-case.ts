import { Either, left } from "@sweet-monads/either";
import { ChatEntity } from "../chat.entity";
import { DomainError } from "../errors/domain.error";
import { InfrastructureError } from "../errors/infrastructure.error";
import { CreateChatPort } from "../ports/create-caht.port";
import { GetListChatPort } from "../ports/get-list-chats.port";

export class CreateChatUseCase {
  constructor(
    private readonly createChatPort: CreateChatPort,
    private readonly getListChatPort: GetListChatPort
  ){}

  async create(chatId: number): Promise<Either<DomainError, boolean> | Either<InfrastructureError, boolean>> {
    const maybeChats = await this.getListChatPort.get();
    if (maybeChats.isLeft()) {
      return left(maybeChats.value);
    }

    if (maybeChats.value.length >= 5) {
      return left(new InfrastructureError('Chat limit reached'));
    }

    const maybeChatId = ChatEntity.new(chatId);
    if (maybeChatId.isLeft()) {
      return left(maybeChatId.value);
    }

    return this.createChatPort.create(maybeChatId.value);
  }
}