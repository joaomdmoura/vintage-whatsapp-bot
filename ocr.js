import tesseract from "node-tesseract-ocr"

const RGconfig = {
  lang: "eng", // default
  oem: 3,
  psm: 11,
  tessedit_char_whitelist: "0123456789.-",
}

const Nameconfig = {
  lang: "eng", // default
  oem: 3,
  psm: 11,
  tessedit_char_blacklist: "0123456789.-",
}

export default async function ocrNow(filename) {
  try {
    const text = await tesseract.recognize(filename, RGconfig)
    let re = /(\d{1,2}\.\d{3}\.\d{3}-\d{1})/gi;
    let tempText = text.replace(/\s+/g, '');
    let found = tempText.match(re)[0];
    const rg = found

    const text2 = await tesseract.recognize(filename, Nameconfig)
    re = /NOME-newline([a-zA-Z ]+)-newline/i;
    tempText = text2.replace(/\n+/g, '-newline');
    found = tempText.match(re)[1];
    const name = found
    
    return {name: name, rg: rg}
  } catch (error) {
    console.log(error.message)
  }
}
