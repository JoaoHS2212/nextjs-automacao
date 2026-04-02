"use client";
import { useState } from 'react';
import { gerarAbordagens } from './actions';

export default function Home() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAction() {
    if (!texto.trim()) return alert("Cole algum lead primeiro!");
    setLoading(true);
    const res = await gerarAbordagens(texto);
    if (res.error) alert(res.error);
    if (res.data) setResultado(res.data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-500 tracking-tight">LeadGen Turbo 💰</h1>
          <p className="text-zinc-400">Transforme nomes em abordagens de vendas imbatíveis.</p>
        </header>
        
        <textarea 
          className="w-full h-48 bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-700"
          placeholder="Ex: João - CEO da TechX&#10;Maria - Gerente de RH"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button 
          onClick={handleAction}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50"
        >
          {loading ? "IA Trabalhando..." : "Gerar Abordagens (Grátis)"}
        </button>

        {resultado && (
          <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-inner animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wider">Sugestões da IA:</h2>
            <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed italic">
              {resultado}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
