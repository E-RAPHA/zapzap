const puppeteer = require('puppeteer');
const qrcode = require('qrcode-terminal');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,

  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');

  page.goto('https://web.whatsapp.com');
  await page.waitForSelector("#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix.os-win > div > div.landing-window > div.landing-main > div > div._25pwu > div");
  await page.waitForTimeout(1000);
  const qr = await page.evaluate(() => {

    function pickQR() {
      let qrbase = document.querySelector("#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix.os-win > div > div.landing-window > div.landing-main > div > div._25pwu").innerHTML
      let param1 = qrbase.indexOf(`data-ref="`);
      let param2 = qrbase.indexOf(`"><span>`);
      let qrfin = qrbase.slice(param1 + 10, param2);
      return qrfin;
    }
    pickQR();
      return {

      qrfinal: pickQR()

    },
    setInterval(() => {
      if (pickQR != document.querySelector("#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix.os-win > div > div.landing-window > div.landing-main > div > div._25pwu").innerHTML) {
        pickQR();
        return {
          newQR: pickQR()
        }
      }
    }, 1000);
    //o numero 10 é o tamanho do data-ref
  
  });

    if (qr.qrfinal != qr.newQR) {
      qrcode.generate(qr.newQR, { small: true }); 
    }

  console.log(qr.qrfinal);
  qrcode.generate(qr.qrfinal, { small: true }); 


  await page.screenshot({ path: 'example.png' });


})();

