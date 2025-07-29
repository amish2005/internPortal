const puppeteer = require("puppeteer");
const insertInternships = require('./db');
const BASE_URL = "https://internshala.com/internships";

async function scrapeInternshala() {
  try {
    const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let currentPage = 1;
  let allJobs = [];

  while (true) {
    const pageURL = `${BASE_URL}/page-${currentPage}`;
    console.log(`Scraping: ${pageURL}`);

    await page.goto(pageURL, { waitUntil: "networkidle2" });

    const jobs = await page.$$eval(
      ".internship_list_container .individual_internship",
      (elements) =>
        elements.map((el) => {
          const title =
            el.querySelector("#job_title")?.innerText.trim() || "";
          const company =
            el.querySelector(".company_name")?.innerText.trim() || "";
          const location =
            el.querySelector(".locations")?.innerText.trim() || "";
          const link =
            "https://internshala.com" +
            (el.querySelector("a#job_title")?.getAttribute("href") || "");
          const stipend =
            el.querySelector(".stipend")?.innerText.trim() || "";
          const duration =
            el.querySelector(".ic-16-calendar + span")?.innerText.trim() || "";
          let postDay =
            el.querySelector(".status-info span")?.innerText.trim() || "";
          if (postDay === "") {
            postDay =
              el.querySelector(".status-success span")?.innerText.trim() || "";
          }
          if (postDay === "") {
            postDay =
              el.querySelector(".status-inactive span")?.innerText.trim() || "";
          }
          const ppoStatus =
            el.querySelector(".ppo_status span")?.innerText.trim() || "";

          return {
            title,
            company,
            location,
            stipend,
            duration,
            postDay,
            ppoStatus,
            applyLink: link,
          };
        })
    );

    
    if (jobs.length <= 5) {
      break;
    }

    
    for (let job of jobs) {
      const detailPage = await browser.newPage();
      try {
        await detailPage.goto(job.applyLink, { waitUntil: "networkidle2" });

        const jobDetails = await detailPage.evaluate(() => {
          const description = (() => {
            const heading = document.querySelector("h2.about_heading");
            if (!heading) return "";

            const descriptionDiv = heading.nextElementSibling;
            if (!descriptionDiv || !descriptionDiv.classList.contains("text-container")) return "";

            // Convert <br> tags to newlines, then clean the text
            const html = descriptionDiv.innerHTML;
            return html.replace(/<br\s*\/?>/gi, "\n").replace(/(<([^>]+)>)/gi, "").trim();
          })();


          const skills = (() => {
            const skillsHeading = Array.from(document.querySelectorAll("h3.skills_heading")).find(
              (el) => el.innerText.trim() === "Skill(s) required"
            );
            if (!skillsHeading) return [];

            const skillDiv = skillsHeading.nextElementSibling;
            if (!skillDiv) return [];

            return Array.from(skillDiv.querySelectorAll("span.round_tabs")).map((s) =>
              s.innerText.trim()
            );
          })();

          const openings = (() => {
            const headingEls = Array.from(document.querySelectorAll("h3.section_heading"));
            const openingsHeading = headingEls.find(
              (el) => el.innerText.trim() === "Number of openings"
            );

            if (!openingsHeading) return "";

            const nextDiv = openingsHeading.nextElementSibling;
            if (!nextDiv || !nextDiv.classList.contains("text-container")) return "";

            return nextDiv.innerText.trim();
          })();
          const perks = (() => {
            const perksHeading = Array.from(document.querySelectorAll("h3.section_heading")).find(
              (el) => el.innerText.trim() === "Perks"
            );
            if (!perksHeading) return [];

            const perksContainer = perksHeading.nextElementSibling;
            if (!perksContainer || !perksContainer.classList.contains("round_tabs_container")) return [];

            return Array.from(perksContainer.querySelectorAll("span.round_tabs")).map((el) =>
              el.innerText.trim()
            );
          })();

          const whoCanApply = (() => {
            const heading = Array.from(document.querySelectorAll("p.section_heading")).find(
              (el) => el.innerText.trim() === "Who can apply"
            );
            if (!heading) return "";

            const targetDiv = heading.nextElementSibling;
            if (!targetDiv || !targetDiv.classList.contains("who_can_apply")) return "";

            const paras = Array.from(targetDiv.querySelectorAll("p"));
            return paras.map(p => p.innerText.trim()).join("\n");
          })();

          const aboutCompany = (() => {
            const heading = Array.from(document.querySelectorAll("h2.section_heading")).find(
              (el) => el.innerText.trim().startsWith("About ")
            );
            if (!heading) return "";

            let description = "";
            let websiteLink = "";

            let current = heading.nextElementSibling;
            while (current) {
              if (
                current.classList.contains("text-container") &&
                current.classList.contains("about_company_text_container")
              ) {
                description = current.innerText.trim();
              }

              if (
                current.classList.contains("text-container") &&
                current.classList.contains("website_link")
              ) {
                const anchor = current.querySelector("a");
                if (anchor) {
                  websiteLink = anchor.href;
                }
              }

              current = current.nextElementSibling;
            }

            return {
              description,
              websiteLink,
            };
          })();




          const otherRequirements = (() => {
            const heading = Array.from(document.querySelectorAll("h3.section_heading")).find(
              (el) => el.innerText.trim() === "Other requirements"
            );
            if (!heading) return "";

            const contentDiv = heading.nextElementSibling;
            if (
              !contentDiv ||
              !contentDiv.classList.contains("text-container") ||
              !contentDiv.classList.contains("additional_detail")
            )
              return "";

            const paras = Array.from(contentDiv.querySelectorAll("p")).map((p) =>
              p.innerText.trim()
            );

            return paras.join("\n");
          })();

          const directLink = (() => {
            const applyBtn = document.querySelector("a > button.top_apply_now_cta")?.parentElement;
            if (!applyBtn) return "";

            const relativeLink = applyBtn.getAttribute("href");
            if (!relativeLink) return "";

            return "https://internshala.com" + relativeLink;
          })();

          const startDate = (() => {
            const container = document.querySelector("#start-date-first");
            if (!container) return "";

            const desktop = container.querySelector(".start_immediately_desktop");
            const mobile = container.querySelector(".start_immediately_mobile");

            return (desktop?.innerText.trim() || mobile?.innerText.trim() || "").replace(/\u00a0/g, " ");
          })();

          const applyBy = (() => {
            const headingEls = Array.from(document.querySelectorAll(".item_heading"));
            const applyByHeading = headingEls.find(el =>
              el.innerText.trim().toUpperCase().includes("APPLY BY")
            );

            if (!applyByHeading) return "";

            const nextBody = applyByHeading.nextElementSibling;
            if (!nextBody || !nextBody.classList.contains("item_body")) return "";

            return nextBody.innerText.trim();
          })();
          return {
            description,
            skills,
            openings,
            perks,
            whoCanApply,
            aboutCompany,
            otherRequirements,
            directLink,
            startDate,
            applyBy,
          };
        });
        job.description = jobDetails.description;
        job.skills = jobDetails.skills;
        job.openings = jobDetails.openings;
        job.perks = jobDetails.perks;
        job.whoCanApply = jobDetails.whoCanApply;
        job.aboutCompany = jobDetails.aboutCompany;
        job.otherRequirements = jobDetails.otherRequirements;
        job.directLink = jobDetails.directLink;
        job.startDate = jobDetails.startDate;
        job.applyBy = jobDetails.applyBy;
        job.source = "Internshala";
        job.isSaved = false;





        console.log(`✅ Scraped detail: ${job.title}`);
      } catch (err) {
        console.log(`❌ Failed to scrape detail for ${job.title}`);
      } finally {
        await detailPage.close();
      }

      await new Promise((r) => setTimeout(r, 300));
    }

    allJobs.push(...jobs);
    currentPage++;
  }

  await browser.close();
  console.log(`✅ Total jobs scraped: ${allJobs.length}`);
  console.log(allJobs);

  return allJobs;
  } catch (err) {
    console.log("Error", err);
    return allJobs;
  }
}

module.exports = scrapeInternshala;
