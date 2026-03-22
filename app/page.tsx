'use client';

import DadUpForm from '@/components/DadUpForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] relative overflow-hidden">

      {/* Effets de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1E3A8A]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-[#1E3A8A]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(248,250,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/30 border border-[#1E3A8A]/50 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase">👶 DadUp</span>
          </div>

          <h1 className="text-5xl font-black text-[#F8FAFC] leading-tight mb-4 tracking-tight">
            Prêt pour le<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
              grand jour ?
            </span>
          </h1>

          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-md mx-auto">
            Ta checklist PDF premium personnalisée.<br />
            <span className="text-[#F8FAFC] font-medium">15 pages. Générée en 10 secondes.</span>
          </p>

          {/* Preuves sociales */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { label: 'Zéro inscription' },
              { label: '100% anonyme' },
              { label: 'PDF immédiat' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-[#64748B]">
                <svg className="w-4 h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <DadUpForm />

        {/* Contenu du PDF */}
        <div className="mt-12">
          <p className="text-center text-[#475569] text-xs uppercase tracking-widest mb-6 font-semibold">
            Ce que contient ton PDF
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🧳', label: 'Valise maternité', desc: '12 items essentiels' },
              { icon: '📅', label: 'Calendrier RDV', desc: 'Personnalisé à ta DPA' },
              { icon: '👶', label: 'Taille bébé', desc: 'Semaine par semaine' },
              { icon: '🛒', label: 'Liste achats', desc: 'Liens Amazon directs' },
              { icon: '🏥', label: 'Guide accouchement', desc: 'Ton rôle précis' },
              { icon: '🍼', label: 'Survie 1er mois', desc: 'Emmaillotage & pleurs' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#111827]/60 border border-[#1E293B] hover:border-[#1E3A8A]/50 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-[#F8FAFC] text-sm font-semibold">{item.label}</p>
                  <p className="text-[#475569] text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#334155] text-xs mt-10 leading-relaxed">
          ⚕️ Document informatif uniquement. Consultez toujours votre médecin ou sage-femme.<br />
          Aucune donnée personnelle n'est conservée.
        </p>

      </div>
    </main>
  );
}
