import { create, Client, decryptMedia, NotificationLanguage } from '@open-wa/wa-automate';
const mime = require('mime-types');
const fs = require('fs');
const sizeOf = require('image-size')
import Jimp from 'jimp'
import ocrNow from './ocr.js'

function start(client: Client) {
  client.onMessage(async message => {
    if (message.mimetype) {
      const filename = `${message.t}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);

      fs.writeFile(filename, mediaData, async function(err: any) {
        if (err) {
          return console.log(err);
        }
        const dimensions = sizeOf(filename)
        const shouldRotate = dimensions.width < dimensions.height

        if(shouldRotate){
          Jimp.read(filename, (err, lenna) => {
            if (err) throw err;
            lenna
              .greyscale() // set greyscale
              .contrast(.5)
              .pixelate(2)
              .rotate(90)
              .crop( 0, 0, dimensions.height, dimensions.width/3 )
              .write(`bw-${filename}`); // save
          });  
        } else {
          Jimp.read(filename, (err, lenna) => {
            if (err) throw err;
            lenna
              .greyscale() // set greyscale
              .contrast(.5)
              .pixelate(2)
              .crop( 0, 0, dimensions.width, dimensions.height/3 )
              .write(`bw-${filename}`); // save
          });
  
        }
        
        setTimeout(async () => {
          const response = await ocrNow(`bw-${filename}`)
          console.log(response)
          await client.sendText(
            message.from,
            `nome: ${response?.name}, rg: ${response?.rg}`
          );
          console.log('The file was saved!');
        }, 3000)
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
  hostNotificationLang: NotificationLanguage.PTBR,
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));