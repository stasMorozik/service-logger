'use strict';

import { Client } from 'pg';
import { Either, right } from '@sweet-monads/either';
import { ChatEntity, GetListChatPort, InfrastructureError } from 'core';

export class GetLisChatPostgresAdapter implements GetListChatPort {
  constructor(
    private readonly _client: Client
  ){}

  async get(): Promise<Either<InfrastructureError, ChatEntity[]>> {
    const chats = await this._client.query('SELECT * from chats');
    return right(chats.rows);
  }
}