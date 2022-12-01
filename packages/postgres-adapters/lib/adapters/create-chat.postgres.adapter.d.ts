import { Either } from '@sweet-monads/either';
import { Client } from 'pg';
import { ChatEntity, CreateChatPort, InfrastructureError } from 'core';
export declare class CrateChatPostgresAdapter implements CreateChatPort {
    private readonly _client;
    constructor(_client: Client);
    create(chat: ChatEntity): Promise<Either<InfrastructureError, boolean>>;
}
