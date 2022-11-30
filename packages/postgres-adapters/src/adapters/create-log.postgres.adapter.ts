import { Either, right } from '@sweet-monads/either';
import { CreateLogPort, InfrastructureError, LogEntity } from 'core'; 
import { PoolClient } from 'pg';

export class CretaeLogPostgresAdapter implements CreateLogPort {
  constructor(
    private readonly _poolClient: PoolClient
  ){}

  async create(log: LogEntity): Promise<Either<InfrastructureError, boolean>> {
    try {
      await this._poolClient.query('BEGIN');
      
      const query = `
        INSERT INTO logs
        (created, ip, service, level, message) 
        VALUES($1, $2, $3, $4, $5)
      `;

      await this._poolClient.query(query, [log.created, log.ip.value, log.service.value, log.level.value, log.messages]);
      await this._poolClient.query('COMMIT');
      this._poolClient.release();

      return right(true);
    } catch (e) {
      await this._poolClient.query('ROLLBACK');
      this._poolClient.release();
      throw e;
    }
  } 
}