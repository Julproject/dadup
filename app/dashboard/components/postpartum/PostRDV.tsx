'use client';
import { STYLES, EnTete, Section, Accordeons, CarteInfo } from './ui';

export default function PostRDV({ moisBebe, dataBebe }: any) {
  if (!dataBebe) return null;
  const sante = dataBebe.sante || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{STYLES}</style>

      <EnTete label={`Santé et rendez-vous · mois ${(moisBebe || 0) + 1}`} titre="Ce mois-ci côté santé" />

      {dataBebe.rdv && <CarteInfo icone="rdv" label="Rendez-vous médical" texte={dataBebe.rdv} />}
      {dataBebe.vaccins && <CarteInfo icone="vaccin" label="Vaccins" texte={dataBebe.vaccins} ton="sauge" />}

      {sante.length > 0 && (
        <Section titre="Points de santé">
          <Accordeons items={sante} icone="sante" />
        </Section>
      )}

      {dataBebe.alerte && <CarteInfo icone="alerte" label="Quand consulter" texte={dataBebe.alerte} ton="terra" />}
    </div>
  );
}
