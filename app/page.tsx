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

      {/* HERO avec image */}
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-6">Le guide du père</p>
            <h1 className="text-5xl font-bold text-[#3a3028] leading-tight mb-6" style={{fontFamily:'Georgia,serif'}}>
              Papa,<br />dès le<br /><span className="text-[#c8a882]">premier jour.</span>
            </h1>
            <p className="text-[#6b5c4e] text-lg leading-relaxed mb-4 font-medium" style={{fontFamily:'Georgia,serif'}}>Tout ce qu'on ne t'a pas appris.</p>
            <p className="text-[#9a8470] text-base leading-relaxed mb-10">De la première échographie au post-partum. Sois le meilleur soutien pour ta partenaire, sache ce qui est bon pour elle, et sois là au maximum.</p>
            <button onClick={() => setShowForm(true)} className="bg-[#3a3028] text-[#f0e0cc] font-bold px-8 py-4 rounded-full hover:bg-[#6b5c4e] transition-all text-sm tracking-wide">Accès annuel — 19,99€/an</button>
            <p className="text-[#b0988a] text-xs mt-4">Premier mois gratuit. Sans engagement.</p>
          </div>
          <div className="flex-shrink-0 w-full md:w-72">
            <img src="/main.jpg" alt="Couple enceinte" className="w-full h-80 object-cover rounded-3xl" style={{objectPosition:'center'}}/>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* CONSTAT avec image */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-shrink-0 w-full md:w-64">
            <img src="/deborde.jpg" alt="Père et bébé" className="w-full h-72 object-cover rounded-3xl" style={{objectPosition:'center top'}}/>
          </div>
          <div className="flex-1">
            <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Le constat</p>
            <h2 className="text-3xl font-bold text-[#3a3028] mb-8" style={{fontFamily:'Georgia,serif'}}>
              Tout le monde prépare la maman.<br /><span className="text-[#9a8470]">Et toi ?</span>
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { text: "Les livres de grossesse sont écrits pour les mamans.", svg: <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#f0e8dc" stroke="#e8ddd4" strokeWidth="0.5"/><path d="M11 18 Q18 10 25 18" fill="none" stroke="#c8a882" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="16" r="1.5" fill="#c8a882"/><circle cx="22" cy="16" r="1.5" fill="#c8a882"/></svg> },
                { text: "Personne ne t'explique ton rôle exact à la maternité.", svg: <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill
