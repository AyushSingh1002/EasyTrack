import * as cheerio from 'cheerio';

/**
 * Scrapes LinkedIn job data using Cheerio (no browser required).
 */
export async function scrapeLinkedInJob(url) {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
  };

  const jobId = url.match(/\/jobs\/view\/(\d+)/i)?.[1];
  const urls = [url];
  if (jobId) urls.push(`https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`);

  try {
    let lastError;
    for (const candidateUrl of urls) {
      try {
        const res = await fetch(candidateUrl, { headers, signal: AbortSignal.timeout(10000) });
        if (!res.ok) throw new Error(`LinkedIn responded with ${res.status}`);

        const html = await res.text();
        const $ = cheerio.load(html);
        const getText = (selector) => $(selector).first().text().trim() || '';
        const jobTitle = getText('h1') || getText('.top-card-layout__title');
        const company = getText('.topcard__org-name-link') || getText('.topcard__flavor') || getText('.top-card-layout__company a');
        const location = getText('.topcard__flavor--bullet') || getText('[class*="job-view-location"]') || getText('.top-card-layout__second-subline');
        const structuredDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        const rawDesc = $('.show-more-less-html__markup').text().trim() || $('[class*="description"]').text().trim() || getText('.description__text') || structuredDescription.trim();
        const cleanedDesc = rawDesc.replace(/\n\s*\n+/g, '\n').replace(/[ \t]+/g, ' ').trim();
        if (!cleanedDesc) throw new Error('LinkedIn returned no job description');

        const extractSection = (title) => {
          const match = cleanedDesc.match(new RegExp(`${title}:(.*?)(\\n[A-Z][a-z]+:|$)`, 's'));
          return match ? match[1].trim() : '';
        };

        return {
          jobTitle,
          company,
          location,
          jobDescription: cleanedDesc,
          responsibilities: extractSection('Your Quest aka Responsibilities') || extractSection('Responsibilities'),
          qualifications: extractSection('Your Toolbelt aka Qualifications') || extractSection('Qualifications'),
          aboutCompany: extractSection('About SOCU') || extractSection('About'),
        };
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('LinkedIn returned no job description');
  } catch (error) {
    console.error('❌ Error scraping LinkedIn job:', error.message);
    const scrapeError = new Error('Failed to scrape LinkedIn job');
    scrapeError.status = 502;
    throw scrapeError;
  }
}
