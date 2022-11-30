import { Either } from "@sweet-monads/either";
import { InfrastructureError } from "../errors/infrastructure.error";
import { ChatEntity } from '../chat.entity';
export interface CreateChatPort {
    create(chat: ChatEntity): Promise<Either<InfrastructureError, boolean>>;
}
