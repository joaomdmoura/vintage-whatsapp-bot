import { create, Client, decryptMedia } from '@open-wa/wa-automate';
import mime from 'mime-types';
import fs from 'fs';
import ocrNow from './ocr'

function start(client) {
  client.onMessage(async message => {
    if (message.mimetype) {
      const filename = `${message.t}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);

      fs.writeFile(filename, mediaData, async function(err) {
        if (err) {
          return console.log(err);
        }
        const response = await ocrNow(filename)
        console.log(response)
        await client.sendText(
          message.from,
          `nome: ${response.name}, rg: ${response.rg}`
        );
        console.log('The file was saved!');
      });
    }
  });
}
create({
  sessionId: "vintage-bot-helper-test",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));