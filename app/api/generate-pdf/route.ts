import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const { dpa, ville, premierEnfant } = await req.json();

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const navy = rgb(0.118, 0.227, 0.541);
    const white = rgb(0.973, 0.980, 0.988);
    const gray = rgb(0.216, 0.255, 0.318);
    const amber = rgb(0.961, 0.620, 0.043);
    const dark = rgb(0.039, 0.059, 0.118);

    // Calcul semaines
    const today = new Date();
    const dpaDate = new Date(dpa);
    const conceptionDate = new Date(dpaDate.getTime() - 40 * 7 * 24 * 60 * 60 * 1000);
    const diffMs = today.getTime() - conceptionDate.getTime();
    const sa = Math.max(1, Math.min(42, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))));

    const fruits: Record<number, string> = {
      8: 'Myrtille', 10: 'Fraise', 12: 'Citron', 16: 'Avocat',
      20: 'Banane', 24: 'Epi de maïs', 28: 'Aubergine',
      32: 'Mangue', 36: 'Melon', 40: 'Pastèque',
    };
    const getFruit = (sa: number) => {
      const keys = Object.keys(fruits).map(Number).sort((a, b) => a - b);
      let fruit = fruits[keys[0]];
      for (const key of keys) { if (sa >= key) fruit = fruits[key]; }
      return fruit;
    };

    const addPage = () => {
      const page = pdfDoc.addPage([595, 842]);
      page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: dark });
      return page;
    };

    const drawHeader = (page: any, title: string, subtitle: string) => {
      page.drawRectangle({ x: 0, y: 742, width: 595, height: 100, color: navy });
      page.drawText('DADUP', { x: 40, y: 800, size: 11, font, color: amber });
      page.drawText(title, { x: 40, y: 775, size: 22, font, color: white });
      page.drawText(subtitle, { x: 40, y: 755, size: 11, font: fontRegular, color: rgb(0.580, 0.647, 0.733) });
    };

    const drawSection = (page: any, title: string, y: number) => {
      page.drawRectangle({ x: 40, y: y - 5, width: 515, height: 28, color: rgb(0.067, 0.094, 0.157) });
      page.drawText(title, { x: 50, y, size: 13, font, color: amber });
      return y - 35;
    };

    const drawItem = (page: any, text: string, y: number, checked = false) => {
      page.drawRectangle({ x: 50, y: y - 2, width: 14, height: 14, color: checked ? navy : rgb(0.067, 0.094, 0.157), borderColor: navy, borderWidth: 1 });
      page.drawText(text, { x: 72, y, size: 11, font: fontRegular, color: white });
      return y - 22;
    };

    // PAGE 1 — Couverture
    const cover = addPage();
    cover.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: navy });
    cover.drawRectangle({ x: 0, y: 0, width: 595, height: 200, color: dark });
    cover.drawText('👶', { x: 257, y: 650, size: 60, font, color: white });
    cover.drawText('DADUP', { x: 195, y: 590, size: 48, font, color: white });
    cover.drawText('CHECKLIST PREMIUM', { x: 170, y: 555, size: 20, font, color: amber });
    cover.drawText(`Personnalisée pour ${ville}`, { x: 195, y: 510, size: 14, font: fontRegular, color: rgb(0.580, 0.647, 0.733) });
    cover.drawText(`DPA : ${new Date(dpa).toLocaleDateString('fr-FR')}`, { x: 215, y: 485, size: 14, font: fontRegular, color: rgb(0.580, 0.647, 0.733) });
    cover.drawText(`${premierEnfant === 'true' ? 'Premier enfant' : 'Pas votre premier'}`, { x: 220, y: 460, size: 14, font: fontRegular, color: rgb(0.580, 0.647, 0.733) });
    cover.drawText('Document confidentiel · dadup.fr', { x: 185, y: 80, size: 11, font: fontRegular, color: rgb(0.216, 0.255, 0.318) });
    cover.drawText('⚕️ Informatif uniquement — Consultez votre médecin', { x: 130, y: 55, size: 10, font: fontRegular, color: rgb(0.216, 0.255, 0.318) });

    // PAGE 2 — Taille bébé
    const p2 = addPage();
    drawHeader(p2, 'Taille de bébé', `Semaine ${sa} de grossesse`);
    let y = 710;
    y = drawSection(p2, `🍓 Bébé à ${sa} SA`, y);
    p2.drawText(`Ton bébé est à ${sa} semaines d'aménorrhée.`, { x: 50, y, size: 12, font: fontRegular, color: white });
    y -= 25;
    p2.drawText(`Il est de la taille d'une : ${getFruit(sa)}`, { x: 50, y, size: 14, font, color: amber });
    y -= 40;
    y = drawSection(p2, '📏 Mesures approximatives', y);
    const taille = Math.round((sa / 40) * 50);
    const poids = Math.round((sa / 40) * 3400);
    p2.drawText(`Taille estimée : ~${taille} cm`, { x: 50, y, size: 12, font: fontRegular, color: white });
    y -= 25;
    p2.drawText(`Poids estimé : ~${poids} g`, { x: 50, y, size: 12, font: fontRegular, color: white });

    // PAGE 3 — Valise maternité
    const p3 = addPage();
    drawHeader(p3, 'Valise Maternité Papa', '12 essentiels à ne pas oublier');
    y = 710;
    y = drawSection(p3, '🧳 Pour toi (le papa)', y);
    const itemsPapa = [
      'Chargeur téléphone + batterie externe',
      'Vêtements confort (2 jours minimum)',
      'Snacks & bouteilles d\'eau',
      'Écouteurs / casque audio',
      'Carte hospitalière + documents',
      'Appareil photo / GoPro chargé',
    ];
    for (const item of itemsPapa) { y = drawItem(p3, item, y); }
    y -= 10;
    y = drawSection(p3, '👶 Pour bébé', y);
    const itemsBebe = [
      'Body naissance x3 (taille 50 et 56)',
      'Pyjama naissance x2',
      'Bonnet naissance x2',
      'Gigoteuse naissance',
      'Siège auto (installé avant !)',
      'Couches nouveau-né x1 paquet',
    ];
    for (const item of itemsBebe) { y = drawItem(p3, item, y); }

    // PAGE 4 — Calendrier RDV
    const p4 = addPage();
    drawHeader(p4, 'Calendrier RDV Obligatoires', `Personnalisé — DPA ${new Date(dpa).toLocaleDateString('fr-FR')}`);
    y = 710;
    y = drawSection(p4, '📅 Rendez-vous clés', y);
    const rdvs = [
      { sa: 12, label: 'Écho T1 + dépistage trisomie' },
      { sa: 22, label: 'Écho T2 — morphologique' },
      { sa: 32, label: 'Écho T3 — croissance' },
      { sa: 36, label: 'Entretien prénatal papa inclus' },
      { sa: 38, label: 'Préparation accouchement (6 séances)' },
      { sa: 40, label: '🚨 DPA — Jour J !' },
    ];
    for (const rdv of rdvs) {
      const rdvDate = new Date(dpaDate.getTime() - (40 - rdv.sa) * 7 * 24 * 60 * 60 * 1000);
      const dateStr = rdvDate.toLocaleDateString('fr-FR');
      p4.drawText(`SA ${rdv.sa} (${dateStr})`, { x: 50, y, size: 11, font, color: amber });
      y -= 18;
      p4.drawText(rdv.label, { x: 65, y, size: 11, font: fontRegular, color: white });
      y -= 25;
    }

    // PAGE 5 — Guide accouchement
    const p5 = addPage();
    drawHeader(p5, 'Guide Accouchement', 'Ton rôle précis le Jour J');
    y = 710;
    y = drawSection(p5, '⏰ Quand partir à la maternité ?', y);
    const signes = [
      'Contractions toutes les 5 min pendant 1h',
      'Perte des eaux (liquide clair ou rosé)',
      'Saignements importants → urgences direct',
      'Bébé ne bouge plus → urgences direct',
    ];
    for (const signe of signes) { y = drawItem(p5, signe, y); }
    y -= 10;
    y = drawSection(p5, '💪 Ton rôle à la maternité', y);
    const roles = [
      'Chronométrer les contractions (app Contraction Timer)',
      'Rester calme — ta sérénité = sa force',
      'Tenir sa main, encourager sans surjouer',
      'Parler au staff médical si elle ne peut pas',
      'Filmer/photographier avec discrétion',
      'Couper le cordon si proposé (demandez avant !)',
    ];
    for (const role of roles) { y = drawItem(p5, role, y); }

    // PAGE 6 — Survie 1er mois
    const p6
