// import axios from "axios";

// /**
//  * Generate a personalized outreach message using Together.ai
//  * @param {string} prompt - The input prompt to guide the AI (e.g., info about lead)
//  * @returns {Promise<string>} - The generated message
//  */
// export async function generateOutreach(prompt) {
//   try {
//     const response = await axios.post(
//       'https://api.together.xyz/v1/completions',
//       {
//         model: 'lgai/exaone-3-5-32b-instruct', // or use llama3
//         prompt: prompt,
//         max_tokens: 800,
//         temperature: 0.7,
//         top_p: 0.9,
//         // stop: ["\n\n"],
//       },
//       {
//         headers: {
//           'Authorization': `Bearer cf91fc7404f499d564d98cf2f6bc5c9d61eb9ab580e45d87df78c1228790e9c1`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const text = response.data.choices[0]?.text.trim();
//     return text || 'No output generated.';
//   } catch (error) {
//     console.error('Together.ai API error:', error.response?.data || error.message);
//     return 'Error generating message.';
//   }
// }
import axios from "axios";

// Add your API keys (keep these in environment variables, not in code!)
const TOGETHER_API_KEY = process.env.NEXT_PUBLIC_TOGETHER_API_KEY ;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY2 ;

// Define AI providers in priority order
const providers = [
  {
    name: "gemini",
    call: async (prompt) => {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        { contents: [{ parts: [{ text: prompt }] }] },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY,
          },
        }
      );
      return (
        response.data.candidates[0]?.content?.parts[0]?.text?.trim() ||
        "No output generated."
      );
    },
  },
  {
    name: "together",
    call: async (prompt) => {
      const response = await axios.post(
        "https://api.together.xyz/v1/completions",
        {
          model: "meta-llama/Llama-3-70b-instruct",
          prompt,
          max_tokens: 800,
          temperature: 0.7,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0]?.text?.trim() || "No output generated.";
    },
  },
  // Add more providers here if needed
];

export async function generateOutreach(prompt) {
  for (const provider of providers) {
    try {
      console.log(`Trying ${provider.name}...`);
      const result = await provider.call(prompt);
      console.log(`Success with ${provider.name}`);
      return result;
    } catch (error) {
      console.warn(`${provider.name} failed:`, error.response?.data || error.message);
    }
  }
  return "All AI providers failed.";
}
