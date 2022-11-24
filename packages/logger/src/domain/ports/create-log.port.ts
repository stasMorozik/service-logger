import { Either } from '@sweet-monads/either';
import { InfrastructureError } from '../errors/infrastructure.error';
import { LogEntity } from '../log.entity';

export interface CreateLogPort {
  create(log: LogEntity): Promise<Either<InfrastructureError, boolean>>
}