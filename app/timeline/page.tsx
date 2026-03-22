'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface RDV {
  sa: number;
  titre: string;
  description: string;
  emoji: string;
  obligatoire: boolean;
}

const RDV_LIST: RDV[] = [
  { sa: 8, titre: 'Première consultation', description: 'Confirmation de grossesse, prise de sang, calcul DPA. Ton rôle : être là, prendre des notes, poser des questions.', emoji: '🏥', obligatoire: true },
  { sa: 10, titre: 'Dépistage trisomie 21', description: 'Prise de sang combinée avec l\'écho T1. Résultats sous 2 semaines. Sois présent pour le soutien émotionnel.', emoji: '🧬', obligatoire: true },
  { sa: 12, titre: 'Échographie T1', description: 'Premier visage de bébé ! Mesure clarté nucale, vérification cœur qui bat. Apporte ton téléphone pour filmer.', emoji: '🔬', obligatoire: true },
  { sa: 16, titre: 'Consultation mensuelle', description: 'Suivi tension, poids, hauteur utérine. Bonne occasion de poser vos questions sur la préparation.', emoji: '📋', obligatoire: false },
  { sa: 20, titre: 'Congé maternité — déclaration', description: 'Déclarer la grossesse à la CPAM et l\'employeur avant 15 SA. À faire ensemble dès maintenant.', emoji: '📝', obligatoire: true },
  { sa: 22, titre: 'Échographie T2 — morphologique', description: 'L\'écho la plus importante. On voit tout : organes, membres, visage. Durée 45min. Prépare tes questions.', emoji: '👶', obligatoire: true },
  { sa: 25, titre: 'Test diabète gestationnel', description: 'Test Hyperglycémie Provoquée Orale (HGPO). 3 prises de sang en 2h. Accompagne-la, c\'est long.', emoji: '🩸', obligatoire: false },
  { sa: 28, titre: 'Début T3 — consultation', description: 'Vaccin coqueluche recommandé pour le papa. Parler du projet de naissance avec la sage-femme.', emoji: '💉', obligatoire: false },
  { sa: 32, titre: 'Échographie T3 — croissance', description: 'Vérification position bébé, poids estimé, placenta. Si bébé est en siège, on en parle maintenant.', emoji: '📏', obligatoire: true },
  { sa: 34, titre: 'Préparation accouchement', description: '3 à 8 séances remboursées avec sage-femme. Les cours pour papas existent ! Demande-les explicitement.', emoji: '🎓', obligatoire: false },
  { sa: 36, titre: 'Entretien prénatal', description: 'Bilan global, projet de naissance, organisation post-naissance. Viens absolument — c\'est fait pour les deux.', emoji: '💬', obligatoire: true },
  { sa: 38, titre: 'Valise à préparer', description: 'Prépare la valise maternité maintenant. Checklist : documents, vêtements, chargeurs, snacks pour toi.', emoji: '🧳', obligatoire: false },
  { sa: 39, titre: 'Consultation pré-accouchement', description: 'Dernière ligne droite. Vérification col, position bébé. Garder le téléphone allumé jour et nuit.', emoji: '⏰', obligatoire: false },
  { sa: 40, titre: '🎉 Jour J — DPA', description: 'C\'est le moment ! Contractions toutes les 5min pendant 1h, perte des eaux ou saignements = direction maternité.', emoji: '🎉', obligatoire: true },
];

