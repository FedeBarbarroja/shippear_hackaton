import "dotenv/config";

export const env = {
  port: process.env.PORT || 3000,
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  },
  evolution: {
    url: process.env.EVOLUTION_API_URL,
    apiKey: process.env.EVOLUTION_API_KEY,
    instance: process.env.EVOLUTION_INSTANCE,
  },
  sheets: {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    sheetId: process.env.GOOGLE_SHEET_ID,
  },
};
