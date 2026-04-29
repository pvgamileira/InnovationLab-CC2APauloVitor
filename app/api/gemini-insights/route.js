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
    const { data: profile } = await supabase.from('user_profiles').select('*').eq('user_id', user.id).single();
    const { data: tasks } = await supabase.from('academic_tasks').select('title, status').eq('user_id', user.id);
    const { data: subjects } = await supabase.from('subjects').select('name, workload').eq('user_id', user.id);

    const pending = tasks?.filter(t => t.status === 'pending').length || 0;
    const completed = tasks?.filter(t => t.status === 'completed').length || 0;
    const tasksString = tasks?.map(t => `${t.title} (${t.status})`).join(', ') || 'Nenhuma tarefa';

    const profileName = profile?.name || user.user_metadata?.name || 'Estudante';
    const profileCourse = profile?.course || 'Cursos Diversos';
    const profileInstitution = profile?.institution || 'Instituição';
    const profileShift = profile?.study_shift || 'Indefinido';
    const profileOccupation = profile?.occupation || 'Estudante';

    // 4. Trava de Segurança da Chave
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('A chave GEMINI_API_KEY não foi encontrada no .env.local');
    }

    // 5. Aciona o Gemini (TROCAMOS PARA O GEMINI-PRO UNIVERSAL)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Você é o Mentor IA do EduTrack. O usuário se chama ${profileName}, estuda ${profileCourse} na ${profileInstitution} no turno ${profileShift} e trabalha como ${profileOccupation}.
      Analise as tarefas dele: [${tasksString}] e dê 3 insights curtos e ultra-personalizados.
      Se houver tarefas acumuladas e o usuário trabalha/estuda em turnos opostos, inclua um 'Radar de Burnout' com conselhos de saúde mental.
      Dê dicas técnicas de TI baseadas no curso dele.
      Retorne EXATAMENTE um objeto JSON válido, sem markdown, sem formatação extra, apenas isso:
      {"insights": ["dica 1", "dica 2", "dica 3"]}
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // 6. Limpa alucinações de formatação e converte
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(text);

    return NextResponse.json({ insights: jsonResponse.insights, profileName }, { status: 200 });

  } catch (error) {
    console.error("Erro no Motor Gemini:", error);
    return NextResponse.json({ error: error.message, name: error.name, stack: error.stack }, { status: 500 });
  }
}