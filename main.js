const puppeteer = require('puppeteer');
const qrcode = require('qrcode-terminal');
(async () => {
  const browser = await puppeteer.launch({headless : true,
  
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
  
  page.goto('https://web.whatsapp.com');
  await page.waitForSelector("#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix.os-win > div > div.landing-window > div.landing-main > div > div._25pwu > div");
  await page.waitForTimeout(1000);
  const qr = await page.evaluate(()=>{  
  let qrbase = document.querySelector("#app > div._1ADa8.nMnIl.app-wrapper-web.font-fix.os-win > div > div.landing-window > div.landing-main > div > div._25pwu").innerHTML
  let param1 = qrbase.indexOf(`data-ref="`);
  let param2 = qrbase.indexOf(`"><span>`);

  let qrfin = qrbase.slice(param1+10,param2);
  //o numero 10 é o tamanho do data-ref
   
   return {
    qrFinal: qrfin
     }


  });

  console.log (qr.qrFinal);
  qrcode.generate(qr.qrFinal , {small: true}); 2
  
  
  await page.screenshot({ path: 'example.png' });

 
})(); 
