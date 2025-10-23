
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not available. Please check your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeEvent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.3, // Lower temperature for more deterministic, factual responses
                topK: 32,
                topP: 0.9,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error during Gemini API call:", error);
        throw new Error("Failed to get a response from the AI model.");
    }
};
