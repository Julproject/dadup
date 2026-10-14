// ── Téléphone réaliste (style iPhone récent) pour présenter de vraies captures de l'app ──
// La taille se règle par la largeur du conteneur (className) ; tout le reste est proportionnel (unités cqw).
// Les captures doivent faire 393 × 798 (écran sans la barre d'état).

type Props = { src: string; alt: string; className?: string; heure?: string; prioritaire?: boolean };

export default function TelephoneRealiste({ src, alt, className = '', heure = '9:41', prioritaire = false }: Props) {
  return (
    <div className={`tel ${className}`}>
      <style>{CSS}</style>
      <span className="tel-btn tel-action" aria-hidden="true" />
      <span className="tel-btn tel-vol1" aria-hidden="true" />
      <span className="tel-btn tel-vol2" aria-hidden="true" />
      <span className="tel-btn tel-power" aria-hidden="true" />
      <div className="tel-cadre">
        <div className="tel-bord">
          <div className="tel-ecran">
            <div className="tel-statut" aria-hidden="true">
              <span className="tel-heure">{heure}</span>
              <span className="tel-icones">
                <svg viewBox="0 0 18 12" className="tel-ic"><rect x="0" y="8" width="3" height="4" rx="0.8" /><rect x="5" y="5.5" width="3" height="6.5" rx="0.8" /><rect x="10" y="3" width="3" height="9" rx="0.8" /><rect x="15" y="0" width="3" height="12" rx="0.8" /></svg>
                <svg viewBox="0 0 16 12" className="tel-ic"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.2 6.6a6.8 6.8 0 0 1 9.6 0l-1.4 1.4a4.8 4.8 0 0 0-6.8 0zM.8 4.2a10.2 10.2 0 0 1 14.4 0l-1.4 1.4a8.2 8.2 0 0 0-11.6 0z" /></svg>
                <svg viewBox="0 0 27 13" className="tel-ic tel-batt"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity="0.45" /><rect x="2.5" y="2.5" width="16" height="8" rx="2" /><path d="M25 4.5v4a2 2 0 0 0 0-4z" opacity="0.45" /></svg>
              </span>
            </div>
            <span className="tel-ilot" aria-hidden="true" />
            <img src={src} alt={alt} width={393} height={798} loading={prioritaire ? 'eager' : 'lazy'} decoding="async" {...(prioritaire ? { fetchPriority: 'high' as const } : {})} />
            <span className="tel-reflet" aria-hidden="true" />
            <span className="tel-indicateur" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
.tel{position:relative;container-type:inline-size;}
.tel-cadre{position:relative;border-radius:16.5cqw;padding:1.3cqw;
  background:linear-gradient(145deg,#e9cfc5 0%,#c79a8d 22%,#f3dfd7 45%,#b98a7d 70%,#dcb7aa 100%);
  box-shadow:0 0 0 0.35cqw rgba(90,50,40,.35) inset, 0 3cqw 8cqw rgba(0,0,0,.38), 0 1cqw 2cqw rgba(0,0,0,.25);}
.tel-bord{border-radius:15.3cqw;padding:3.1cqw;background:#0b0b0d;box-shadow:0 0 0 0.25cqw rgba(255,255,255,.08) inset;}
.tel-ecran{position:relative;overflow:hidden;border-radius:12.4cqw;background:#F6F1E9;container-type:inline-size;}
.tel-ecran img{display:block;width:100%;height:auto;}
.tel-statut{height:13.7cqw;display:flex;align-items:center;justify-content:space-between;padding:1.6cqw 7.5cqw 0 9.5cqw;color:#15263A;
  font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif;}
.tel-heure{font-size:4.3cqw;font-weight:600;letter-spacing:-0.1cqw;}
.tel-icones{display:flex;align-items:center;gap:1.5cqw;}
.tel-ic{height:3cqw;width:auto;fill:currentColor;color:#15263A;}
.tel-batt{height:3.2cqw;}
.tel-ilot{position:absolute;top:2.9cqw;left:50%;transform:translateX(-50%);width:31cqw;height:9.2cqw;border-radius:99px;background:#000;}
.tel-ilot::after{content:'';position:absolute;right:3.2cqw;top:50%;transform:translateY(-50%);width:2.6cqw;height:2.6cqw;border-radius:50%;
  background:radial-gradient(circle at 35% 35%,#2b3a55,#0a0d14 60%);}
.tel-reflet{position:absolute;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,255,255,.16) 0%,rgba(255,255,255,0) 32%);}
.tel-indicateur{position:absolute;left:50%;bottom:2.2cqw;transform:translateX(-50%);width:35cqw;height:1.35cqw;border-radius:99px;background:rgba(17,17,17,.82);}
.tel-btn{position:absolute;width:1.1cqw;border-radius:1cqw;background:linear-gradient(90deg,#a87c70,#e2c3b8);}
.tel-action{left:-0.7cqw;top:21cqw;height:7.5cqw;}
.tel-vol1{left:-0.7cqw;top:33cqw;height:13cqw;}
.tel-vol2{left:-0.7cqw;top:49cqw;height:13cqw;}
.tel-power{right:-0.7cqw;top:38cqw;height:20cqw;background:linear-gradient(270deg,#a87c70,#e2c3b8);}
`;
