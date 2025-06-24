import PDFParser from "pdf2json";

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
          const lineMap = new Map();

          for (const text of page.Texts) {
            const y = text.y.toFixed(2);
            const raw = text.R?.[0]?.T;
            if (!raw) continue;

            let decoded = "";
            try {
              decoded = decodeURIComponent(raw);
            } catch {
              continue;
            }
            if (!decoded) continue;

            if (!lineMap.has(y)) lineMap.set(y, []);
            lineMap.get(y).push({ x: text.x, text: decoded });
          }

          const sortedLines = Array.from(lineMap.entries())
            .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
            .map(([_, items]) =>
              items.sort((a, b) => a.x - b.x).map(t => t.text).join('').trim()
            )
            .filter(Boolean);

          lines.push(...sortedLines);
        }

        const fullText = lines.join('\n');
        const cleanRawText = fullText
          .replace(/\n{2,}/g, '\n')
          .replace(/[^\x20-\x7E\n]/g, '')
          .trim();

        const cleanText = str => str.replace(/\s+/g, ' ').trim();

        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

        const resumeData = {
          name: '',
          email: '',
          phone: '',
          education: [],
          workExperience: [],
          skills: [],
          Raw: cleanRawText
        };

        const emailMatches = fullText.match(emailRegex);
        if (emailMatches?.length) resumeData.email = emailMatches[0];

        const phoneMatches = fullText.match(phoneRegex);
        if (phoneMatches?.length) resumeData.phone = cleanText(phoneMatches[0]);

        const possibleName = lines.find(line => {
          if (/skills|education|experience|projects|certifications|contact/i.test(line)) return false;
          return /^[A-Z][a-z]+( [A-Z][a-z]+){1,2}$/.test(line);
        });
        if (possibleName) resumeData.name = possibleName;

        function extractSection(startRegex, breakRegex) {
          const start = lines.findIndex(line => startRegex.test(line.trim().toLowerCase()));
          if (start === -1) return [];
          const section = [];
          for (let i = start + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            if (breakRegex.test(line.toLowerCase())) break;
            section.push(line);
          }
          return section;
        }

        const skillsRaw = extractSection(
          /^(skills|technical skills|technologies|languages & frameworks|tools & platforms|web technologies)$/i,
          /^(education|experience|work experience|projects|certifications|contact|profile)$/i
        );
        resumeData.skills = skillsRaw
          .map(line => line.replace(/^[•\-\*]\s*/, ''))
          .join(', ')
          .split(/[,;]/)
          .map(cleanText)
          .filter(Boolean);

        const educationRaw = extractSection(
          /^education$/i,
          /^(experience|skills|projects|certifications|contact|profile)$/i
        );
        resumeData.education = educationRaw;

        const experienceRaw = extractSection(
          /^(experience|work experience|work history)$/i,
          /^(education|skills|projects|certifications|contact|profile)$/i
        );
        resumeData.workExperience = experienceRaw;

        resolve(resumeData);
      } catch (err) {
        reject(new Error("Resume processing failed: " + err.message));
      }
    });

    parser.parseBuffer(pdfBuffer);
  });
}
