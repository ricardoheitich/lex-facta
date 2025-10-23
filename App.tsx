import React, { useState, FormEvent } from "react";
import { analyzeEvent } from "./services/geminiService"; 

function App() {
  const [inputEvent, setInputEvent] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    if (!inputEvent.trim()) return; 

    setIsLoading(true);
    setError(null);
    setAnalysisResult("");

    try {
      const result = await analyzeEvent(inputEvent);
      setAnalysisResult(result);
    } catch (err) {
      // ESTA É A LINHA QUE MUDAMOS
      // Em vez de uma mensagem genérica, vamos mostrar o erro real.
      if (err instanceof Error) {
        setError(`Erro Detalhado: ${err.message}`);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
      console.error(err); // Também registra o erro no console
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        <header className="text-center p-4">
          <h1 className="text-5xl font-bold tracking-wider text-white uppercase" style={{ textShadow: '0 0 8px rgba(54, 211, 226, 0.4)' }}>
            LEX FACTA
          </h1>
          <p className="font-light tracking-wider text-white">
            Análise Factual Solar ∞ 
          </p>
          <p className="text-xs text-gray-500 mt-2">
            "A Lei é Fato. A Vida é Serenidade." - Século XXXVII
          </p>
        </header>

        <main className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl border border-gray-700 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="eventDescription" className="block text-md font-medium text-gray-300 mb-2">
                Descreva o evento a ser analisado...
              </label>
              <textarea
                id="eventDescription"
                value={inputEvent}
                onChange={(e) => setInputEvent(e.target.value)}
                disabled={isLoading}
                className="w-full h-40 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="Insira a descrição factual do evento aqui. Forneça todos os detalhes relevantes para uma análise precisa."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-400 text-gray-900 font-bold py-3 px-4 rounded-md h-12 flex items-center justify-center transition duration-300 ease-in-out hover:bg-cyan-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? "Analisando..." : "ANALISAR"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded-md">
              <strong>{error}</strong>
            </div>
          )}

          {analysisResult && (
            <div className="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-md">
              <h2 className="text-lg font-semibold text-white mb-2">Resultado da Análise:</h2>
              <div className="text-gray-200 whitespace-pre-wrap">{analysisResult}</div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default App;
