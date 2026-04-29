import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // 1. Valida o Token do Usuário
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Token ausente' }, { status: 401 });
    }

    // 2. Conecta no Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Usuário não autenticado');

    // 3. Puxa os dados para a IA analisar
    const { data: tasks } = await supabase.from('academic_tasks').select('title, status').eq('user_id', user.id);
    const { data: subjects } = await supabase.from('subjects').select('name, workload').eq('user_id', user.id);

    const pending = tasks?.filter(t => t.status === 'pending').length || 0;
    const completed = tasks?.filter(t => t.status === 'completed').length || 0;

    // 4. Trava de Segurança da Chave
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('A chave GEMINI_API_KEY não foi encontrada no .env.local');
    }

    // 5. Aciona o Gemini (TROCAMOS PARA O GEMINI-PRO UNIVERSAL)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Aja como um mentor acadêmico sênior. O aluno tem ${subjects?.length || 0} disciplinas ativas.
      Ele concluiu ${completed} tarefas e tem ${pending} pendentes.
      Baseado nisso, forneça 3 insights estratégicos curtos (máximo 2 frases cada) em português sobre o que ele deve priorizar ou melhorar.
      Retorne EXATAMENTE um objeto JSON válido, sem markdown, sem formatação extra, apenas isso:
      {"insights": ["dica 1", "dica 2", "dica 3"]}
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // 6. Limpa alucinações de formatação e converte
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(text);

    return NextResponse.json(jsonResponse, { status: 200 });

  } catch (error) {
    console.error("Erro no Motor Gemini:", error);
    return NextResponse.json({ error: error.message, name: error.name, stack: error.stack }, { status: 500 });
  }
}