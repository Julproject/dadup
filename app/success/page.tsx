'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const dpa = searchParams.get('dpa') || '';
  const ville = searchParams.get('ville') || '';
  const premier = searchParams.get('premier') || 'true';

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dpa, ville, premierEnfant: premier }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dadup-checklist.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dpa && ville) downloadPDF();
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">

      {/* Effets de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1E3A8A]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">

        {loading ? (
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#1E3A8A]/30 border border-[#1E3A8A] flex items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-[#3B82F6]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#F8FAFC]">
              Génération en cours...
            </h1>
            <p className="text-[#64748B]">
              On prépare tes 15 pages personnalisées 🚀
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Icône succès */}
            <div className="w-20 h-20 mx-auto rounded-full bg-[#22C55E]/20 border border-[#22C55E]/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-black text-[#F8FAFC]">
              Ton PDF est prêt ! 🎉
            </h1>

            <p className="text-[#64748B]">
              {downloaded
                ? 'Téléchargement lancé ! Vérifie tes téléchargements.'
                : 'Clique ci-dessous pour télécharger ton PDF.'}
            </p>

            {/* Récap */}
            <div className="bg-[#111827]/80 border border-[#1E293B] rounded-2xl p-6 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-[#64748B] text-sm">Ville</span>
                <span className="text-[#F8FAFC] text-sm font-semibold">{ville}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B] text-sm">DPA</span>
                <span className="text-[#F8FAFC] text-sm font-semibold">
                  {new Date(dpa).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B] text-sm">Premier enfant</span>
                <span className="text-[#F8FAFC] text-sm font-semibold">
                  {premier === 'true' ? 'Oui' : 'Non'}
                </span>
              </div>
            </div>

            {/* Bouton téléchargement */}
            <button
              onClick={downloadPDF}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16a34a] hover:to-[#15803d] text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] text-lg"
            >
              📥 Télécharger mon PDF
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full text-[#475569] text-sm hover:text-[#94A3B8] transition-colors"
            >
              ← Retour à l'accueil
            </button>

          </div>
        )}
      </div>
    </main>
  );
}
