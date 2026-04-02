"use client";
import { useState } from 'react';
import { gerarAbordagens } from './actions';

export default function Home() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  async function handleAction() {
    if (!texto.trim()) return;
    
    setLoading(true);
    const res = await gerarAbordagens(texto);
    
    if (res.error === "LIMIT_REACHED") {
      setShowPaywall(true);
    } else if (res.error) {
      alert(res.error);
    } else if (res.data) {
      setResultado(res.data);
    }
    setLoading(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultado);
    alert("Copiado para a área de transferência! 📋");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center py-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
            LeadGen Turbo 💰
          </h1>
          <p className="text-zinc-400 text-lg">Gere abordagens de elite em segundos.</p>
        </header>
        
        <div className="relative">
          <textarea 
            className="w-full h-56 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-700 text-lg"
            placeholder="Ex: João - CEO da TechX&#10;Maria - Gerente de Marketing"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>

        <button 
          onClick={handleAction}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-blue-900/30 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "IA Trabalhando..." : "Gerar Abordagens (Grátis)"}
        </button>

        {showPaywall && (
          <div className="p-6 bg-emerald-900/20 border-2 border-emerald-500/50 rounded-2xl text-center space-y-4 animate-bounce-in">
            <h3 className="text-2xl font-bold text-emerald-400">🚀 Quer processar mais de 3 leads?</h3>
            <p className="text-zinc-300">Libere o acesso ilimitado e escale suas vendas hoje mesmo por apenas **10 patacas**.</p>
            <a 
              href="https://wa.me/SEU_NUMERO" 
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-8 py-3 rounded-full font-black uppercase tracking-widest transition-colors"
            >
              Quero Acesso Pro
            </a>
          </div>
        )}

        {resultado && (
          <div className="mt-8 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl relative group">
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg text-xs font-bold text-zinc-400 transition-colors"
            >
              COPIAR TUDO
            </button>
            <h2 className="text-blue-400 font-bold mb-6 text-sm uppercase tracking-widest">Resultado do Llama-3:</h2>
            <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed text-lg">
              {resultado}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
