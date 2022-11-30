import { Either, right } from '@sweet-monads/either';
import { InfrastructureError } from '../../src/domain/errors/infrastructure.error';
import { LogEntity } from '../../src/domain/log.entity';
import { CreateLogPort } from '../../src/domain/ports/create-log.port';

export class FakeCreateLogAdapter implements CreateLogPort {
  constructor(
    private readonly logs: LogEntity[]
  ){}

  async create(log: LogEntity): Promise<Either<InfrastructureError, boolean>> {
    this.logs.push(log);
    return right(true);
  }
}