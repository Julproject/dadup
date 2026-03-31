'use client';
import { useState } from 'react';

// ── Sous-composant Fiche ──────────────────────────────────────────────────────
function Fiche({ titre, texte, dark }: { titre: string; texte: string; dark?: boolean }) {
  return (
    <div style={{ background: dark ? 'rgba(255,255,255,0.07)' : '#f7f5f0', borderRadius: '16px', padding: '16px 18px' }}>
      <p style={{ color: dark ? '#c8a060' : '#1e2535', fontSize: '14px', fontWeight: 800, margin: '0 0 6px' }}>{titre}</p>
      <p style={{ color: dark ? 'rgba(255,255,255,0.7)' : '#5a6070', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{texte}</p>
    </div>
  );
}

// ── Section préparation à l'accouchement (SA 37+) ─────────────────────────────
function AccouchementSection({ C, valiseChecked }: any) {
  const [onglet, setOnglet] = useState<'contractions' | 'valise' | 'salle' | 'cesarienne'>('contractions');

  const ONGLETS = [
    { id: 'contractions', label: '🤰 Contractions' },
    { id: 'valise',       label: '🧳 Valise' },
    { id: 'salle',        label: '👨 En salle' },
    { id: 'cesarienne',   label: '🏥 Césarienne' },
  ] as const;

  return (
    <div style={{ background: '#1e2535', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <p style={{ color: 'rgba(200,160,96,0.7)', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 6px' }}>J-quelques jours</p>
        <p style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: 0 }}>Préparation à l&apos;accouchement</p>
      </div>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
        {ONGLETS.map(o => (
          <button key={o.id} onClick={() => setOnglet(o.id)} style={{
            padding: '8px 14px', border: 'none', borderRadius: '20px', cursor: 'pointer',
            background: onglet === o.id ? '#c8a060' : 'rgba(255,255,255,0.08)',
            color: onglet === o.id ? '#1e2535' : 'rgba(255,255,255,0.7)',
            fontSize: '12px', fontWeight: 700,
          }}>{o.label}</button>
        ))}
      </div>

      {/* Contractions */}
      {onglet === 'contractions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Fiche dark titre="Vraies contractions vs fausses contractions" texte="Les contractions de Braxton Hicks sont irrégulières, disparaissent en changeant de position ou en marchant. Les vraies contractions sont régulières, de plus en plus rapprochées, intenses et longues — elles ne s'arrêtent pas." />
          <Fiche dark titre="La règle 5-1-1" texte="Pars à la maternité quand les contractions durent 1 minute, surviennent toutes les 5 minutes, depuis au moins 1 heure. Pour un premier bébé, ne pas attendre trop. Pour les suivants, partir un peu plus tôt." />
          <Fiche dark titre="Les autres signaux de départ" texte="Perte des eaux (liquide clair, inodore, impossible à retenir) : partir dans l'heure même sans contraction. Perte du bouchon muqueux : peut précéder l'accouchement de quelques heures à quelques jours. Saignements roses ou bruns légers : normaux. Saignements rouges abondants : urgence." />
          <Fiche dark titre="Ce que tu peux faire pendant les contractions" texte="Chronomètre avec une app dédiée. Reste calme, parle-lui doucement. Propose-lui de se lever, de marcher, de prendre une douche chaude. Masse-lui le bas du dos en appuyant fort avec la paume. Ne la laisse pas seule." />
        </div>
      )}

      {/* Valise */}
      {onglet === 'valise' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Fiche dark titre="La valise est-elle prête ?" texte="Dès SA 36, la valise doit être bouclée et posée près de la porte. Vérifie que tu sais exactement où elle est, que la voiture a de l'essence et que tu connais le trajet." />
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px' }}>
            <p style={{ color: '#c8a060', fontSize: '12px', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase' as const, letterSpacing: '1.5px' }}>Rappel checklist</p>
            {[
              { label: 'Documents : carte vitale, ordonnances, carnet de maternité', id: 'v_docs' },
              { label: 'Pour elle : vêtements confortables, chaussons, brosse à dents', id: 'v_elle' },
              { label: 'Pour bébé : bodies, grenouillères, bonnet, siège auto installé', id: 'v_bebe' },
              { label: 'Pour toi : chargeur, tenue de rechange, snacks, livre ou écouteurs', id: 'v_toi' },
              { label: 'Téléphone chargé à 100 % et mode avion désactivé', id: 'v_photo' },
            ].map(item => {
              const done = valiseChecked?.[item.id];
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: done ? '#c8a060' : 'rgba(255,255,255,0.15)', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {done && <span style={{ color: '#1e2535', fontSize: '10px', fontWeight: 800 }}>✓</span>}
                  </div>
                  <p style={{ color: done ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.75)', fontSize: '13px', margin: 0, lineHeight: 1.5, textDecoration: done ? 'line-through' : 'none' }}>{item.label}</p>
                </div>
              );
            })}
          </div>
          <Fiche dark titre="Préparer la voiture" texte="Le siège auto doit être installé et validé AVANT SA 37. Règle les sangles pour un nouveau-né. Répète mentalement le trajet jusqu'à la maternité. Prévois un itinéraire de secours." />
        </div>
      )}

      {/* En salle */}
      {onglet === 'salle' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Fiche dark titre="À l'admission" texte="Reste calme et posé. Tu es son ancre. Parle clairement aux soignants, présente-toi. Pose les questions que tu as préparées. Ne prends pas de décisions à sa place : soutiens-la dans les siennes." />
          <Fiche dark titre="Pendant le travail" texte="Ta seule mission : être présent. Tiens-lui la main. Rappelle-lui de respirer. Masse-lui le bas du dos. Si elle te dit de ne pas la toucher, respecte-le. Hydrate-la entre les contractions. Mange discrètement pour tenir." />
          <Fiche dark titre="La péridurale" texte="Si elle choisit la péridurale, reste à sa hauteur, tiens-lui les mains, ne regarde pas l'aiguille. Elle doit rester immobile pendant la pose. Après, l'effet met 15 à 20 minutes à agir pleinement." />
          <Fiche dark titre="Parler aux soignants" texte="Tu peux demander au médecin ou à la sage-femme de t'expliquer ce qui se passe. Dis 'elle souhaite...' plutôt que de décider à sa place. Si quelque chose te semble anormal, exprime-le calmement mais clairement." />
          <Fiche dark titre="La naissance" texte="On te proposera peut-être de couper le cordon. Le peau à peau avec toi est possible dès les premières minutes, même si maman est en soins. Parle-lui doucement : il reconnaît ta voix depuis des mois." />
        </div>
      )}

      {/* Césarienne */}
      {onglet === 'cesarienne' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Fiche dark titre="Programmée ou en urgence" texte="Une césarienne programmée concerne environ 20 % des naissances en France et est décidée à l'avance pour des raisons médicales. Une césarienne en urgence peut survenir à n'importe quel moment du travail. Dans les deux cas, c'est un accouchement, pas un échec." />
          <Fiche dark titre="Ce qui se passe au bloc" texte="Elle sera allongée, un écran entre sa tête et son ventre. Rachianesthésie dans le dos, différente de la péridurale. Tu seras à côté d'elle, assis près de sa tête. L'intervention dure 30 à 45 minutes. Bébé est sorti dans les 10 premières minutes." />
          <Fiche dark titre="Ton rôle au bloc" texte="Tiens-lui la main. Parle-lui. Elle peut avoir des tremblements ou des nausées — c'est normal, rassure-la. Ne regarde pas par-dessus l'écran sauf si elle le souhaite. Si on t'amène bébé pendant qu'elle est suturée, fais le peau à peau toi-même." />
          <Fiche dark titre="Les suites" texte="Elle aura besoin d'aide pour se lever les premières 24 heures. La douleur est gérée par les antalgiques. Pas de port de charges lourdes pendant 6 semaines. La cicatrice sera basse et peu visible. L'allaitement est tout à fait possible après une césarienne." />
          <Fiche dark titre="Si c'est une urgence" texte="Si tu n'es pas autorisé à entrer au bloc, attends à côté. Demande des nouvelles à l'équipe régulièrement. Préviens les familles. Prépare-toi à accueillir bébé. L'équipe médicale sait ce qu'elle fait — fais-lui confiance." />
        </div>
      )}
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function Accueil({ C, dpa, saReelle, joursRestants, prog, tri, idee, missions, missionsChecked, toggleM, nextRdv, nextRdvDate, saveRdv, saveRdvI, dataR, sa, data, valiseChecked }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* HERO */}
      {dataR && saReelle && (
        <div style={{ background: C.blue, borderRadius: '24px' }}>
          <div style={{ padding: '32px 28px 24px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}>
              <div style={{ fontSize: '140px', lineHeight: 1 }}>{dataR.emoji}</div>
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ color: 'rgba(200,160,96,0.7)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 10px', fontWeight: 700 }}>{saReelle} SA · {tri}</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', fontWeight: 600, margin: '0 0 4px' }}>Bébé fait</p>
              <p style={{ color: C.gold, fontSize: '52px', fontWeight: 900, margin: 0, lineHeight: 1 }}>{dataR.taille}</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '6px 0 0' }}>et pèse environ {dataR.poids}</p>
              {joursRestants && joursRestants > 0 && <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', margin: '8px 0 0' }}>{joursRestants} jours avant le grand jour</p>}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[['Taille', dataR.taille, false], ['Poids', dataR.poids, false], ['Progression', prog + '%', true]].map(([l, v, g]) => (
              <div key={String(l)} style={{ padding: '16px', textAlign: 'center' as const, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px', textTransform: 'uppercase' as const, letterSpacing: '2px', margin: '0 0 4px', fontWeight: 700 }}>{String(l)}</p>
                <p style={{ color: g ? C.gold : '#fff', fontSize: '16px', fontWeight: 800, margin: 0 }}>{String(v)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROCHAIN RDV */}
      {nextRdv && (
        <div>
          <p style={{ color: C.muted, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>Prochain rendez-vous</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#E6F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '22px' }}>{nextRdv.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: C.dark, fontSize: '17px', fontWeight: 800, margin: '0 0 2px' }}>{nextRdv.titre}</p>
              <p style={{ color: C.muted, fontSize: '13px', margin: 0 }}>{nextRdv.sa} SA{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - nextRdv.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : ''}</p>
            </div>
            {dpa && joursRestants && (
              <div style={{ background: 'rgba(200,160,96,0.12)', borderRadius: '12px', padding: '8px 12px', textAlign: 'center' as const, flexShrink: 0 }}>
                <p style={{ color: C.gold, fontSize: '20px', fontWeight: 800, margin: 0, lineHeight: 1 }}>{Math.max(0, Math.ceil((new Date(new Date(dpa).getTime() - (40 - nextRdv.sa) * 7 * 24 * 60 * 60 * 1000).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}j</p>
              </div>
            )}
          </div>
          <div style={{ paddingTop: '16px' }}>
            <p style={{ color: C.muted, fontSize: '11px', fontWeight: 600, margin: '0 0 8px' }}>Ma date de RDV :</p>
            <input type="date" value={nextRdvDate} onChange={e => { saveRdv(e.target.value); if (nextRdv) saveRdvI(nextRdv.sa, e.target.value); }} style={{ background: '#E6F0FA', border: 'none', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: C.dark, width: '100%', outline: 'none' }} />
            {nextRdvDate && <p style={{ color: C.gold, fontSize: '12px', margin: '6px 0 0', fontWeight: 600 }}>RDV noté le {new Date(nextRdvDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>}
          </div>
        </div>
      )}

      {/* CE QUE VIT MAMAN */}
      {dataR && (
        <div style={{ background: '#FFF0E6', borderRadius: '20px', padding: '22px 24px' }}>
          <p style={{ color: '#C04A1A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Ce que vit maman</p>
          <p style={{ color: '#3D1A0A', fontSize: '15px', fontWeight: 800, margin: '0 0 8px' }}>{dataR.maman_titre}</p>
          <p style={{ color: '#7A3010', fontSize: '13px', lineHeight: 1.75, margin: '0 0 12px' }}>{dataR.maman}</p>
          <div style={{ background: 'rgba(192,74,26,0.08)', borderRadius: '12px', padding: '10px 14px' }}>
            <p style={{ color: '#C04A1A', fontSize: '12px', fontWeight: 700, margin: '0 0 2px' }}>Ton rôle cette semaine</p>
            <p style={{ color: '#7A3010', fontSize: '13px', margin: 0 }}>{dataR.maman_aide}</p>
          </div>
        </div>
      )}

      {/* LE SAVAIS-TU */}
      {dataR && (
        <div style={{ background: C.blueDark, borderRadius: '20px', padding: '22px 24px' }}>
          <p style={{ color: 'rgba(200,160,96,0.65)', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Le savais-tu</p>
          <p style={{ color: C.white, fontSize: '15px', lineHeight: 1.75, margin: 0 }}>"{dataR.savistu}"</p>
        </div>
      )}

      {/* À SAVOIR */}
      {dataR && (
        <div style={{ background: '#E0F5F0', borderRadius: '20px', padding: '22px 24px' }}>
          <p style={{ color: '#0A6050', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>À savoir cette semaine</p>
          <p style={{ color: '#0A2A24', fontSize: '15px', fontWeight: 800, margin: '0 0 8px' }}>{dataR.doc_titre}</p>
          <p style={{ color: '#0A4A3C', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{dataR.doc}</p>
        </div>
      )}

      {/* PRÉPARATION À L'ACCOUCHEMENT — SA 37+ */}
      {saReelle >= 37 && (
        <AccouchementSection C={C} valiseChecked={valiseChecked} />
      )}

      {/* CONSEIL + IDÉE */}
      <div className="dd-g2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {dataR && (
          <div style={{ background: '#FDECEA', borderRadius: '18px', padding: '18px 20px' }}>
            <p style={{ color: '#A03030', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>Conseil</p>
            <p style={{ color: '#3D0A0A', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{dataR.conseil}</p>
          </div>
        )}
        <div style={{ background: '#FFF7E0', borderRadius: '18px', padding: '18px 20px' }}>
          <p style={{ color: '#8A6010', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>Idée du mois</p>
          <p style={{ color: '#3A2800', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{idee}</p>
        </div>
      </div>

      {/* MISSIONS */}
      {missions.length > 0 && (
        <div>
          <p style={{ color: C.muted, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>Tes missions cette semaine</p>
          <div className="dd-mg" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {missions.map((m: string, i: number) => {
              const id = `m${saReelle}_${i}`;
              const done = missionsChecked[id];
              return (
                <button key={id} onClick={() => toggleM(id)} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: done ? '#E4F5EC' : '#f7f5f0', borderRadius: '14px', padding: '12px 14px', border: 'none', cursor: 'pointer', textAlign: 'left' as const, width: '100%' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: done ? 'none' : `2px solid ${C.border}`, background: done ? '#0D6B40' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    {done && <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>✓</span>}
                  </div>
                  <p style={{ color: done ? '#0D6B40' : C.dark, fontSize: '13px', lineHeight: 1.5, margin: 0, textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.7 : 1 }}>{m}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
