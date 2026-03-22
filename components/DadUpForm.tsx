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

  return (
    <div className="bg-[#111827]/80 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-sm">

      {/* Prix */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#F8FAFC] text-xl font-bold">Génère ton PDF</h2>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-[#F8FAFC]">9,99€</span>
          <span className="text-[#475569] text-sm">une fois</span>
        </div>
      </div>

      <div className="space-y-6">

        {/* DPA */}
        <div>
          <label className="block text-[#94A3B8] text-sm font-medium mb-2">
            📅 Date prévue d'accouchement
          </label>
          <input
            type="date"
            value={formData.dpa}
            onChange={(e) => setFormData({ ...formData, dpa: e.target.value })}
            className="w-full bg-[#0A0F1E] border border-[#1E293B] rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
          {errors.dpa && <p className="text-red-400 text-xs mt-1">{errors.dpa}</p>}
        </div>

        {/* Ville */}
        <div>
          <label className="block text-[#94A3B8] text-sm font-medium mb-2">
            📍 Ta ville
          </label>
          <input
            type="text"
            placeholder="Paris, Lyon, Marseille..."
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
            className="w-full bg-[#0A0F1E] border border-[#1E293B] rounded-xl px-4 py-3 text-[#F8FAFC] placeholder-[#374151] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
          {errors.ville && <p className="text-red-400 text-xs mt-1">{errors.ville}</p>}
        </div>

        {/* Premier enfant */}
        <div>
          <label className="block text-[#94A3B8] text-sm font-medium mb-3">
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
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.premierEnfant === option.value
                    ? 'bg-[#1E3A8A] border-[#3B82F6] text-[#F8FAFC]'
                    : 'bg-[#0A0F1E] border-[#1E293B] text-[#64748B] hover:border-[#1E3A8A]'
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
          className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1e40af] hover:to-[#2563eb] text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Redirection paiement...
            </span>
          ) : (
            '🚀 Générer mon PDF — 9,99€'
          )}
        </button>

        {/* Sécurité */}
        <p className="text-center text-[#334155] text-xs">
          🔒 Paiement sécurisé par Stripe · PDF téléchargeable immédiatement
        </p>

      </div>
    </div>
  );
}
