import { Either } from "@sweet-monads/either";
import { DomainError } from "../errors/domain.error";
import { InfrastructureError } from "../errors/infrastructure.error";
import { CreateChatPort } from "../ports/create-caht.port";
import { GetListChatPort } from "../ports/get-list-chats.port";
export declare class CreateChatUseCase {
    private readonly createChatPort;
    private readonly getListChatPort;
    constructor(createChatPort: CreateChatPort, getListChatPort: GetListChatPort);
    create(chatId: number): Promise<Either<DomainError, boolean> | Either<InfrastructureError, boolean>>;
}
