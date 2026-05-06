import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // O SEGREDO ESTÁ AQUI: Criamos um cliente Supabase injetando o seu token.
    // Isso fura o bloqueio do RLS e diz pro banco exatamente quem está pedindo os dados.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseAuth = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("Verified User ID:", user.id);

    // Agora as buscas usam o 'supabaseAuth' que tem a sua permissão!
    const { data: subjects, error: subError } = await supabaseAuth
      .from('subjects')
      .select('*')
      .eq('user_id', user.id);

    if (subError) throw subError;

    const { data: tasks, error: tasksError } = await supabaseAuth
      .from('academic_tasks')
      .select()
      .eq('user_id', user.id);

    if (tasksError) throw tasksError;

    const totalWorkload = (subjects || []).reduce((sum, s) => sum + (s.workload || 0), 0);
    const pendingTasks = (tasks || []).filter(t => t.status === 'pending').length;
    const completedTasks = (tasks || []).filter(t => t.status === 'completed').length;

    const doc = new jsPDF();
    
    // Configurações do PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Relatório Acadêmico - EduTrack AI", 14, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, 32);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Resumo de Desempenho", 14, 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Carga Horária Total: ${totalWorkload}h`, 14, 55);
    doc.text(`Tarefas Pendentes: ${pendingTasks}`, 14, 62);
    doc.text(`Tarefas Concluídas: ${completedTasks}`, 14, 69);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Lista de Disciplinas", 14, 85);

    const tableData = (subjects || []).map(s => [
      s.name,
      s.professor || '-',
      `${s.workload || 0}h`
    ]);

    doc.autoTable({
      startY: 90,
      head: [['Disciplina', 'Professor', 'Carga Horária']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [58, 134, 255] }
    });

    const pdfArrayBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="relatorio_academico.pdf"'
      }
    });

  } catch (err) {
    console.error('Report Generation Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}