import axios from "axios";

/**
 * Generate a personalized outreach message using Together.ai
 * @param {string} prompt - The input prompt to guide the AI (e.g., info about lead)
 * @returns {Promise<string>} - The generated message
 */
export async function generateOutreach(prompt) {
  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/completions',
      {
        model: 'lgai/exaone-3-5-32b-instruct', // or use llama3
        prompt: prompt,
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.9,
        // stop: ["\n\n"],
      },
      {
        headers: {
          'Authorization': `Bearer cf91fc7404f499d564d98cf2f6bc5c9d61eb9ab580e45d87df78c1228790e9c1`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.choices[0]?.text.trim();
    return text || 'No output generated.';
  } catch (error) {
    console.error('Together.ai API error:', error.response?.data || error.message);
    return 'Error generating message.';
  }
}
