import { Either } from "@sweet-monads/either";
import { DomainError } from "../errors/domain.error";
import { InfrastructureError } from "../errors/infrastructure.error";
import { CreateLogPort } from "../ports/create-log.port";
import { GetListChatPort } from "../ports/get-list-chats.port";
import { NotifyPort } from "../ports/notify.port";
export declare class CreateLogUseCase {
    private readonly createLogPort;
    private readonly getListChatPort;
    private readonly notifyPort;
    constructor(createLogPort: CreateLogPort, getListChatPort: GetListChatPort, notifyPort: NotifyPort);
    create(created: string, ip: string, service: string, level: string, messages: string): Promise<Either<DomainError, boolean> | Either<InfrastructureError, boolean>>;
}
