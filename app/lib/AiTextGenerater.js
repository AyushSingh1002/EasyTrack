import axios from "axios";

// ============================================================
// ENVIRONMENT
// ============================================================

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY1;

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.8-flash";

// ============================================================
// AI PROVIDERS
// ============================================================

const providers = [
  // ==========================================================
  // GEMINI
  // ==========================================================
  {
    name: "gemini",
    enabled: Boolean(GEMINI_API_KEY),

    call: async (prompt) => {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

      let response;
      try {
        response = await axios.post(
          endpoint,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": GEMINI_API_KEY,
            },
            timeout: 30000,
          }
        );
      } catch (error) {
        throw error;
      }

      const text = response.data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text)
        ?.filter(Boolean)
        ?.join("")
        ?.trim();

      if (!text) {
        throw new Error("Gemini returned an empty response");
      }

      return text;
    },
  },

  // ==========================================================
  // GROQ
  // ==========================================================
  {
    name: "groq-gpt-oss-120b",
    enabled: Boolean(GROQ_API_KEY),

    call: async (prompt) => {
      let response;
      try {
        response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_MODEL,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 1200,
            temperature: 0.7,
            top_p: 0.9,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 30000,
          }
        );
      } catch (error) {
        throw error;
      }

      const message =
        response.data?.choices?.[0]?.message;

      const text = message?.content?.trim();

      if (!text) {
        throw new Error(
          message?.reasoning_content
            ? "Groq returned reasoning without a final answer"
            : "Groq returned an empty response"
        );
      }

      return text;
    },
  },
];

// ============================================================
// MAIN AI FUNCTION
// ============================================================

export async function generateOutreach(prompt) {
  if (
    !prompt ||
    typeof prompt !== "string" ||
    !prompt.trim()
  ) {
    const error = new Error("A valid prompt is required");
    error.status = 400;
    throw error;
  }

  const configuredProviders = providers.filter(
    (provider) => provider.enabled
  );

  if (configuredProviders.length === 0) {
    const error = new Error(
      "No AI provider is configured. Please configure GEMINI_API_KEY or GROQ_API_KEY."
    );

    error.status = 502;
    throw error;
  }

  const failures = [];

  for (const provider of configuredProviders) {
    try {
      const result = await provider.call(prompt);

      return result;
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Unknown AI provider error";

      failures.push({
        provider: provider.name,
        error: message,
      });
    }
  }

  const error = new Error(
    "All AI providers failed"
  );

  error.status = 502;
  error.providers = failures;

  throw error;
}