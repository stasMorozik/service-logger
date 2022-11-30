import { Either } from '@sweet-monads/either';
import { DomainError } from './errors/domain.error';
export declare class ChatEntity {
    readonly chatId: number;
    protected constructor(chatId: number);
    static new(chatId: number): Either<DomainError, ChatEntity>;
}
