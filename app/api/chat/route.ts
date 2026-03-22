import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    const systemPrompt = `Tu es DadBot, un assistant bienveillant et expert spécialisé pour les futurs papas.
Tu réponds uniquement en français, avec un ton chaleureux, direct et rassurant.
Tu es spécialisé dans la grossesse, l'accouchement, et les premiers mois de vie de bébé — du point de vue du père.
${context?.sa ? `Le papa est actuellement à la semaine ${context.sa} de grossesse.` : ''}
${context?.dpa ? `La date prévue d'accouchement est le ${new Date(context.dpa).toLocaleDateString('fr-FR')}.` : ''}
Tu donnes des conseils pratiques, concrets et adaptés à la situation du papa.
Tu termines toujours par rappeler de consulter un médecin ou sage-femme pour les questions médicales.
Tes réponses sont courtes (3-5 phrases max) sauf si on te demande plus de détails.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || 'Désolé, je n\'ai pas pu répondre. Réessaie !';

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ message: 'Une erreur est survenue. Réessaie !' }, { status: 500 });
  }
}
```

4. Clique **"Commit changes"** ✅

---

⚠️ **Important** — Il faut ajouter ta clé OpenAI dans Vercel :

1. Va sur 👉 [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique sur ton projet **dadup**
3. **Settings** → **Environment Variables**
4. Ajoute :
```
Name  → OPENAI_API_KEY
Value → sk-... (ta clé OpenAI)
