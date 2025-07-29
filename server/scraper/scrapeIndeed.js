const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeIndeed(query = 'internship', location = 'India', pages = 2) {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './indeed-profile',
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    const results = [];

    for (let i = 0; i < pages; i++) {
        const url = `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}&start=${i * 10}`;
        console.log(`Scraping: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });
        await delay(3000);

        const jobCards = await page.$$('.job_seen_beacon');
        console.log(`Found ${jobCards.length} job cards on page ${i + 1}`);

        for (const jobCard of jobCards) {
            try {
                const title = await jobCard.$eval('h2 a', el => el.innerText.trim());
                const applyLink = await jobCard.$eval('h2 a', el => el.href);
                const company = await jobCard.$eval('.companyName', el => el.innerText.trim());
                const locationText = await jobCard.$eval('.companyLocation', el => el.innerText.trim());
                const salary = await jobCard.$('.salary-snippet') ? await jobCard.$eval('.salary-snippet', el => el.innerText.trim()) : 'Not specified';
                const postDate = await jobCard.$eval('.date', el => el.innerText.trim());

                await jobCard.click();
                await page.waitForSelector('#jobDescriptionText', { timeout: 10000 });
                const description = await page.$eval('#jobDescriptionText', el => el.innerText.trim());

                results.push({
                    title,
                    company,
                    location: locationText,
                    salary,
                    posted: postDate,
                    applyLink,
                    description
                });

                await delay(1500);
            } catch (err) {
                console.log('Error extracting job details:', err.message);
            }
        }
    }

    fs.writeFileSync('indeed_jobs.json', JSON.stringify(results, null, 2));
    console.log(`✅ Scraping complete! ${results.length} jobs saved to indeed_jobs.json`);

    await browser.close();
}

scrapeIndeed('software developer internship', 'India', 2);
