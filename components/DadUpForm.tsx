'use client';

import { useState } from 'react';

interface FormData {
  dpa: string;
  ville: string;
  premierEnfant: boolean | null;
}

export default function DadUpForm() {
  const [formData, setFormData] = useState<FormData>({
    dpa: '',
    ville: '',
    premierEnfant: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.dpa) newErrors.dpa = 'La date est requise';
    if (!formData.ville || formData.ville.length < 2) newErrors.ville = 'La ville est requise';
    if (formData.premierEnfant === null) newErrors.premierEnfant = 'Répondez à cette question';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSemaines = () => {
    if (!formData.dpa) return null;
    const today = new Date();
    const dpa = new Date(formData.dpa);
    const conception = new Date(dpa.getTime() - 40 * 7 * 24 * 60 * 60 * 1000);
    const diff = today.getTime() - conception.getTime();
    return Math.max(1, Math.min(42, Math.floor(diff / (7 * 24 * 60 * 60 * 1000))));
  };

  const getFruit = (sa: number) => {
    if (sa <= 8) return { nom: 'myrtille', emoji: '🫐' };
    if (sa <= 10) return { nom: 'fraise', emoji: '🍓' };
    if (sa <= 12) return { nom: 'citron', emoji: '🍋' };
    if (sa <= 16) return { nom: 'avocat', emoji: '🥑' };
    if (sa <= 20) return { nom: 'banane', emoji: '🍌' };
    if (sa <= 24) return { nom: 'épi de maïs', emoji: '🌽' };
    if (sa <= 28) return { nom: 'aubergine', emoji: '🍆' };
    if (sa <= 32) return { nom: 'mangue', emoji: '🥭' };
    if (sa <= 36) return { nom: 'melon', emoji: '🍈' };
    return { nom: 'pastèque', emoji: '🍉' };
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sa = getSemaines();
  const fruit = sa ? getFruit(sa) : null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e8ddd4] shadow-sm">

      {/* Preview bébé si DPA remplie */}
      {sa && fruit && (
        <div className="bg-[#f8f5f0] rounded-2xl p-4 mb-6 flex items-center gap-4">
          <span className="text-4xl">{fruit.emoji}</span>
          <div>
            <p className="text-[#3a3028] font-semibold text-sm">Semaine {sa} — bébé a la taille d'une {fruit.nom}</p>
            <p className="text-[#b0988a] text-xs mt-0.5">
              {40 - sa > 0 ? `Il reste ${40 - sa} semaines avant le grand jour` : '🎉 C\'est le moment !'}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-5">

        {/* DPA */}
        <div>
          <label className="block text-[#6b5c4e] text-sm font-semibold mb-2">
            📅 Date prévue d'accouchement
          </label>
          <input
            type="date"
            value={formData.dpa}
            onChange={(e) => setFormData({ ...formData, dpa: e.target.value })}
            className="w-full bg-[#f8f5f0] border border-[#e8ddd4] rounded-2xl px-4 py-3 text-[#3a3028] focus:outline-none focus:border-[#c8a882] transition-colors text-sm"
          />
          {errors.dpa && <p className="text-red-400 text-xs mt-1">{errors.dpa}</p>}
        </div>

        {/* Ville */}
        <div>
          <label className="block text-[#6b5c4e] text-sm font-semibold mb-2">
            📍 Ta ville
          </label>
          <input
            type="text"
            placeholder="Paris, Lyon, Marseille..."
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
            className="w-full bg-[#f8f5f0] border border-[#e8ddd4] rounded-2xl px-4 py-3 text-[#3a3028] placeholder-[#c8b8a8] focus:outline-none focus:border-[#c8a882] transition-colors text-sm"
          />
          {errors.ville && <p className="text-red-400 text-xs mt-1">{errors.ville}</p>}
        </div>

        {/* Premier enfant */}
        <div>
          <label className="block text-[#6b5c4e] text-sm font-semibold mb-2">
            👶 C'est ton premier enfant ?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: '✅ Oui, premier' },
              { value: false, label: '💪 Non, j\'ai l\'habitude' },
            ].map((option) => (
              <button
                key={String(option.value)}
                onClick={() => setFormData({ ...formData, premierEnfant: option.value })}
                className={`p-3 rounded-2xl border text-sm font-medium transition-all ${
                  formData.premierEnfant === option.value
                    ? 'bg-[#c8a882] border-[#c8a882] text-white'
                    : 'bg-[#f8f5f0] border-[#e8ddd4] text-[#9a8470] hover:border-[#c8a882]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.premierEnfant && <p className="text-red-400 text-xs mt-1">{errors.premierEnfant}</p>}
        </div>

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#3a3028] hover:bg-[#6b5c4e] text-[#f0e0cc] font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 text-sm tracking-wide"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Chargement...
            </span>
          ) : (
            '🚀 Voir mon guide personnalisé — 9,99€'
          )}
        </button>

        <p className="text-center text-[#c8b8a8] text-xs">
          🔒 Paiement sécurisé par Stripe
        </p>

      </div>
    </div>
  );
}
