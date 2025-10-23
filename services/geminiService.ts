import { GoogleGenerativeAI } from "@google/generative-ai";
// O prompt do sistema (PDF) ainda está desativado para o teste
// import { SYSTEM_INSTRUCTION } from "../constants"; 

// 1. Pega a chave de API
const apiKey = import.meta.env.VITE_API_KEY;

// 2. Verifica se a chave foi carregada
if (!apiKey) {
  throw new Error("VITE_API_KEY is not set in environment variables.");
}

// 3. Inicializa a IA do Google
const genAI = new GoogleGenerativeAI(apiKey);

// 4. Configura o modelo
const model = genAI.getGenerativeModel({
  model: "gemini-pro", // Usando o modelo estável
  // O prompt do sistema (PDF) ainda está desativado para o teste
  // systemInstruction: SYSTEM_INSTRUCTION, 
  generationConfig: {
    temperature: 0.1,
    topK: 1,
    topP: 0.8,
  },
});

// 5. Esta é a função que seu app chama
export const analyzeEvent = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;

  } catch (error)S {
    console.error("Error during Gemini API call:", error);
    // Isso vai mostrar o erro real na tela
    throw error;
  }
};
