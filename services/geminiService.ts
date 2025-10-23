import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants"; // Isso importa seu prompt principal

// 1. Esta é a correção que fizemos antes. Está certa.
const apiKey = import.meta.env.VITE_API_KEY;

// 2. Verifica se a chave foi carregada
if (!apiKey) {
  // Isso não será visto pelo usuário, mas é uma boa prática
  throw new Error("VITE_API_KEY is not set in environment variables.");
}

// 3. Inicializa a IA do Google
const genAI = new GoogleGenerativeAI(apiKey);

// 4. Configura o modelo (ESTA É A PARTE QUE ESTAVA ERRADA NO CÓDIGO ANTIGO)
// Nós pegamos o modelo primeiro, com todas as configurações
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: SYSTEM_INSTRUCTION,
  generationConfig: {
    temperature: 0.1,
    topK: 1,
    topP: 0.8,
  },
});

// 5. Esta é a função que seu app chama
export const analyzeEvent = async (prompt: string): Promise<string> => {
  try {
    // 6. E aqui nós finalmente usamos o modelo (ESTA TAMBÉM ESTAVA ERRADA)
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;

  } catch (error) {
    console.error("Error during Gemini API call:", error);
    // Esta linha joga o erro para o App.tsx, que mostra a mensagem vermelha
    throw new Error("Failed to get a response from the AI model.");
  }
};
