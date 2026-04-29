import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Token ausente' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Usuário não autenticado');

    const body = await request.json();
    const { noteContent } = body;

    if (!noteContent || !noteContent.trim()) {
      return NextResponse.json({ error: 'Nenhum conteúdo enviado' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('A chave GEMINI_API_KEY não foi encontrada');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Atue como um tutor acadêmico sênior. O aluno enviou anotações de aula brutas. 1) Corrija erros e reescreva o texto em um resumo estruturado por tópicos. 2) Crie 3 perguntas curtas de revisão (Flashcards) no final. Retorne em Markdown limpo.\n\nAnotações brutas:\n${noteContent}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ content: text }, { status: 200 });
  } catch (error) {
    console.error("Erro no Motor Gemini Copilot:", error);
    return NextResponse.json({ error: error.message, name: error.name, stack: error.stack }, { status: 500 });
  }
}
