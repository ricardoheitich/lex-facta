
import React, { useState } from 'react';
import { analyzeEvent } from './services/geminiService';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400" style={{ animationDelay: '0.4s' }}></div>
        <span className="ml-2 text-gray-400">IA-Aletheia está analisando...</span>
    </div>
);

const App: React.FC = () => {
    const [eventDescription, setEventDescription] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleAnalysis = async () => {
        if (!eventDescription.trim()) {
            setError('A descrição do evento não pode estar vazia.');
            return;
        }
        setIsLoading(true);
        setError('');
        setAnalysisResult('');

        try {
            const result = await analyzeEvent(eventDescription);
            setAnalysisResult(result);
        } catch (e) {
            setError('Ocorreu um erro ao contatar a IA. Por favor, tente novamente.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full max-w-4xl">
                <header className="text-center mb-8 mt-4">
                    <h1 className="text-5xl font-bold text-blue-400 tracking-wider">LEX FACTA</h1>
                    <p className="text-xl text-gray-400 mt-2">Análise Factual Solar</p>
                </header>

                <main>
                    <div className="bg-gray-800 rounded-lg shadow-2xl p-6">
                        <label htmlFor="event-description" className="block text-lg font-medium text-gray-300 mb-2">
                            Descreva o evento a ser analisado...
                        </label>
                        <textarea
                            id="event-description"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            className="w-full h-48 p-4 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-200 placeholder-gray-500"
                            placeholder="Insira a descrição factual do evento aqui. Forneça todos os detalhes relevantes para uma análise precisa."
                            disabled={isLoading}
                        />

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleAnalysis}
                                disabled={isLoading}
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors duration-300"
                            >
                                ANALISAR
                            </button>
                        </div>
                    </div>

                    {error && <div className="mt-6 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}

                    {isLoading && (
                        <div className="mt-8">
                            <LoadingSpinner />
                        </div>
                    )}
                    
                    {analysisResult && (
                        <div className="mt-8 bg-gray-800 rounded-lg shadow-2xl p-6">
                            <h2 className="text-2xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">Resultado da Análise</h2>
                            <pre className="whitespace-pre-wrap text-gray-300 font-sans text-base leading-relaxed">{analysisResult}</pre>
                        </div>
                    )}
                </main>
                 <footer className="text-center text-gray-600 mt-12 text-sm">
                    <p>Conselho Solar Unificado – Século XXVII</p>
                    <p className="italic mt-1">"A Lei é Fato. A Vida é Serenidade."</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
