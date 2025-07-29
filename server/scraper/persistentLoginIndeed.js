const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './indeed-profile',
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto('https://secure.indeed.com/account/login', { waitUntil: 'networkidle2' });

    console.log('✅ Please log in manually, solve captcha if needed.');
    console.log('⚠ Do NOT close this script until you see the dashboard.');
})();
