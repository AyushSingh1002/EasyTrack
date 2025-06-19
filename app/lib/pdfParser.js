import PDFParser from "pdf2json";

/**
 * Extracts structured information from a resume PDF buffer.
 */
export async function parseResume(pdfBuffer) {
  if (!Buffer.isBuffer(pdfBuffer)) {
    throw new Error("Invalid PDF buffer");
  }

  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", err => {
      reject(new Error("PDF parsing error: " + err.parserError));
    });

    parser.on("pdfParser_dataReady", pdfData => {
      try {
        const lines = [];

        for (const page of pdfData.Pages) {
          // Map lines by rounded Y coordinate
          const lineMap = new Map();

          for (const text of page.Texts) {
            const y = text.y.toFixed(2); // group by vertical position
            const contentEncoded = text.R?.[0]?.T;
            if (!contentEncoded) continue;

            let decoded = "";
            try {
              decoded = decodeURIComponent(contentEncoded);
            } catch {
              decoded = "";
            }
            if (!decoded) continue;

            if (!lineMap.has(y)) {
              lineMap.set(y, []);
            }
            lineMap.get(y).push({ x: text.x, text: decoded });
          }

          // Sort lines vertically and their text horizontally
          const sortedLines = Array.from(lineMap.entries())
            .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
            .map(([_, texts]) =>
              texts
                .sort((a, b) => a.x - b.x)
                .map(t => t.text)
                .join('')
                .trim()
            )
            .filter(Boolean);

          lines.push(...sortedLines);
        }

        const fullText = lines.join('\n');

        // Clean raw text for output
        const cleanRawText = fullText
          .replace(/\n{2,}/g, '\n')           // remove excessive blank lines
          .replace(/[^\x20-\x7E\n]/g, '')     // remove non-printable ASCII chars
          .trim();

        const cleanText = str => str.replace(/\s+/g, ' ').trim();

        // Regex patterns
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

        const resumeData = {
          name: '',
          email: '',
          phone: '',
          education: [],
          workExperience: [],
          skills: [],
          rawText: cleanRawText,
        };

        // Extract email and phone
        const emailMatches = fullText.match(emailRegex);
        if (emailMatches?.length) resumeData.email = emailMatches[0];

        const phoneMatches = fullText.match(phoneRegex);
        if (phoneMatches?.length) resumeData.phone = cleanText(phoneMatches[0]);

        // Improved Name Detection:
        // Find first line with 2-3 words starting uppercase, ignoring section headers
        const possibleName = lines.find(line => {
          if (/skills|education|experience|projects|certifications|contact/i.test(line)) return false;
          return /^[A-Z][a-z]+( [A-Z][a-z]+){1,2}$/.test(line);
        });
        if (possibleName) resumeData.name = possibleName;

        // Utility function to parse sections (skills, education, experience)
        function extractSection(startRegex, breakRegex) {
          const startIndex = lines.findIndex(line => startRegex.test(line));
          if (startIndex === -1) return [];

          const sectionLines = [];
          for (let i = startIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // skip blank lines
            if (breakRegex.test(line)) break; // stop at next section
            sectionLines.push(line);
          }
          return sectionLines;
        }

        // Skills Extraction
        const skillsRaw = extractSection(/skills|technical skills|technologies/i, /education|experience|projects|certifications|contact/i);
        resumeData.skills = skillsRaw
          .map(line => line.replace(/^[•\-\*]\s*/, '')) // remove bullets
          .join(', ')
          .split(/[,;]/)
          .map(s => cleanText(s))
          .filter(Boolean);

        // Education Extraction
        const educationRaw = extractSection(/education/i, /experience|skills|projects|certifications|contact/i);
        resumeData.education = educationRaw.filter(Boolean);

        // Work Experience Extraction
        const experienceRaw = extractSection(/experience|work history/i, /education|skills|projects|certifications|contact/i);
        resumeData.workExperience = experienceRaw.filter(Boolean);

        resolve(resumeData);
      } catch (err) {
        reject(new Error("Resume processing failed: " + err.message));
      }
    });

    parser.parseBuffer(pdfBuffer);
  });
}
