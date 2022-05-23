import { create, Client, NotificationLanguage } from '@open-wa/wa-automate';
import MessageHandler from './messageHandler';

class WhatsApp {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  start() {
    this.client.onMessage(async message => {
      const messageHandler = new MessageHandler(message)
      messageHandler.handle()
    });
  }
}

const startWhatsApp = () => {
  create({
    sessionId: "vintage-bot-helper-test",
    hostNotificationLang: NotificationLanguage.PTBR,
    blockCrashLogs: true,
    disableSpins: true,
    multiDevice: true,
    logConsole: false,
    authTimeout: 60,
    headless: true,
    qrTimeout: 0,
    popup: true,
  }).then(client => new WhatsApp(client).start());
}

export { startWhatsApp }