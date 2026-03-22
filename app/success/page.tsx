'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
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

  return (
    <main className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="max-w-md w-full">

        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 300 300" width="80" height="80">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
          </svg>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#e8ddd4] shadow-sm text-center">

          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f0e8dc] border-2 border-[#c8a882] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#c8a882]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-[#3a3028] mb-2">
            Paiement ok ! 🎉
          </h1>
          <p className="text-[#9a8470] text-sm mb-6">
            {downloaded ? 'Ton PDF est en cours de telechargement.' : 'Ton guide personnalise est pret.'}
          </p>

          <div className="bg-[#f8f5f0] rounded-2xl p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-sm" style={{color:'#9a8470'}}>Ville</span>
              <span className="text-sm font-semibold" style={{color:'#3a3028'}}>{ville}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{color:'#9a8470'}}>Date prevue</span>
              <span className="text-sm font-semibold" style={{color:'#3a3028'}}>
                {dpa ? new Date(dpa).toLocaleDateString('fr-FR') : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{color:'#9a8470'}}>Premier enfant</span>
              <span className="text-sm font-semibold" style={{color:'#3a3028'}}>
                {premier === 'true' ? 'Oui' : 'Non'}
              </span>
            </div>
          </div>

          <button
            onClick={downloadPDF}
            disabled={loading}
            className="w-full font-bold py-4 rounded-2xl transition-all text-sm mb-3 disabled:opacity-50"
            style={{background:'#3a3028', color:'#f0e0cc'}}
          >
            {loading ? 'Generation...' : 'Telecharger mon guide PDF'}
          </button>

          
            href={`/timeline?dpa=${dpa}`}
            className="w-full block font-semibold py-4 rounded-2xl transition-all text-sm text-center mb-3"
            style={{background:'#f0e8dc', color:'#6b5c4e'}}
          >
            Voir ma timeline de grossesse
          </a>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full text-sm transition-colors"
            style={{color:'#b0988a'}}
          >
            Retour accueil
          </button>

        </div>

        <p className="text-center text-xs mt-6" style={{color:'#c8b8a8'}}>
          Document informatif uniquement. Consultez votre medecin.
        </p>

      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
        <p style={{color:'#9a8470'}}>Chargement...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
