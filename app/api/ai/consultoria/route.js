import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { tarefas, xp } = body;

    // OpenSpec: Bridging context data to Gemini via native REST fetch to avoid SDK dependency build issues.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    const prompt = `Você é o assistente neural do EduTrack-Ai. Analise os seguintes dados reais do estudante de tecnologia: XP Atual: ${xp || 0}, Backlog de Tarefas: ${JSON.stringify(tarefas || [])}. Forneça um diagnóstico de performance curtíssimo, direto e tático em formato de tópicos markdown, apontando gargalos e sugerindo o melhor ciclo de Pomodoro para balancear a carga cognitiva. Seja agressivo e motivador. Não use saudações formais.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error('Failed to fetch from Gemini API');
    }

    const data = await response.json();
    const textString = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Diagnóstico indisponível no momento.";

    return NextResponse.json({ diagnosis: textString });
  } catch (error) {
    console.error('Error generating AI diagnosis:', error);
    // Silent UI fallback state on error
    return NextResponse.json({ diagnosis: "SISTEMA OFFLINE. Incapaz de processar diagnóstico neural. Verifique sua conexão ou tente novamente mais tarde." }, { status: 500 });
  }
}
