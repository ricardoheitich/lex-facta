// Importa a NOVA biblioteca (Vertex AI)
import { VertexAI, HarmCategory, HarmBlockThreshold } from "@google-cloud/vertexai";

// 1. Pega a sua chave de API secreta
const apiKey = import.meta.env.VITE_API_KEY;

// 2. Precisamos dizer ao Vertex AI qual é o ID do seu projeto
// Vá para o console.cloud.google.com e copie o "ID do projeto"
// (NÃO é o nome, é o ID, ex: "lex-facta-app-123456")
// Se você não souber o ID, use o NOME por enquanto (ex: "Lex Facta App")
const projectId = "lex-facta-app-123456"; // <-- TROQUE ISSO PELO ID DO SEU PROJETO NOVO

// 3. Inicializa o Vertex AI
const vertex_ai = new VertexAI({
  project: projectId,
  location: "us-central1", // Localização padrão
  // IMPORTANTE: Este código é feito para rodar no "back-end" (servidor).
  // No front-end (Vercel), podemos ter problemas de autenticação.
  // Se der erro de autenticação, teremos que mudar a Vercel para "back-end".
  // Mas vamos torcer para que a Chave de API seja suficiente.
  // Esta biblioteca é mais complexa e pode não gostar de ser usada no navegador.
});

// Configurações do modelo
const model = "gemini-pro"; // Usando o modelo estável

const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
  // Configurações de segurança (para evitar bloqueios)
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});

// 5. Esta é a função que seu app chama
export const analyzeEvent = async (prompt: string): Promise<string> => {
  
  const request = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    const result = await generativeModel.generateContent(request);
    const response = result.response;
    
    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("Resposta inválida da API.");
    }

    const text = response.candidates[0].content.parts[0].text;
    
    if (!text) {
      throw new Error("A API retornou uma resposta vazia.");
    }
    
    return text;

  } catch (error: any) {
    console.error("Erro na chamada do Vertex AI:", error);
    // Isso vai mostrar o erro real na tela
    throw error;
  }
};
