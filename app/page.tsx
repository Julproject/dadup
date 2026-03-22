'use client';

import DadUpForm from '@/components/DadUpForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f0] relative overflow-hidden">

      {/* Fond doux */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c8a882]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#9a8470]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 py-12">

        {/* Logo SVG */}
        <div className="flex flex-col items-center mb-10">
          <svg viewBox="0 0 300 300" width="160" height="160">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
            <path id="arc" d="M 58,210 A 122,122 0 0,0 242,210" fill="none"/>
            <text fontFamily="Georgia,serif" fontSize="16" fill="#f0e0cc" letterSpacing="10" fontWeight="700">
              <textPath href="#arc" startOffset="50%" textAnchor="middle">DADUP</textPath>
            </text>
          </svg>
          <p className="text-[#9a8470] text-xs tracking-[6px] uppercase mt-2">Le guide du père</p>
        </div>

        {/* Accroche */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#3a3028] leading-tight mb-3">
            Prêt pour le<br />
            <span className="text-[#c8a882]">grand jour ?</span>
          </h1>
          <p className="text-[#9a8470] text-base leading-relaxed">
            Ton guide de grossesse personnalisé.<br />
            Semaine par semaine, à tes côtés.
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Zéro inscription', '100% anonyme', 'Temps réel'].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-[#9a8470]">
              <div className="w-4 h-4 rounded-full bg-[#c8a882]/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c8a882]" />
              </div>
              {item}
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <DadUpForm />

        {/* Contenu */}
        <div className="mt-10">
          <p className="text-center text-[#b0988a] text-xs uppercase tracking-widest mb-5 font-medium">
            Ce que tu vas découvrir
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📅', label: 'Calendrier RDV', desc: 'Personnalisé à ta DPA' },
              { icon: '👶', label: 'Taille bébé', desc: 'Semaine par semaine' },
              { icon: '🏥', label: 'Guide accouchement', desc: 'Ton rôle précis' },
              { icon: '🧳', label: 'Valise maternité', desc: '12 essentiels' },
              { icon: '🍼', label: 'Survie 1er mois', desc: 'Techniques pratiques' },
              { icon: '🛒', label: 'Liste achats', desc: 'Priorités et budget' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-[#e8ddd4] hover:border-[#c8a882] transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-[#3a3028] text-sm font-semibold">{item.label}</p>
                  <p className="text-[#b0988a] text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#c8b8a8] text-xs mt-8 leading-relaxed">
          ⚕️ Document informatif uniquement. Consultez toujours votre médecin.<br />
          Aucune donnée personnelle n'est conservée.
        </p>

      </div>
    </main>
  );
}
