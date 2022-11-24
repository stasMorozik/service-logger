import { Either } from "@sweet-monads/either";
import { ChatEntity } from "../chat.entity";
import { InfrastructureError } from "../errors/infrastructure.error";
export interface GetListChatPort {
    get(): Promise<Either<InfrastructureError, ChatEntity[]>>;
}
