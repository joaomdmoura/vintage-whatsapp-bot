"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wa_automate_1 = require("@open-wa/wa-automate");
const mime = require('mime-types');
const fs = require('fs');
const sizeOf = require('image-size');
const jimp_1 = __importDefault(require("jimp"));
const ocr_js_1 = __importDefault(require("./ocr.js"));
function start(client) {
    client.onMessage((message) => __awaiter(this, void 0, void 0, function* () {
        if (message.mimetype) {
            const filename = `${message.t}.${mime.extension(message.mimetype)}`;
            const mediaData = yield (0, wa_automate_1.decryptMedia)(message);
            fs.writeFile(filename, mediaData, function (err) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return console.log(err);
                    }
                    const dimensions = sizeOf(filename);
                    const shouldRotate = dimensions.width < dimensions.height;
                    if (shouldRotate) {
                        jimp_1.default.read(filename, (err, lenna) => {
                            if (err)
                                throw err;
                            lenna
                                .greyscale() // set greyscale
                                .contrast(.5)
                                .pixelate(2)
                                .rotate(90)
                                .crop(0, 0, dimensions.height, dimensions.width / 3)
                                .write(`bw-${filename}`); // save
                        });
                    }
                    else {
                        jimp_1.default.read(filename, (err, lenna) => {
                            if (err)
                                throw err;
                            lenna
                                .greyscale() // set greyscale
                                .contrast(.5)
                                .pixelate(2)
                                .crop(0, 0, dimensions.width, dimensions.height / 3)
                                .write(`bw-${filename}`); // save
                        });
                    }
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        const response = yield (0, ocr_js_1.default)(`bw-${filename}`);
                        console.log(response);
                        yield client.sendText(message.from, `nome: ${response === null || response === void 0 ? void 0 : response.name}, rg: ${response === null || response === void 0 ? void 0 : response.rg}`);
                        console.log('The file was saved!');
                    }), 3000);
                });
            });
        }
    }));
}
(0, wa_automate_1.create)({
    sessionId: "vintage-bot-helper-test",
    multiDevice: true,
    authTimeout: 60,
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: wa_automate_1.NotificationLanguage.PTBR,
    logConsole: false,
    popup: true,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));
