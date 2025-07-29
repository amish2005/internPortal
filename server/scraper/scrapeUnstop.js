const puppeteer = require('puppeteer');
const insertInternships = require('./db');


async function scrapeUnstop() {
    try {
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const browser = await puppeteer.launch({
            headless: true,
            userDataDir: './unstop-profile',
            defaultViewport: null,
        });

        const page = await browser.newPage();
        await page.goto('https://unstop.com/internships', { waitUntil: 'networkidle2' });

        async function scrollInternshipList() {
            await page.evaluate(async () => {
                const container = document.querySelector('.user_list');
                container.scrollBy(0, 1000);
            });
            await delay(1000);
        }

        for (let i = 0; i < 10; i++) {
            await scrollInternshipList();
        }

        const internshipSelectors = await page.$$('[id^="i_"]');
        // console.log(`Found ${internshipSelectors.length} internships`);

        const internshipDetails = [];

        for (let i = 0; i < 25000; i++) {
            try {
                const element = internshipSelectors[i];
                const elementId = await element.evaluate(el => el.id);
                const internshipId = elementId?.split('_')[1]; // "1523922" from "i_1523922_1"
                const applicationLink = internshipId
                    ? `https://unstop.com/competitions/${internshipId}/register`
                    : '';



                await element.click();
                await delay(1500);

                if ((i + 1) % 10 === 0) {
                    await scrollInternshipList();
                }

                const data = await page.evaluate(() => {
                    const safeText = (selector) =>
                        document.querySelector(selector)?.innerText.trim() || '';

                    const getStrongTextByLabel = (labelText) => {
                        const span = Array.from(document.querySelectorAll('.item span'))
                            .find(el => el.textContent.includes(labelText));
                        return span?.querySelector('strong')?.innerText.trim() || '';
                    };

                    const getSectionText = (headingText) => {
                        const section = Array.from(document.querySelectorAll('h2, h3'))
                            .find(el => el.innerText.trim().toLowerCase().includes(headingText.toLowerCase()));
                        return section?.parentElement?.innerText.trim() || '';
                    };

                    const getStipend = () => {
                        const stipendSpan = Array.from(document.querySelectorAll('.item span'))
                            .find(span => span.textContent.includes('Stipend'));
                        const stipend = stipendSpan?.querySelector('strong')?.innerText.trim();

                        if (stipend && stipend !== '') return stipend;

                        const typeHeading = Array.from(document.querySelectorAll('.cptn h4'))
                            .find(h => h.innerText.trim().toLowerCase().includes('internship type'));
                        const unpaidText = typeHeading?.parentElement.querySelector('p span')?.innerText.trim().toLowerCase();

                        if (unpaidText && unpaidText.includes('unpaid')) return 'Unpaid';

                        return '';
                    };

                    return {
                        title: safeText('h1.ttl'),
                        company: safeText('h3 a'),
                        location: safeText('.location span'),
                        postedOn: (() => {
                            const updated = Array.from(document.querySelectorAll('.desktop_views span'))
                                .find(e => e.textContent.includes('Updated On:'));
                            return updated?.textContent?.replace('Updated On:', '').trim() || '';
                        })(),
                        deadline: getStrongTextByLabel('Application Deadline'),
                        stipend: getStipend(),
                        impressions: getStrongTextByLabel('Impressions'),
                        eligibility: Array.from(document.querySelectorAll('.eligibility_sect .eligi')).map(e => e.innerText),
                        about: getSectionText('About the Internship'),
                        perks: (() => {
                            const heading = Array.from(document.querySelectorAll('.cptn h4'))
                                .find(el => el.innerText.trim().toLowerCase().includes('perks'));
                            if (!heading) return [];

                            const container = heading.parentElement;
                            return Array.from(container.querySelectorAll('p')).map(p => p.innerText.trim());
                        })(),
                        duration: (() => {
                            const heading = Array.from(document.querySelectorAll('.cptn h4'))
                                .find(el => el.innerText.trim().toLowerCase().includes('internship duration'));
                            if (!heading) return '';

                            const container = heading.parentElement;
                            return container.querySelector('p span')?.innerText.trim() || '';
                        })(),

                        applicationLink: document.querySelector('a.register_btn')?.href || '',
                        contactDetails: getSectionText('Contact'),
                        importantDates: getSectionText('Important Dates'),
                    };
                });
                data.source = "Unstop";
                data.isSaved = false;
                data.applicationLink = applicationLink;
                console.log(`✅ Scraped: ${data.title}`);
                internshipDetails.push(data);
            } catch (err) {
                console.log(`❌ Error on internship ${i + 1}:`, err.message);

            }
        }

        console.log(`\n🎯 Final Scraped Internships: ${internshipDetails.length}`);
        console.dir(internshipDetails, { depth: null });

        await browser.close();
        return internshipDetails;
    } catch (err) {
        console.log(err);
        return internshipDetails;
    }
};
module.exports = scrapeUnstop;