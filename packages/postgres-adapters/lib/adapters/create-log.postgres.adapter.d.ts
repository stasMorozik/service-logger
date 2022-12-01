import { Client } from 'pg';
import { Either } from '@sweet-monads/either';
import { CreateLogPort, InfrastructureError, LogEntity } from 'core';
export declare class CretaeLogPostgresAdapter implements CreateLogPort {
    private readonly _client;
    constructor(_client: Client);
    create(log: LogEntity): Promise<Either<InfrastructureError, boolean>>;
}
