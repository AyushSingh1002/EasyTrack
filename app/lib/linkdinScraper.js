import * as cheerio from 'cheerio';

/**
 * Scrapes LinkedIn job data using Cheerio (no browser required).
 */
export async function scrapeLinkedInJob(url) {
  try {
    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('Failed to fetch LinkedIn job page');

    const html = await res.text();
    const $ = cheerio.load(html);

    const getText = (selector) => $(selector).first().text().trim() || '';

    const rawDesc = $('.show-more-less-html__markup').text().trim();

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
      jobTitle: getText('h1'),
      company: getText('.topcard__org-name-link') || getText('.topcard__flavor'),
      location: getText('.topcard__flavor--bullet'),
      jobDescription: cleanedDesc,
      responsibilities:
        extractSection('Your Quest aka Responsibilities') || extractSection('Responsibilities'),
      qualifications:
        extractSection('Your Toolbelt aka Qualifications') || extractSection('Qualifications'),
      aboutCompany: extractSection('About SOCU') || extractSection('About'),
    };
  } catch (error) {
    console.error('❌ Error scraping LinkedIn job:', error);
    throw new Error('Failed to scrape LinkedIn job');
  }
}
