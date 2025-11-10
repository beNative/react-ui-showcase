
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCode = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return Promise.resolve("`// API_KEY not configured. Please set the API_KEY environment variable.`");
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Generate a code snippet for the following request. Only output the code, without any explanation or markdown formatting.
        Request: "${prompt}"`,
        config: {
            systemInstruction: "You are a code generation assistant. You only respond with raw code snippets suitable for a code editor, without any extra text, explanations, or markdown fences like ```javascript.",
        },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating code with Gemini:", error);
    return `// Error: Could not generate code. Please check the console for details.`;
  }
};
