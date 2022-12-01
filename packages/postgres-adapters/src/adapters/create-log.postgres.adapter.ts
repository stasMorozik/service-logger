import { Client } from 'pg';
import { Either, right } from '@sweet-monads/either';
import { CreateLogPort, InfrastructureError, LogEntity } from 'core'; 

export class CretaeLogPostgresAdapter implements CreateLogPort {
  constructor(
    private readonly _client: Client
  ){}

  async create(log: LogEntity): Promise<Either<InfrastructureError, boolean>> {
    try {
      await this._client.query('BEGIN');
      
      const query = `
        INSERT INTO logs
        (created, ip, service, level, message) 
        VALUES($1, $2, $3, $4, $5)
      `;

      await this._client.query(query, [log.created, log.ip.value, log.service.value, log.level.value, log.messages]);
      await this._client.query('COMMIT');

      return right(true);
    } catch (e) {
      await this._client.query('ROLLBACK');
      throw e;
    }
  } 
}