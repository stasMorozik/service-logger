import { ChatEntity } from "../../src/domain/chat.entity";
import { NotifyPort } from "../../src/domain/ports/notify.port";

export class FakeNotifyAdapter implements NotifyPort {
  constructor(
  ){}

  notify(chats: ChatEntity[], message: string): void {
    chats.forEach(chatEntity => {
      console.log(`
        Chat - ${chatEntity.chatId},
        Message - ${message}
      `);
    })
  }
}