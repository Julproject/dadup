'use client';
import { getIdee } from './data/mois';
import { CARTE, TEXTE, STYLES, EnTete, Section, Accordeons, CarteInfo } from './ui';

export default function PostBebe({ moisBebe, dataBebe, joursRestants }: any) {
  if (!dataBebe) return null;
  const jours = Math.abs(joursRestants || 0);
  const developpement = dataBebe.developpement || [];
  const idee = getIdee(moisBebe || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{STYLES}</style>

      <EnTete label={`Mon bébé · mois ${(moisBebe || 0) + 1} · ${jours} jours`} titre={dataBebe.titre} />

      {dataBebe.intro && (
        <div style={{ ...CARTE, padding: '20px 22px' }}>
          <p style={TEXTE}>{dataBebe.intro}</p>
        </div>
      )}

      {developpement.length > 0 && (
        <Section titre="Son développement">
          <Accordeons items={developpement} icone="bebe" />
        </Section>
      )}

      {idee && <CarteInfo icone="idee" label="Idée du mois" texte={idee} ton="sauge" />}
    </div>
  );
}
