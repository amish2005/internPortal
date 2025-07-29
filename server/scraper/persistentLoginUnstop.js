const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './unstop-profile',
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://unstop.com/internships', { waitUntil: 'networkidle2' });

  

//   await browser.close();
})();
