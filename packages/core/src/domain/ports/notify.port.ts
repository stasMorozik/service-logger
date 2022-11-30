import { ChatEntity } from "../chat.entity";

export interface NotifyPort {
  notify(chats: ChatEntity[], message: string): void
}