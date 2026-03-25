'use client';

export default function Home() {
  const goToStripe = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dpa: '', ville: '', premierEnfant: true }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erreur : ' + JSON.stringify(data));
      }
    } catch (err) {
      alert('Erreur connexion : ' + err);
    }
  };

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
<div className="flex items-center gap-3">
  <a href="/login" className="text-[#9a8470] text-sm font-medium hover:text-[#3a3028] transition-all">Se connecter</a>
  <button onClick={goToStripe} className="bg-[#3a3028] text-[#f0e0cc] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#6b5c4e] transition-all">Commencer — 29,99€/an</button>
</div>
      </header>
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-6">Le guide du père</p>
            <h1 className="text-5xl font-bold text-[#3a3028] leading-tight mb-6" style={{fontFamily:'Georgia,serif'}}>
              Tout ce qu'on<br />ne t'a pas<br /><span className="text-[#c8a882]">appris.</span>
            </h1>
            <p className="text-[#6b5c4e] text-lg leading-relaxed mb-4 font-medium" style={{fontFamily:'Georgia,serif'}}>Papa, dès le premier jour.</p>
            <p className="text-[#9a8470] text-base leading-relaxed mb-10">De la première échographie au post-partum. Sois le meilleur soutien pour ta partenaire, sache ce qui est bon pour elle, et sois là au maximum.</p>
            <button onClick={goToStripe} className="bg-[#3a3028] text-[#f0e0cc] font-bold px-8 py-4 rounded-full hover:bg-[#6b5c4e] transition-all text-sm tracking-wide w-fit">Accès annuel — 29,99€/an</button>
          </div>
          <div className="w-full md:w-80 flex-shrink-0">
            <img src="/main.jpg" alt="Couple enceinte" className="w-full h-full min-h-[500px] object-cover rounded-3xl" style={{objectPosition:'center'}}/>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-[#e8ddd4] bg-white">
        <div className="max-w-2xl mx-auto px-6 py-8 grid grid-cols-4 gap-4">
          {[
            { chiffre: '41', label: 'semaines' },
            { chiffre: '6', label: 'modules' },
            { chiffre: 'Post', label: 'partum inclus' },
            { chiffre: '29,99', label: 'par an' },
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
          <div className="w-full md:w-64 flex-shrink-0">
            <img src="/deborde.jpg" alt="Pere et bebe" className="w-full h-full min-h-[420px] object-cover rounded-3xl" style={{objectPosition:'center top'}}/>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Le constat</p>
            <h2 className="text-3xl font-bold text-[#3a3028] mb-8" style={{fontFamily:'Georgia,serif'}}>
              Tout le monde prepare la maman.<br /><span className="text-[#9a8470]">Et toi ?</span>
            </h2>
            <div className="flex flex-col gap-4">
              {[
                "Les livres de grossesse sont ecrits pour les mamans.",
                "Personne ne t'explique ton role exact a la maternite.",
                "Le post-partum, personne n'en parle.",
                "Les premieres semaines avec bebe arrivent sans mode d'emploi.",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8a882] flex-shrink-0" />
                  <p className="text-[#6b5c4e] text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contenu" className="bg-white border-t border-[#e8ddd4]">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-4">Ce qui est inclus</p>
          <h2 className="text-3xl font-bold text-[#3a3028] mb-10" style={{fontFamily:'Georgia,serif'}}>6 modules pour etre vraiment la.</h2>
          <div className="flex flex-col gap-4">
            {[
              { titre: 'Calendrier des rendez-vous', desc: "Chaque consultation expliquee. Ton role precis. Personnalise a ta date." },
              { titre: 'Suivi bebe semaine par semaine', desc: "Taille, poids, developpement. Tu sais ou en est bebe a chaque instant." },
              { titre: 'Guide accouchement', desc: "Quand partir, ce que tu vas voir, comment soutenir." },
              { titre: 'Valise maternite', desc: "Checklist interactive complete. Pour toi, pour elle, pour bebe." },
              { titre: 'Post-partum decrypte', desc: "Baby blues, fatigue, couple. Comprendre ce qu'elle vit." },
              { titre: 'Idees pour ta partenaire', desc: "Une idee chaque mois pour lui faire plaisir." },
              { titre: 'Survie premier mois', desc: "Emmaillotage, pleurs, sommeil, biberon." },
              { titre: 'Liste achats prioritaires', desc: "Ce qui est vraiment necessaire, dans quel ordre, pour quel budget." },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-[#e8ddd4] hover:border-[#c8a882] transition-all bg-[#f8f5f0]">
                <div className="w-8 h-8 rounded-full bg-[#e8ddd4] flex items-center justify-center flex-shrink-0">
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
        <div className="border-l-2 border-[#c8a882] pl-6">
          <p className="text-2xl font-bold text-[#3a3028] leading-relaxed mb-3" style={{fontFamily:'Georgia,serif'}}>Papa, des le premier jour.</p>
          <p className="text-[#9a8470] text-sm leading-relaxed">Pas apres la naissance. Pas quand tu te sens pret. Maintenant, pendant la grossesse, avec les bons outils.</p>
        </div>
      </section>

      <section className="bg-[#3a3028]">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-[#c8a882] text-xs uppercase tracking-[4px] font-medium mb-8">L'offre</p>
          <div className="bg-[#f0e0cc] rounded-3xl p-8 max-w-sm mx-auto">
            <p className="text-[#6b5c4e] text-xs uppercase tracking-[3px] font-medium mb-3">Acces annuel complet</p>
            <p className="text-5xl font-bold text-[#3a3028] mb-1" style={{fontFamily:'Georgia,serif'}}>29,99</p>
            <p className="text-[#9a8470] text-sm mb-6">par an · sans engagement</p>
            <div className="flex flex-col gap-3 text-left mb-8">
              {[
                "6 modules complets",
                "De la grossesse au post-partum",
                "Idees mensuelles pour ta partenaire",
                "Personnalise a ta date d'accouchement",
                "Acces sur tous tes appareils",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#3a3028] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#f0e0cc] text-xs font-bold">✓</span>
                  </div>
                  <p className="text-[#3a3028] text-sm">{f}</p>
                </div>
              ))}
            </div>
            <button onClick={goToStripe} className="w-full bg-[#3a3028] hover:bg-[#6b5c4e] text-[#f0e0cc] font-bold px-8 py-4 rounded-full transition-all text-sm tracking-wide">Acces annuel complet — 29,99/an</button>
            <p className="text-[#9a8470] text-xs mt-4">Paiement securise par Stripe</p>
          </div>
        </div>
      </section>

      <footer className="max-w-2xl mx-auto px-6 py-8 text-center">
        <p className="text-[#c8b8a8] text-xs leading-relaxed">
          DadUp est un outil d'information. Il ne remplace pas l'avis d'un medecin. Aucune donnee personnelle n'est conservee.
        </p>
      </footer>

    </main>
  );
}
