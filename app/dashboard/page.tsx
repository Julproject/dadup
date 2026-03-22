'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [dpa, setDpa] = useState('');
  const [ville, setVille] = useState('');

  useEffect(() => {
    const d = searchParams.get('dpa') || localStorage.getItem('dadup_dpa') || '';
    const v = searchParams.get('ville') || localStorage.getItem('dadup_ville') || '';
    if (d) { setDpa(d); localStorage.setItem('dadup_dpa', d); }
    if (v) { setVille(v); localStorage.setItem('dadup_ville', v); }
  }, []);

  const getSA = () => {
    if (!dpa) return null;
    const conception = new Date(new Date(dpa).getTime() - 40 * 7 * 24 * 60 * 60 * 1000);
    const diff = new Date().getTime() - conception.getTime();
    return Math.max(1, Math.min(42, Math.floor(diff / (7 * 24 * 60 * 60 * 1000))));
  };

  const getFruit = (sa: number) => {
    const map: Record<number, {nom:string,emoji:string,taille:string,poids:string}> = {
      6: {nom:'grain de riz',emoji:'🌾',taille:'0.6 cm',poids:'< 1g'},
      8: {nom:'myrtille',emoji:'🫐',taille:'1.6 cm',poids:'1g'},
      10: {nom:'fraise',emoji:'🍓',taille:'3 cm',poids:'4g'},
      12: {nom:'citron',emoji:'🍋',taille:'5.4 cm',poids:'14g'},
      14: {nom:'pêche',emoji:'🍑',taille:'8.7 cm',poids:'43g'},
      16: {nom:'avocat',emoji:'🥑',taille:'11.6 cm',poids:'100g'},
      18: {nom:'poivron',emoji:'🫑',taille:'14.2 cm',poids:'190g'},
      20: {nom:'banane',emoji:'🍌',taille:'16.4 cm',poids:'300g'},
      22: {nom:'papaye',emoji:'🥭',taille:'19 cm',poids:'430g'},
      24: {nom:'épi de maïs',emoji:'🌽',taille:'21 cm',poids:'600g'},
      26: {nom:'chou-fleur',emoji:'🥦',taille:'23 cm',poids:'760g'},
      28: {nom:'aubergine',emoji:'🍆',taille:'25 cm',poids:'1 kg'},
      30: {nom:'chou',emoji:'🥬',taille:'27 cm',poids:'1.3 kg'},
      32: {nom:'mangue',emoji:'🥭',taille:'29 cm',poids:'1.7 kg'},
      34: {nom:'melon',emoji:'🍈',taille:'32 cm',poids:'2.1 kg'},
      36: {nom:'laitue',emoji:'🥗',taille:'34 cm',poids:'2.6 kg'},
      38: {nom:'poireau',emoji:'🌿',taille:'36 cm',poids:'3 kg'},
      40: {nom:'pastèque',emoji:'🍉',taille:'51 cm',poids:'3.4 kg'},
    };
    const keys = Object.keys(map).map(Number).sort((a,b) => a-b);
    let fruit = map[keys[0]];
    for (const k of keys) { if (sa >= k) fruit = map[k]; }
    return fruit;
  };

  const sa = getSA();
  const fruit = sa ? getFruit(sa) : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.max(0, Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : null;

  const tabs = [
    { id: 'home', emoji: '🏠', label: 'Accueil' },
    { id: 'timeline', emoji: '📅', label: 'RDV' },
    { id: 'guide', emoji: '🏥', label: 'Guide' },
    { id: 'valise', emoji: '🧳', label: 'Valise' },
    { id: 'achats', emoji: '🛒', label: 'Achats' },
    { id: 'chat', emoji: '🤖', label: 'Chat' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f0] pb-24">

      {/* Header */}
      <div className="bg-white border-b border-[#e8ddd4] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 300 300" width="36" height="36">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
          </svg>
          <div>
            <p className="font-bold text-[#3a3028] text-sm">DadUp</p>
            <p className="text-[#9a8470] text-xs">{ville || 'Mon espace'}</p>
          </div>
        </div>
        {sa && <div className="bg-[#f0e8dc] px-3 py-1 rounded-full">
          <span className="text-[#6b5c4e] text-xs font-bold">SA {sa}</span>
        </div>}
      </div>

      {/* Contenu */}
      <div className="max-w-xl mx-auto px-4 py-6">

        {/* HOME */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Card bébé */}
            {fruit && sa && (
              <div className="bg-[#3a3028] rounded-3xl p-6">
                <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-3">Cette semaine</p>
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{fruit.emoji}</span>
                  <div>
                    <p className="text-[#f0e0cc] text-xl font-bold">Semaine {sa}</p>
                    <p className="text-[#c8a882] text-sm">Bébé a la taille d'une {fruit.nom}</p>
                    <p className="text-[#9a8470] text-xs mt-1">{fruit.taille} · {fruit.poids}</p>
                  </div>
                </div>
                {joursRestants !== null && (
                  <div className="mt-4 bg-[#6b5c4e]/40 rounded-2xl px-4 py-2 text-center">
                    <p className="text-[#f0e0cc] text-sm">
                      {joursRestants > 0 ? `🗓 ${joursRestants} jours avant le grand jour` : '🎉 C\'est le moment !'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Barre de progression grossesse */}
            {sa && (
              <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
                <div className="flex justify-between text-xs text-[#9a8470] mb-2">
                  <span>SA 1</span>
                  <span className="text-[#6b5c4e] font-bold">SA {sa} — {Math.round((sa/40)*100)}%</span>
                  <span>SA 40</span>
                </div>
                <div className="w-full bg-[#f0e8dc] rounded-full h-3">
                  <div
                    className="bg-[#c8a882] h-3 rounded-full transition-all"
                    style={{width: `${Math.min(100, (sa/40)*100)}%`}}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  {[
                    {sa:12, label:'T1'},
                    {sa:28, label:'T2'},
                    {sa:40, label:'T3'},
                  ].map(t => (
                    <div key={t.sa} className={`text-xs px-2 py-1 rounded-full ${sa >= t.sa ? 'bg-[#c8a882] text-white' : 'bg-[#f0e8dc] text-[#9a8470]'}`}>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modules rapides */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {id:'timeline', emoji:'📅', label:'Mes RDV', desc:'Calendrier personnalisé'},
                {id:'guide', emoji:'🏥', label:'Guide naissance', desc:'Ton rôle le jour J'},
                {id:'valise', emoji:'🧳', label:'Valise', desc:'Checklist complète'},
                {id:'achats', emoji:'🛒', label:'Achats', desc:'Priorités & budget'},
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className="bg-white rounded-2xl p-4 border border-[#e8ddd4] hover:border-[#c8a882] transition-all text-left"
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <p className="text-[#3a3028] text-sm font-bold mt-2">{m.label}</p>
                  <p className="text-[#9a8470] text-xs">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* CTA Chat */}
            <button
              onClick={() => setActiveTab('chat')}
              className="w-full bg-[#c8a882] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#b89060] transition-all"
            >
              <span className="text-3xl">🤖</span>
              <div className="text-left">
                <p className="text-white font-bold text-sm">Pose ta question à DadBot</p>
                <p className="text-[#f0e0cc] text-xs">Assistant IA spécialisé grossesse pour papas</p>
              </div>
            </button>
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === 'timeline' && <TimelineTab sa={sa} dpa={dpa} />}

        {/* GUIDE */}
        {activeTab === 'guide' && <GuideTab />}

        {/* VALISE */}
        {activeTab === 'valise' && <ValiseTab />}

        {/* ACHATS */}
        {activeTab === 'achats' && <AchatsTab />}

        {/* CHAT */}
        {activeTab === 'chat' && <ChatTab sa={sa} dpa={dpa} />}

      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8ddd4] px-2 py-2">
        <div className="max-w-xl mx-auto flex justify-around">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
                activeTab === t.id ? 'bg-[#f0e8dc]' : ''
              }`}
            >
              <span className="text-lg">{t.emoji}</span>
              <span className={`text-xs ${activeTab === t.id ? 'text-[#6b5c4e] font-bold' : 'text-[#b0988a]'}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineTab({ sa, dpa }: { sa: number | null, dpa: string }) {
  const [ouvert, setOuvert] = useState<number | null>(null);
  const rdvs = [
    {sa:8, emoji:'🏥', titre:'1ère consultation', desc:'Confirmation grossesse, prise de sang, calcul DPA. Sois là, prends des notes.', oblig:true},
    {sa:12, emoji:'🔬', titre:'Écho T1 + trisomie', desc:'Premier visage de bébé ! Mesure clarté nucale. Apporte ton téléphone pour filmer.', oblig:true},
    {sa:16, emoji:'📋', titre:'Consultation mensuelle', desc:'Suivi tension, poids. Bonne occasion de poser vos questions.', oblig:false},
    {sa:22, emoji:'👶', titre:'Écho T2 morphologique', desc:"L'écho la plus importante. On voit tout : organes, membres, visage. Durée 45min.", oblig:true},
    {sa:25, emoji:'🩸', titre:'Test diabète gestationnel', desc:'Test HGPO — 3 prises de sang en 2h. Accompagne-la, c\'est long.', oblig:false},
    {sa:28, emoji:'💉', titre:'Début T3 + vaccin', desc:'Vaccin coqueluche recommandé pour le papa. Parler du projet de naissance.', oblig:false},
    {sa:32, emoji:'📏', titre:'Écho T3 croissance', desc:'Vérification position bébé, poids estimé, placenta. Si bébé en siège, on en parle.', oblig:true},
    {sa:34, emoji:'🎓', titre:'Préparation accouchement', desc:'3 à 8 séances remboursées. Les cours pour papas existent ! Demande-les.', oblig:false},
    {sa:36, emoji:'💬', titre:'Entretien prénatal', desc:'Bilan global, projet de naissance. Viens absolument — c\'est fait pour les deux.', oblig:true},
    {sa:38, emoji:'🧳', titre:'Valise prête ?', desc:'Prépare la valise maintenant. Documents, vêtements, chargeurs, snacks pour toi.', oblig:false},
    {sa:40, emoji:'🎉', titre:'Jour J — DPA', desc:'Contractions toutes les 5min pendant 1h, perte des eaux = direction maternité !', oblig:true},
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-[#3a3028]">Calendrier RDV</h2>
      {dpa && <p className="text-[#9a8470] text-sm">DPA : {new Date(dpa).toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'})}</p>}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#e8ddd4]" />
        <div className="space-y-3">
          {rdvs.map((r, i) => {
            const statut = !sa ? 'futur' : r.sa < sa ? 'passe' : r.sa <= sa + 2 ? 'prochain' : 'futur';
            return (
              <div key={i} className="relative pl-14">
                <div className={`absolute left-3.5 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center ${statut === 'passe' ? 'bg-[#c8a882] border-[#c8a882]' : statut === 'prochain' ? 'bg-[#3a3028] border-[#3a3028] scale-125' : 'bg-[#f8f5f0] border-[#e8ddd4]'}`}>
                  {statut === 'passe' && <span className="text-white text-xs">✓</span>}
                  {statut === 'prochain' && <span className="w-2 h-2 bg-[#f0e0cc] rounded-full block" />}
                </div>
                <button onClick={() => setOuvert(ouvert === i ? null : i)} className={`w-full text-left rounded-2xl p-4 border transition-all ${statut === 'prochain' ? 'bg-[#3a3028] border-[#3a3028]' : 'bg-white border-[#e8ddd4] hover:border-[#c8a882]'} ${statut === 'passe' ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span>{r.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-bold ${statut === 'prochain' ? 'text-[#f0e0cc]' : 'text-[#3a3028]'}`}>{r.titre}</p>
                          {r.oblig && <span className={`text-xs px-1.5 py-0.5 rounded-full ${statut === 'prochain' ? 'bg-[#c8a882]/30 text-[#f0e0cc]' : 'bg-[#f0e8dc] text-[#c8a882]'}`}>obligatoire</span>}
                        </div>
                        <p className={`text-xs ${statut === 'prochain' ? 'text-[#c8a882]' : 'text-[#9a8470]'}`}>
                          SA {r.sa}{dpa && ` · ${new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'short'})}`}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs ${statut === 'prochain' ? 'text-[#c8a882]' : 'text-[#c8b8a8]'}`}>{ouvert === i ? '▲' : '▼'}</span>
                  </div>
                  {ouvert === i && <p className={`mt-3 pt-3 border-t text-sm leading-relaxed ${statut === 'prochain' ? 'border-[#6b5c4e] text-[#e8d5c4]' : 'border-[#f0e8e0] text-[#6b5c4e]'}`}>{r.desc}</p>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GuideTab() {
  const [ouvert, setOuvert] = useState<number | null>(null);
  const sections = [
    {emoji:'⏰', titre:'Quand partir à la maternité ?', contenu:'Contractions toutes les 5 minutes pendant 1 heure. Perte des eaux (liquide clair ou rosé). Saignements importants → urgences direct. Bébé ne bouge plus → urgences direct. En cas de doute, appelle la maternité.'},
    {emoji:'💪', titre:'Ton rôle pendant le travail', contenu:'Chronométre les contractions avec une app. Reste calme — ta sérénité est contagieuse. Tiens sa main, encourage sans surjouer. Parle au personnel médical si elle ne peut pas. Propose de l\'eau, de la glace, des massages du dos.'},
    {emoji:'✂️', titre:'Couper le cordon', contenu:'On te le proposera. Dis oui ! C\'est un moment fort. Le cordon est clampé deux fois. Tu coupes entre les deux pinces. Aucune douleur pour maman ni bébé. Prends une vidéo si tu peux.'},
    {emoji:'🩸', titre:'Ce que tu vas voir — sois prêt', contenu:'Du sang, c\'est normal. Le placenta sort après bébé. Bébé peut être violet/bleu à la naissance — c\'est normal. Les cris sont bon signe. L\'équipe médicale sait ce qu\'elle fait. Ton rôle : soutenir, pas gérer.'},
    {emoji:'👶', titre:'Les premières heures', contenu:'Peau à peau immédiat si possible — demande-le. Peser, mesurer, premières gouttes. Si allaitement : première mise au sein dans l\'heure. Reste proche, ne va pas téléphoner dans le couloir. Ce moment ne se retrouve jamais.'},
    {emoji:'📸', titre:'Photos & vidéos', contenu:'Demande la permission à maman avant. Évite le flash face au visage de bébé. Capture les regards, les petites mains, les premières réactions. Envoie aux familles après — pas pendant. Vis le moment d\'abord.'},
  ];
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-[#3a3028]">Guide accouchement</h2>
      <p className="text-[#9a8470] text-sm">Tout ce que tu dois savoir pour le jour J.</p>
      {sections.map((s, i) => (
        <button key={i} onClick={() => setOuvert(ouvert === i ? null : i)} className="w-full text-left bg-white rounded-2xl p-4 border border-[#e8ddd4] hover:border-[#c8a882] transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{s.emoji}</span>
              <p className="text-[#3a3028] text-sm font-bold">{s.titre}</p>
            </div>
            <span className="text-[#c8b8a8] text-xs">{ouvert === i ? '▲' : '▼'}</span>
          </div>
          {ouvert === i && <p className="mt-3 pt-3 border-t border-[#f0e8e0] text-sm text-[#6b5c4e] leading-relaxed">{s.contenu}</p>}
        </button>
      ))}
    </div>
  );
}

function ValiseTab() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked(p => ({...p, [id]: !p[id]}));
  const sections = [
    {titre:'Pour toi 👔', items:[
      {id:'v1', label:'Chargeur téléphone + batterie externe'},
      {id:'v2', label:'Vêtements confort (2 jours minimum)'},
      {id:'v3', label:'Snacks & bouteilles d\'eau'},
      {id:'v4', label:'Écouteurs / casque audio'},
      {id:'v5', label:'Carte hospitalière + documents'},
      {id:'v6', label:'Appareil photo chargé'},
    ]},
    {titre:'Pour elle 👗', items:[
      {id:'v7', label:'Chemise de nuit d\'accouchement'},
      {id:'v8', label:'Robe de chambre + chaussons'},
      {id:'v9', label:'Sous-vêtements post-partum'},
      {id:'v10', label:'Coussin d\'allaitement'},
      {id:'v11', label:'Produits de toilette'},
      {id:'v12', label:'Soutien-gorge d\'allaitement x2'},
    ]},
    {titre:'Pour bébé 👶', items:[
      {id:'v13', label:'Body naissance x3 (tailles 50 et 56)'},
      {id:'v14', label:'Pyjama naissance x2'},
      {id:'v15', label:'Bonnet naissance x2'},
      {id:'v16', label:'Gigoteuse naissance'},
      {id:'v17', label:'Siège auto (installé avant !)'},
      {id:'v18', label:'Couches nouveau-né x1 paquet'},
    ]},
    {titre:'Documents 📄', items:[
      {id:'v19', label:'Carte vitale + mutuelle'},
      {id:'v20', label:'Carnet de maternité'},
      {id:'v21', label:'Pièce d\'identité des deux parents'},
      {id:'v22', label:'Plan d\'accès à la maternité'},
    ]},
  ];
  const total = sections.flatMap(s => s.items).length;
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#3a3028]">Valise maternité</h2>
        <span className="bg-[#f0e8dc] text-[#6b5c4e] text-xs font-bold px-3 py-1 rounded-full">{done}/{total}</span>
      </div>
      <div className="w-full bg-[#f0e8dc] rounded-full h-2">
        <div className="bg-[#c8a882] h-2 rounded-full transition-all" style={{width:`${(done/total)*100}%`}}/>
      </div>
      {sections.map(s => (
        <div key={s.titre} className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
          <p className="text-[#3a3028] font-bold text-sm mb-3">{s.titre}</p>
          <div className="space-y-2">
            {s.items.map(item => (
              <button key={item.id} onClick={() => toggle(item.id)} className="w-full flex items-center gap-3 text-left">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked[item.id] ? 'bg-[#c8a882] border-[#c8a882]' : 'border-[#e8ddd4]'}`}>
                  {checked[item.id] && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`text-sm ${checked[item.id] ? 'line-through text-[#b0988a]' : 'text-[#3a3028]'}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AchatsTab() {
  const achats = [
    {emoji:'🚗', cat:'Sécurité', label:'Siège auto groupe 0+', priorite:'urgent', prix:'80-300€', note:'Obligatoire avant la sortie maternité'},
    {emoji:'📷', cat:'Surveillance', label:'Babyphone vidéo', priorite:'urgent', prix:'40-150€', note:'Angelcare ou Chicco recommandés'},
    {emoji:'🛏️', cat:'Sommeil', label:'Lit cododo ou berceau', priorite:'urgent', prix:'60-400€', note:'Halo Bassinest ou Next2Me'},
    {emoji:'🍼', cat:'Alimentation', label:'Tire-lait électrique', priorite:'si allaitement', prix:'30-200€', note:'Medela ou Spectra S1'},
    {emoji:'🏃', cat:'Mobilité', label:'Poussette combinée', priorite:'avant naissance', prix:'200-1200€', note:'Cybex, Bugaboo ou Joie'},
    {emoji:'🌡️', cat:'Santé', label:'Thermomètre rectal', priorite:'urgent', prix:'15-40€', note:'Plus fiable que le frontal'},
    {emoji:'💧', cat:'Confort', label:'Humidificateur', priorite:'utile', prix:'30-80€', note:'Chambre bébé idéale à 19°C'},
    {emoji:'🛁', cat:'Hygiène', label:'Baignoire bébé', priorite:'avant naissance', prix:'20-60€', note:'Avec hamac intégré'},
    {emoji:'👕', cat:'Vêtements', label:'Bodys & pyjamas x6', priorite:'urgent', prix:'30-80€', note:'Tailles 50, 56 et 62'},
    {emoji:'🧴', cat:'Soin', label:'Crème change + coton', priorite:'urgent', prix:'20-40€', note:'Liniment oléocalcaire recommandé'},
  ];
  const [filtre, setFiltre] = useState('tous');
  const filtres = ['tous', 'urgent', 'avant naissance', 'si allaitement', 'utile'];
  const filtered = filtre === 'tous' ? achats : achats.filter(a => a.priorite === filtre);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#3a3028]">Liste achats</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filtres.map(f => (
          <button key={f} onClick={() => setFiltre(f)} className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filtre === f ? 'bg-[#3a3028] text-[#f0e0cc]' : 'bg-white border border-[#e8ddd4] text-[#9a8470]'}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((a, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#e8ddd4] flex items-start gap-3">
            <span className="text-2xl">{a.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[#3a3028] text-sm font-bold">{a.label}</p>
                <span className="text-[#c8a882] text-xs font-bold">{a.prix}</span>
              </div>
              <p className="text-[#9a8470] text-xs mt-0.5">{a.note}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${a.priorite === 'urgent' ? 'bg-red-50 text-red-400' : 'bg-[#f0e8dc] text-[#9a8470]'}`}>{a.priorite}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatTab({ sa, dpa }: { sa: number | null, dpa: string }) {
  const [messages, setMessages] = useState<{role:string, content:string}[]>([
    {role:'assistant', content:'Salut ! Je suis DadBot 🤖 ton assistant grossesse pour papas. Pose-moi n\'importe quelle question — je suis là pour t\'aider !'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = {role:'user', content:input};
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          messages:[...messages, userMsg],
          context:{sa, dpa}
        })
      });
      const data = await res.json();
      setMessages(p => [...p, {role:'assistant', content:data.message}]);
    } catch {
      setMessages(p => [...p, {role:'assistant', content:'Désolé, une erreur est survenue. Réessaie !'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <h2 className="text-xl font-bold text-[#3a3028] mb-4">DadBot 🤖</h2>
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#3a3028] text-[#f0e0cc]' : 'bg-white border border-[#e8ddd4] text-[#3a3028]'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#e8ddd4] rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#c8a882] rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                <div className="w-2 h-2 bg-[#c8a882] rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                <div className="w-2 h-2 bg-[#c8a882] rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Pose ta question..."
          className="flex-1 bg-white border border-[#e8ddd4] rounded-2xl px-4 py-3 text-sm text-[#3a3028] focus:outline-none focus:border-[#c8a882]"
        />
        <button onClick={send} disabled={loading} className="bg-[#3a3028] text-[#f0e0cc] px-4 py-3 rounded-2xl font-bold text-sm disabled:opacity-50">
          →
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
        <p className="text-[#9a8470]">Chargement...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
