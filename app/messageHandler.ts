import { Message, MessageTypes } from '@open-wa/wa-automate';
import TextHandler from './handlers/textHandler';
import Error from './error';

export default class MessageHandler {
  message: Message;

  constructor(message: Message){
    this.message = message
  }

  handle() {
    switch (this.message.type) {
      case MessageTypes.TEXT:
        new TextHandler(this.message.body).handle()
        break;
      default:
        new Error(`ERROR: ${this.message.type} NOT SUPPORTED`).log;
    }
  }
}