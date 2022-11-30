import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../errors/domain.error";
import { InfrastructureError } from "../errors/infrastructure.error";
import { LogEntity } from "../log.entity";
import { CreateLogPort } from "../ports/create-log.port";
import { GetListChatPort } from "../ports/get-list-chats.port";
import { NotifyPort } from "../ports/notify.port";

export class CreateLogUseCase {
  constructor(
    private readonly createLogPort: CreateLogPort,
    private readonly getListChatPort: GetListChatPort,
    private readonly notifyPort: NotifyPort
  ){}

  async create(
    created: string,
    ip: string,
    service: string,
    level: string,
    messages: string
  ): Promise<Either<DomainError, boolean> | Either<InfrastructureError, boolean>> {
    const maybeLogEntity = LogEntity.new(
      created,
      ip,
      service,
      level,
      messages
    );

    if (maybeLogEntity.isLeft()) {
      return left(maybeLogEntity.value);
    }

    if (maybeLogEntity.isRight()) {
      const maybeTrue = await this.createLogPort.create(maybeLogEntity.value);
      if (maybeTrue.isLeft()) {
        return left(maybeTrue.value);
      }

      if (maybeTrue.isRight()) {
        if (maybeLogEntity.value.isDanger() || maybeLogEntity.value.isWarning()) {
          const maybeChats = await this.getListChatPort.get();

          if (maybeChats.isRight()) {
            this.notifyPort.notify(
              maybeChats.value,
              `
                DATE - ${maybeLogEntity.value.created}
                LEVEL - ${maybeLogEntity.value.messages}
                IP - ${maybeLogEntity.value.ip.value}
                SERVICe - ${maybeLogEntity.value.service.value}
                LEVEL - ${maybeLogEntity.value.level.value}
                MESSAGE - ${maybeLogEntity.value.messages}
              `
            );
          }
        }
      }
    }

    return right(true);
  }
}