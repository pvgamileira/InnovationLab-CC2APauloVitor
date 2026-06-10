import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { titulo } = await req.json();

    if (!titulo || titulo.length < 5) {
      return NextResponse.json({ error: 'Título muito curto' }, { status: 400 });
    }

    const systemInstruction = "Você é um assistente de produtividade. O usuário vai te enviar o título de uma tarefa. Responda APENAS com uma estimativa de tempo curta e direta, usando um emoji e o tempo. Exemplo: '⏱️ ~45m', '🔥 ~2h', '⚡ ~15m'. Não adicione nenhum outro texto.";

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\nTítulo da tarefa: ${titulo}` }] }
      ]
    });

    const text = response.text;

    return NextResponse.json({ estimativa: text.trim() });
  } catch (error) {
    console.error('Erro na estimativa de IA:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