function TimelineContent() {
  const searchParams = useSearchParams();
  const [dpa, setDpa] = useState(searchParams.get('dpa') || '');
  const [saActuelle, setSaActuelle] = useState<number | null>(null);
  const [rdvOuvert, setRdvOuvert] = useState<number | null>(null);

  useEffect(() => {
    if (!dpa) return;
    const dpaDate = new Date(dpa);
    const conception = new Date(dpaDate.getTime() - 40 * 7 * 24 * 60 * 60 * 1000);
    const diff = new Date().getTime() - conception.getTime();
    const sa = Math.max(1, Math.min(42, Math.floor(diff / (7 * 24 * 60 * 60 * 1000))));
    setSaActuelle(sa);
  }, [dpa]);

  const getStatut = (rdv: RDV) => {
    if (!saActuelle) return 'futur';
    if (rdv.sa < saActuelle) return 'passé';
    if (rdv.sa === saActuelle || (rdv.sa >= saActuelle && rdv.sa <= saActuelle + 2)) return 'prochain';
    return 'futur';
  };

  const getFruit = (sa: number) => {
    if (sa <= 8) return '🫐';
    if (sa <= 10) return '🍓';
    if (sa <= 12) return '🍋';
    if (sa <= 16) return '🥑';
    if (sa <= 20) return '🍌';
    if (sa <= 24) return '🌽';
    if (sa <= 28) return '🍆';
    if (sa <= 32) return '🥭';
    if (sa <= 36) return '🍈';
    return '🍉';
  };

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <div className="max-w-xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <a href="/" className="text-[#9a8470] text-sm hover:text-[#6b5c4e] transition-colors">← Accueil</a>
        </div>

        <h1 className="text-2xl font-bold text-[#3a3028] mb-2">Ton calendrier grossesse</h1>

        {/* Input DPA si pas renseignée */}
        {!dpa && (
          <div className="bg-white rounded-2xl p-5 border border-[#e8ddd4] mb-6">
            <label className="block text-[#6b5c4e] text-sm font-semibold mb-2">
              📅 Entre la date prévue d'accouchement
            </label>
            <input
              type="date"
              onChange={(e) => setDpa(e.target.value)}
              className="w-full bg-[#f8f5f0] border border-[#e8ddd4] rounded-xl px-4 py-3 text-[#3a3028] focus:outline-none focus:border-[#c8a882] text-sm"
            />
          </div>
        )}

        {/* SA actuelle + fruit */}
        {saActuelle && (
          <div className="bg-[#3a3028] rounded-2xl p-5 mb-8 flex items-center gap-4">
            <span className="text-4xl">{getFruit(saActuelle)}</span>
            <div>
              <p className="text-[#f0e0cc] font-bold">Semaine {saActuelle} de grossesse</p>
              <p className="text-[#c8a882] text-sm">
                DPA : {new Date(dpa).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-[#9a8470] text-xs mt-1">
                {40 - saActuelle > 0 ? `${40 - saActuelle} semaines restantes` : '🎉 Le grand jour !'}
              </p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#e8ddd4]" />

          <div className="space-y-3">
            {RDV_LIST.map((rdv, i) => {
              const statut = getStatut(rdv);
              const ouvert = rdvOuvert === i;

              return (
                <div key={i} className="relative pl-16">
                  {/* Point sur la ligne */}
                  <div className={`absolute left-4 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    statut === 'passé' ? 'bg-[#c8a882] border-[#c8a882]' :
                    statut === 'prochain' ? 'bg-[#3a3028] border-[#3a3028] scale-125' :
                    'bg-[#f8f5f0] border-[#e8ddd4]'
                  }`}>
                    {statut === 'passé' && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {statut === 'prochain' && <div className="w-2 h-2 bg-[#f0e0cc] rounded-full" />}
                  </div>

                  {/* Card RDV */}
                  <button
                    onClick={() => setRdvOuvert(ouvert ? null : i)}
                    className={`w-full text-left rounded-2xl p-4 border transition-all ${
                      statut === 'prochain'
                        ? 'bg-[#3a3028] border-[#3a3028]'
                        : statut === 'passé'
                        ? 'bg-white border-[#e8ddd4] opacity-70'
                        : 'bg-white border-[#e8ddd4] hover:border-[#c8a882]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{rdv.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold ${statut === 'prochain' ? 'text-[#f0e0cc]' : 'text-[#3a3028]'}`}>
                              {rdv.titre}
                            </p>
                            {rdv.obligatoire && (
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${statut === 'prochain' ? 'bg-[#c8a882]/30 text-[#f0e0cc]' : 'bg-[#f0e8dc] text-[#c8a882]'}`}>
                                obligatoire
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-0.5 ${statut === 'prochain' ? 'text-[#c8a882]' : 'text-[#9a8470]'}`}>
                            SA {rdv.sa}
                            {dpa && ` · ${new Date(new Date(dpa).getTime() - (40 - rdv.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs transition-transform ${ouvert ? 'rotate-180' : ''} ${statut === 'prochain' ? 'text-[#c8a882]' : 'text-[#c8b8a8]'}`}>
                        ▼
                      </span>
                    </div>

                    {/* Description dépliée */}
                    {ouvert && (
                      <div className={`mt-3 pt-3 border-t text-sm leading-relaxed ${
                        statut === 'prochain'
                          ? 'border-[#6b5c4e] text-[#e8d5c4]'
                          : 'border-[#f0e8e0] text-[#6b5c4e]'
                      }`}>
                        {rdv.description}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-[#c8b8a8] text-xs mt-8">
          ⚕️ Ces informations sont indicatives. Consultez toujours votre médecin ou sage-femme.
        </p>

      </div>
    </main>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
        <p className="text-[#9a8470]">Chargement...</p>
      </main>
    }>
      <TimelineContent />
    </Suspense>
  );
}
