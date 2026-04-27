import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: subjects, error: subError } = await supabaseAuth
      .from('subjects')
      .select('*')
      .eq('user_id', user.id);

    if (subError) {
      console.error('Supabase error fetching subjects:', subError);
      return NextResponse.json({ error: 'Error fetching subjects' }, { status: 500 });
    }

    const { data: tasks, error: tasksError } = await supabaseAuth
      .from('academic_tasks')
      .select('*')
      .eq('user_id', user.id);

    if (tasksError) {
      console.error('Supabase error fetching tasks:', tasksError);
      return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }

    const pendingTasks = (tasks || []).filter(t => t.status === 'pending').length;
    const completedTasks = (tasks || []).filter(t => t.status === 'completed').length;
    const subjectsList = (subjects || []).map(s => s.name).join(', ');

    const dataContext = {
      subjects: subjectsList || 'Nenhuma matéria cadastrada',
      totalTasks: tasks?.length || 0,
      completedTasks,
      pendingTasks
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: "Aja como um mentor acadêmico sênior. Analise estes dados de desempenho e forneça 3 insights estratégicos curtos (máximo 2 frases cada) sobre o que o aluno deve priorizar."
    });

    const prompt = `
      Dados de desempenho do aluno:
      Matérias: ${dataContext.subjects}
      Total de Tarefas: ${dataContext.totalTasks}
      Tarefas Concluídas: ${dataContext.completedTasks}
      Tarefas Pendentes: ${dataContext.pendingTasks}
      
      Retorne a resposta estritamente em formato JSON com a seguinte estrutura exata:
      {
        "insights": [
          "insight 1",
          "insight 2",
          "insight 3"
        ]
      }
    `;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
        }
    });

    const responseText = result.response.text();
    let aiInsights;
    try {
      aiInsights = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', responseText);
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 502 });
    }

    return NextResponse.json(aiInsights, { status: 200 });

  } catch (err) {
    console.error('Gemini Insights Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
