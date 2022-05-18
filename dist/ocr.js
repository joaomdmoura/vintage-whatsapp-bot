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
const node_tesseract_ocr_1 = __importDefault(require("node-tesseract-ocr"));
const RGconfig = {
    lang: "por",
    oem: 3,
    psm: 11,
    tessedit_char_whitelist: "0123456789.-",
};
const Nameconfig = {
    lang: "por",
    oem: 3,
    psm: 11,
    tessedit_char_blacklist: "0123456789.-",
};
function ocrNow(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const text = yield node_tesseract_ocr_1.default.recognize(filename, RGconfig);
            let re = /(\d{1,2}\.\d{3}\.\d{3}-\d{1})/gi;
            let tempText = text.replace(/\s+/g, '').match(re);
            let found = tempText ? tempText[0] : '';
            const rg = found;
            const text2 = yield node_tesseract_ocr_1.default.recognize(filename, Nameconfig);
            re = /newline([A-Za-zÀ-Úà-ú][À-Úà-úa-zA-Z ]+)-/gi;
            tempText = text2.replace(/\n+/g, '-newline').match(re);
            console.log(text2);
            console.log(tempText);
            found = tempText ? tempText.filter((x) => {
                const match = x.replace('newline', '').replace('-', '');
                console.log(match);
                return match.length > 10 && match !== 'VÁLIDA EM TODO O TERRITÓRIO NACIONAL';
            })[0].replace('newline', '').replace('-', '').toUpperCase() : '';
            const name = found;
            return { name: name, rg: rg };
        }
        catch (error) {
            console.log(error === null || error === void 0 ? void 0 : error.message);
        }
    });
}
exports.default = ocrNow;
