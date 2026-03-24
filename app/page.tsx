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
        <button onClick={() => setShowForm(true)} className="bg-[#3a3028] text-[#f0e0cc] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#6b5c4e] transition-all">Commencer — 19,99€/an</button>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-6">Le guide du père</p>
            <h1 className="text-5xl font-bold text-[#3a3028] leading-tight mb-6" style={{fontFamily:'Georgia,serif'}}>
              Papa,<br />dès le<br /><span className="text-[#c8a882]">premier jour.</span>
            </h1>
            <p className="text-[#6b5c4e] text-lg leading-relaxed mb-4 font-medium" style={{fontFamily:'Georgia,serif'}}>Tout ce qu'on ne t'a pas appris.</p>
            <p className="text-[#9a8470] text-base leading-relaxed mb-10">De la première échographie au post-partum. Sois le meilleur soutien pour ta partenaire, sache ce qui est bon pour elle, et sois là au maximum.</p>
            <button onClick={() => setShowForm(true)} className="bg-[#3a3028] text-[#f0e0cc] font-bold px-8 py-4 rounded-full hover:bg-[#6b5c4e] transition-all text-sm tracking-wide w-fit">Accès annuel — 19,99€/an</button>
            <p className="text-[#b0988a] text-xs mt-4">Premier mois gratuit. Sans engagement.</p>
          </div>
          <div className="flex-shrink-0 w-full md:w-72">
            <img src="/main.jpg" alt="Couple enceinte" className="w-full h-full min-h-[420px] object-cover rounded-3xl" style={{objectPosition:'center'}}/>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-[#e8ddd4] bg-white">
        <div className="max-w-2xl mx-auto px-6 py-8 grid grid-cols-4 gap-4">
          {[
            { chiffre: '41', label: 'semaines' },
            { chiffre: '6', label: 'modules' },
            { chiffre: 'Post', label: 'partum inclus' },
            { chiffre: '19,99€', label: 'par an' },
          ].map((s, i) => (
            <div key={s.label} className={`text-center ${i > 0 ? 'border-l border-[#e8ddd4]' : ''}`}>
              <p className="text-xl font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>{s.chiffre}</p>
              <p className="text-[#9a8470] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          <div className="flex-shrink-0 w-full md:w-64">
            <img src="/deborde.jpg" alt="Père et bébé" className="w-full h-full min-h-[420px] object-cover rounded-3xl" style={{objectPosition:'center top'}}/>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Le constat</p>
            <h2 className="text-3xl font-bold text-[#3a3028] mb-8" style={{fontFamily:'Georgia,serif'}}>
              Tout le monde prépare la maman.<br /><span className="text-[#9a8470]">Et toi ?</span>
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { text: "Les livres de grossesse sont écrits pour les mamans.", svg: <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#f0e8dc" stroke="#e8ddd4" strokeWidth="0.5"/><path d="M11 18 Q18 10 25 18" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="16" r="1.5" fill="#c8a882"/><circle cx="22" cy="16" r="1.5" fill="#c8a882"/></svg> },
                { text: "Personne ne t'explique ton rôle exact à la maternité.", svg: <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#f0e8dc" stroke="#e8ddd4" strokeWidth="0.5"/><path d="M12 22 L18 12 L24 22" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="24" r="1.5" fill="#c8a882"/></svg> },
                { text: "Le post-partum, personne n'en parle. Pour elle comme pour toi.", svg: <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#f0e8dc" stroke="#e8ddd4" strokeWidth="0.5"/><circle cx="18" cy="16" r="4" fill="none" stroke="#c8a882" strokeWidth="1.5"/><path d="M18 20 L18 25" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { text: "Les premières semaines avec bébé arrivent sans mode d'emploi.", svg: <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#f0e8dc" stroke="#e8ddd4" strokeWidth="0.5"/><path d="M13 18 L17 22 L23 14" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0">{item.svg}</div>
                  <p className="text-[#6b5c4e] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contenu" className="bg-white border-t border-[#e8ddd4]">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Ce que tu obtiens</p>
          <h2 className="text-3xl font-bold text-[#3a3028] mb-10" style={{fontFamily:'Georgia,serif'}}>Tout ce qu'on ne t'a pas appris.</h2>
          <div className="flex flex-col gap-4">
            {[
              { titre: 'Calendrier des rendez-vous', desc: "Chaque consultation expliquée. Ton rôle précis. Personnalisé à ta date d'accouchement.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><rect x="10" y="8" width="20" height="24" rx="3" fill="none" stroke="#6b5c4e" strokeWidth="1.5"/><line x1="14" y1="14" x2="26" y2="14" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/><line x1="14" y1="18" x2="26" y2="18" stroke="#c8a882" strokeWidth="1" strokeLinecap="round"/><line x1="14" y1="22" x2="22" y2="22" stroke="#c8a882" strokeWidth="1" strokeLinecap="round"/></svg> },
              { titre: 'Suivi bébé semaine par semaine', desc: "Taille, poids, développement. Tu sais où en est bébé à chaque instant.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><circle cx="20" cy="18" r="8" fill="none" stroke="#6b5c4e" strokeWidth="1.5"/><circle cx="20" cy="18" r="3" fill="#c8a882"/><path d="M20 10 L20 6 M20 30 L20 34 M10 18 L6 18 M30 18 L34 18" stroke="#c8a882" strokeWidth="1" strokeLinecap="round"/></svg> },
              { titre: 'Guide accouchement', desc: "Quand partir, ce que tu vas voir, comment soutenir sans être dans le chemin.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><path d="M14 28 Q14 20 20 16 Q26 20 26 28" fill="none" stroke="#6b5c4e" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20" cy="13" r="3" fill="none" stroke="#c8a882" strokeWidth="1.5"/><line x1="14" y1="28" x2="26" y2="28" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/></svg> },
              { titre: 'Valise maternité', desc: "Checklist interactive complète. Pour toi, pour elle, pour bébé. Rien n'est oublié.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><rect x="12" y="14" width="16" height="18" rx="3" fill="none" stroke="#6b5c4e" strokeWidth="1.5"/><path d="M16 14 L16 11 Q20 8 24 11 L24 14" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="20" x2="24" y2="20" stroke="#c8a882" strokeWidth="1" strokeLinecap="round"/></svg> },
              { titre: 'Post-partum décrypté', desc: "Baby blues, fatigue, couple. Comprendre ce qu'elle vit pour mieux l'accompagner.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><circle cx="20" cy="20" r="7" fill="none" stroke="#6b5c4e" strokeWidth="1.5"/><circle cx="17" cy="19" r="1" fill="#c8a882"/><circle cx="23" cy="19" r="1" fill="#c8a882"/><path d="M17 23 Q20 26 23 23" fill="none" stroke="#c8a882" strokeWidth="1" strokeLinecap="round"/></svg> },
              { titre: 'Idées pour ta partenaire', desc: "Une idée chaque mois pour lui faire plaisir. Des attentions simples qui comptent vraiment.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><path d="M20 30 L12 22 Q9 15 16 13 Q20 12 20 18 Q20 12 24 13 Q31 15 28 22 Z" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
              { titre: 'Survie premier mois', desc: "Emmaillotage, pleurs, sommeil, biberon. Les techniques qui marchent vraiment.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><circle cx="20" cy="16" r="5" fill="none" stroke="#6b5c4e" strokeWidth="1.5"/><path d="M14 30 Q14 22 20 22 Q26 22 26 30" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/></svg> },
              { titre: 'Liste achats prioritaires', desc: "Ce qui est vraiment nécessaire, dans quel ordre l'acheter, et pour quel budget.", svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#e8ddd4"/><circle cx="14" cy="14" r="2" fill="#c8a882"/><line x1="19" y1="14" x2="30" y2="14" stroke="#6b5c4e" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="20" r="2" fill="#c8a882"/><line x1="19" y1="20" x2="30" y2="20" stroke="#6b5c4e" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="26" r="2" fill="#c8a882"/><line x1="19" y1="26" x2="30" y2="26" stroke="#6b5c4e" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-[#e8ddd4] hover:border-[#c8a882] transition-all bg-[#f8f5f0]">
                <div className="flex-shrink-0">{m.svg}</div>
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
        <div className="border-l-2 border-[#c8a882] pl-6">
          <p className="text-2xl font-bold text-[#3a3028] leading-relaxed mb-3" style={{fontFamily:'Georgia,serif'}}>Papa, dès le premier jour.</p>
          <p className="text-[#9a8470] text-sm leading-relaxed">Pas après la naissance. Pas quand tu te sens prêt.<br />Maintenant, pendant la grossesse, avec les bons outils.</p>
        </div>
      </section>

      <section className="bg-[#3a3028]">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">L'offre</p>
          <h2 className="text-3xl font-bold text-[#f0e0cc] mb-2" style={{fontFamily:'Georgia,serif'}}>Accès annuel complet</h2>
          <p className="text-4xl font-bold text-[#c8a882] mb-1" style={{fontFamily:'Georgia,serif'}}>19,99€<span className="text-lg text-[#6b5c4e]">/an</span></p>
          <p className="text-[#6b5c4e] text-sm mb-8">Premier mois gratuit. Sans engagement. Résiliable à tout moment.</p>
          <div className="flex flex-col gap-3 text-left max-w-xs mx-auto mb-10">
            {[
              "6 modules complets",
              "De la grossesse au post-partum",
              "Idées mensuelles pour ta partenaire",
              "Personnalisé à ta date d'accouchement",
              "Accès sur tous tes appareils",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#c8a882] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#3a3028] text-xs font-bold">✓</span>
                </div>
                <p className="text-[#e8d5c4] text-sm">{f}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowForm(true)} className="bg-[#c8a882] hover:bg-[#b89060] text-[#1c1510] font-bold px-10 py-4 rounded-full transition-all text-sm tracking-wide">Commencer maintenant — 19,99€/an</button>
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
