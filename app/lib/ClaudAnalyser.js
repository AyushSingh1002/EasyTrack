import axios from "axios";

/**
 * Generate a personalized outreach message using Claude 3 Sonnet via OpenRouter
 * @param {string} prompt - The input prompt
 * @returns {Promise<string>} - The generated message
 */
export async function generateOutreach(prompt) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "anthropic/claude-3-sonnet",
        messages: [
          { role: "system", content: "You are an AI job assistant helping analyze job descriptions and resumes." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 1024,
      },
      {
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.choices[0]?.message?.content?.trim();
    return text || 'No output generated.';
  } catch (error) {
    console.error('OpenRouter Claude error:', error.response?.data || error.message);
    return 'Error generating message.';
  }
}

