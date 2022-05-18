import tesseract from "node-tesseract-ocr"

const RGconfig = {
  lang: "por", // default
  oem: 3,
  psm: 11,
  tessedit_char_whitelist: "0123456789.-",
}

const Nameconfig = {
  lang: "por", // default
  oem: 3,
  psm: 11,
  tessedit_char_blacklist: "0123456789.-",
}

export default async function ocrNow(filename: any) {
  try {
    const text = await tesseract.recognize(filename, RGconfig)
    let re = /(\d{1,2}\.\d{3}\.\d{3}-\d{1})/gi;
    let tempText = text.replace(/\s+/g, '').match(re);
    let found = tempText ? tempText[0] : '';
    const rg = found

    const text2 = await tesseract.recognize(filename, Nameconfig)
    re = /newline([A-Za-zÀ-Úà-ú][À-Úà-úa-zA-Z ]+)-/gi;
    tempText = text2.replace(/\n+/g, '-newline').match(re)
    console.log(text2)
    console.log(tempText)
    found = tempText ? tempText.filter((x) => {
      const match = x.replace('newline', '').replace('-', '')
      console.log(match)
      return match.length > 10 && match !== 'VÁLIDA EM TODO O TERRITÓRIO NACIONAL'
    })[0].replace('newline', '').replace('-', '').toUpperCase() : '';
    const name = found
    
    return {name: name, rg: rg}
  } catch (error: any) {
    console.log(error?.message)
  }
}
