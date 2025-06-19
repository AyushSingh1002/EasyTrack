import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const COOKIES_PATH = path.resolve('./linkedin-cookies.json');

/**
 * Load cookies from disk to stay logged in.
 */
async function loadCookies(page) {
  try {
    const cookiesString = await fs.readFile(COOKIES_PATH, 'utf8');
    const cookies = JSON.parse(cookiesString);
    await page.context().addCookies(cookies);
    console.log('✅ Loaded saved LinkedIn session cookies');
  } catch {
    console.warn('⚠️ No LinkedIn cookies found. You must login manually.');
  }
}

/**
 * Save cookies to disk after manual login.
 */
async function saveCookies(page) {
  const cookies = await page.context().cookies();
  await fs.writeFile(COOKIES_PATH, JSON.stringify(cookies, null, 2));
  console.log('💾 Saved LinkedIn session cookies');
}

/**
 * Scrapes LinkedIn job data.
 */
export async function scrapeLinkedInJob(url) {
 try {
   const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });

  if (page.url().includes('login')) {
    throw new Error('Redirected to login.');
  }

  const jobData = await page.evaluate(() => {
    const getText = selector => document.querySelector(selector)?.innerText.trim() || '';

    // Raw full job description
    const rawDesc = document.querySelector('.show-more-less-html__markup')?.innerText || '';

    // Clean excessive newlines & trim
    const cleanedDesc = rawDesc
      .replace(/\n\s*\n+/g, '\n')  // multiple newlines → one newline
      .replace(/[ \t]+/g, ' ')     // multiple spaces/tabs → one space
      .trim();

    // Optional: extract sections by headings (adjust regex based on your real text)
    function extractSection(title) {
      const regex = new RegExp(`${title}:(.*?)(\\n[A-Z][a-z]+:|$)`, 's');
      const match = cleanedDesc.match(regex);
      return match ? match[1].trim() : '';
    }

    return {
      jobTitle: getText('h1'),
      company: getText('.topcard__org-name-link') || getText('.topcard__flavor'),
      location: getText('.topcard__flavor--bullet'),
      jobDescription: cleanedDesc,
      responsibilities: extractSection('Your Quest aka Responsibilities') || extractSection('Responsibilities'),
      qualifications: extractSection('Your Toolbelt aka Qualifications') || extractSection('Qualifications'),
      aboutCompany: extractSection('About SOCU') || extractSection('About'),
    };
  });

  await browser.close();
  return jobData;
 } catch (error) {
    console.error('❌ Error scraping LinkedIn job:', error);
    throw new Error('Failed to scrape LinkedIn job');
  }   
  
 }

