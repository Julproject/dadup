'use client';

import { useState } from 'react';
import DadUpForm from '@/components/DadUpForm';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8f5f0]">

      <header className="bg-white border-b border-[#e8ddd4] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 300 300" width="36" height="36">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
          </svg>
          <span className="font-bold text-[#3a3028] text-lg" style={{fontFamily:'Georgia,serif'}}>DadUp</span>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#3a3028] text-[#f0e0cc] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#6b5c4e] transition-all">Commencer — 19,99€</button>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-16 pb-12">
        <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-6">Le guide du père</p>
        <h1 className="text-5xl font-bold text-[#3a3028] leading-tight mb-6" style={{fontFamily:'Georgia,serif'}}>
          Papa,<br />dès le<br /><span className="text-[#c8a882]">premier jour.</span>
        </h1>
        <p className="text-[#6b5c4e] text-lg leading-relaxed mb-4 font-medium" style={{fontFamily:'Georgia,serif'}}>Tout ce qu'on ne t'a pas appris.</p>
        <p className="text-[#9a8470] text-base leading-relaxed mb-10">De la première échographie au premier mois de vie. Un espace complet, personnalisé à ta date d'accouchement, conçu pour toi.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setShowForm(true)} className="bg-[#3a3028] text-[#f0e0cc] font-bold px-8 py-4 rounded-full hover:bg-[#6b5c4e] transition-all text-sm tracking-wide">Accès à vie — 19,99€</button>
          <a href="#contenu" className="border border-[#e8ddd4] text-[#9a8470] font-medium px-8 py-4 rounded-full hover:border-[#c8a882] transition-all text-sm text-center">Voir le contenu</a>
        </div>
        <p className="text-[#b0988a] text-xs mt-4">Accès immédiat. Paiement unique. Aucun abonnement.</p>
      </section>

      <section className="border-t border-b border-[#e8ddd4] bg-white">
        <div className="max-w-2xl mx-auto px-6 py-8 grid grid-cols-3 gap-4">
          {[
            { chiffre: '40', label: 'semaines couvertes' },
            { chiffre: '6', label: 'modules complets' },
            { chiffre: '19,99€', label: 'accès à vie' },
          ].map((s, i) => (
            <div key={s.label} className={`text-center ${i === 1 ? 'border-x border-[#e8ddd4]' : ''}`}>
              <p className="text-2xl font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>{s.chiffre}</p>
              <p className="text-[#9a8470] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Le constat</p>
        <h2 className="text-3xl font-bold text-[#3a3028] mb-8" style={{fontFamily:'Georgia,serif'}}>
          Tout le monde prépare la maman.<br /><span className="text-[#9a8470]">Et toi ?</span>
        </h2>
        <div className="space-y-4">
          {[
            "Les livres de grossesse sont écrits pour les mamans.",
            "Personne ne t'explique ton rôle exact à la maternité.",
            "Tu ne sais pas à quoi t'attendre, ni quand t'inquiéter.",
            "Les premières semaines avec bébé arrivent sans mode d'emploi.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c8a882] mt-2.5 flex-shrink-0" />
              <p className="text-[#6b5c4e] text-base">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contenu" className="bg-white border-t border-[#e8ddd4]">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Ce que tu obtiens</p>
          <h2 className="text-3xl font-bold text-[#3a3028] mb-10" style={{fontFamily:'Georgia,serif'}}>Tout ce qu'on ne t'a pas appris.</h2>
          <div className="space-y-4">
            {[
              { titre: 'Calendrier des rendez-vous', desc: "Chaque consultation expliquée. Ce qui se passe, ce qu'on cherche, ton rôle précis. Personnalisé à ta date d'accouchement." },
              { titre: 'Suivi bébé semaine par semaine', desc: "Taille, poids, développement. Tu sais exactement où en est bébé à chaque instant." },
              { titre: 'Guide accouchement', desc: "Quand partir à la maternité. Ce que tu vas voir. Comment soutenir sans être dans le chemin." },
              { titre: 'Valise maternité', desc: "Checklist interactive complète. Pour toi, pour elle, pour bébé. Rien n'est oublié." },
              { titre: 'Survie premier mois', desc: "Emmaillotage, pleurs, sommeil, biberon. Les techniques qui marchent vraiment." },
              { titre: 'Liste achats prioritaires', desc: "Ce qui est vraiment nécessaire, dans quel ordre l'acheter, et pour quel budget." },
            ].map((m, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-[#e8ddd4] hover:border-[#c8a882] transition-all bg-[#f8f5f0]">
                <div className="w-8 h-8 rounded-full bg-[#e8ddd4] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#6b5c4e] text-sm font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[#3a3028] font-bold text-sm mb-1">{m.titre}</p>
                  <p className="text-[#9a8470] text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <blockquote className="border-l-2 border-[#c8a882] pl-6">
          <p className="text-2xl font-bold text-[#3a3028] leading-relaxed" style={{fontFamily:'Georgia,serif'}}>"Papa, dès le premier jour."</p>
          <p className="text-[#9a8470] text-sm mt-3">Pas après la naissance. Pas quand tu te sens prêt. Maintenant, pendant la grossesse, avec les bons outils.</p>
        </blockquote>
      </section>

      <section className="bg-[#3a3028]">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">L'offre</p>
          <h2 className="text-3xl font-bold text-[#f0e0cc] mb-3" style={{fontFamily:'Georgia,serif'}}>Accès complet à vie</h2>
          <p className="text-[#9a8470] text-4xl font-bold mb-2" style={{fontFamily:'Georgia,serif'}}>19,99€</p>
          <p className="text-[#6b5c4e] text-sm mb-8">Paiement unique. Aucun abonnement. Accès immédiat.</p>
          <div className="space-y-3 text-left max-w-sm mx-auto mb-10">
            {[
              "6 modules complets",
              "Personnalisé à ta date d'accouchement",
              "Mis à jour en temps réel",
              "Accès sur tous tes appareils",
              "De la grossesse au premier mois",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#c8a882] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#3a3028] text-xs font-bold">✓</span>
                </div>
                <p className="text-[#e8d5c4] text-sm">{f}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowForm(true)} className="bg-[#c8a882] hover:bg-[#b89060] text-[#1c1510] font-bold px-10 py-4 rounded-full transition-all text-sm tracking-wide">Commencer maintenant — 19,99€</button>
          <p className="text-[#4a3c30] text-xs mt-4">Paiement sécurisé par Stripe</p>
        </div>
      </section>

      <footer className="max-w-2xl mx-auto px-6 py-8 text-center">
        <p className="text-[#c8b8a8] text-xs leading-relaxed">
          DadUp est un outil d'information et d'accompagnement. Il ne remplace pas l'avis d'un médecin ou d'une sage-femme. Aucune donnée personnelle n'est conservée.
        </p>
      </footer>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>Ton espace DadUp</h3>
              <button onClick={() => setShowForm(false)} className="text-[#9a8470] hover:text-[#3a3028] text-xl">✕</button>
            </div>
            <DadUpForm />
          </div>
        </div>
      )}

    </main>
  );
}
