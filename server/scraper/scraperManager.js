const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const scrapeInternshala = require('./scrapeInternshala');
const scrapeUnstop = require('./scrapeUnstop');
const insertInternships = require('./db');

const logFile = path.join(__dirname, "scraper.log");

function logMessage(message) {
  const log = `[${new Date().toLocaleString()}] ${message}\n`;
  console.log(log.trim());
  fs.appendFileSync(logFile, log);
}

async function runScrapers() {
  let internshalaData = [];
  let unstopData = [];

  logMessage("Starting scraping job...");
  try {
    internshalaData = await scrapeInternshala();
    console.log(`✅ Scraped ${internshalaData.length} from Internshala`);

    logMessage(`✅ Scraped ${internshalaData.length} from Internshala`);
  } catch (e) {
    console.error('Error scraping Internshala:', e);

    logMessage(`❌ Error scraping Internshala: ${e.message}`);
  }
  try {
    unstopData = await scrapeUnstop();
    console.log(`✅ Scraped ${unstopData.length} from Unstop`);

    logMessage(`✅ Scraped ${unstopData.length} from Unstop`);
  } catch (e) {
    console.error('Error scraping Unstop:', e);

    logMessage(`❌ Error scraping Unstop: ${e.message}`);
  }

  const allInternships = [...internshalaData, ...unstopData];
  console.log(`Total internships to insert: ${allInternships.length}`);
  logMessage(`Total internships to insert: ${allInternships.length}`);
  try{
    await insertInternships(allInternships);
    console.log("✅ Data inserted successfully");
    logMessage("✅ Data inserted successfully");
  } catch (err) {
    console.log("Error inserting internships", err);
    logMessage(`❌ Error inserting internships: ${e.message}`);
  }
   logMessage("Scraping job finished.");
};

cron.schedule("0 */12 * * *", () => {
  runScrapers();
});

logMessage("Scraper Manager started. Will run every 12 hours.");
console.log("Scraper Manager started. Will run every 12 hours.");


runScrapers();
