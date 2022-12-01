import { Either, left, right } from '@sweet-monads/either';
import { Client, DatabaseError } from 'pg';
import { ChatEntity, CreateChatPort, InfrastructureError } from 'core';

export class CrateChatPostgresAdapter implements CreateChatPort {
  constructor(
    private readonly _client: Client
  ){}
  
  async create(chat: ChatEntity): Promise<Either<InfrastructureError, boolean>> {
    try {
      await this._client.query('BEGIN');
      
      const query = `
        INSERT INTO chats
        (id) 
        VALUES($1)
      `;

      await this._client.query(query, [chat.chatId]);
      await this._client.query('COMMIT');

      return right(true);
    } catch (e) {
      await this._client.query('ROLLBACK');
      if ((e as DatabaseError).code == '23505') {
        return left(new InfrastructureError('Chat already exists'));
      }
      throw e;
    }
  }
}