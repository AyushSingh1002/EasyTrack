import * as cheerio from 'cheerio';

/**
 * Scrapes LinkedIn job data using Cheerio (no browser required).
 */
export async function scrapeLinkedInJob(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch LinkedIn job page (status ${res.status})`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const getText = (selector) => $(selector).first().text().trim() || '';

    // Use more flexible selectors to handle LinkedIn DOM changes
    const jobTitle = getText('h1');
    const company = getText('.topcard__org-name-link') || getText('.topcard__flavor');
    const location = getText('.topcard__flavor--bullet') || getText('[class*="job-view-location"]');

    const rawDesc =
      $('.show-more-less-html__markup').text().trim() ||
      $('[class*="description"]').text().trim();

    const cleanedDesc = rawDesc
      .replace(/\n\s*\n+/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .trim();

    const extractSection = (title) => {
      const regex = new RegExp(`${title}:(.*?)(\\n[A-Z][a-z]+:|$)`, 's');
      const match = cleanedDesc.match(regex);
      return match ? match[1].trim() : '';
    };

    return {
      jobTitle,
      company,
      location,
      jobDescription: cleanedDesc,
      responsibilities:
        extractSection('Your Quest aka Responsibilities') || extractSection('Responsibilities'),
      qualifications:
        extractSection('Your Toolbelt aka Qualifications') || extractSection('Qualifications'),
      aboutCompany: extractSection('About SOCU') || extractSection('About'),
    };
  } catch (error) {
    console.error('❌ Error scraping LinkedIn job:', error.message);
    throw new Error('Failed to scrape LinkedIn job');
  }
}
