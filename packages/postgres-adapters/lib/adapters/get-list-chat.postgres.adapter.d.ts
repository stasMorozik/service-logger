import { Client } from 'pg';
import { Either } from '@sweet-monads/either';
import { ChatEntity, GetListChatPort, InfrastructureError } from 'core';
export declare class GetLisChatPostgresAdapter implements GetListChatPort {
    private readonly _client;
    constructor(_client: Client);
    get(): Promise<Either<InfrastructureError, ChatEntity[]>>;
}
