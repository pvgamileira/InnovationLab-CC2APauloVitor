import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

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

    const payload = {
      user_id: user.id,
      subjects: subjects || [],
      tasks: tasks || [],
      stats: {
        totalWorkload,
        pendingTasks,
        completedTasks
      }
    };

    const scriptPath = path.join(process.cwd(), 'scripts', 'generate_report.py');
    const pythonProcess = spawn('python', [scriptPath]);

    const jsonString = JSON.stringify(payload);
    pythonProcess.stdin.write(jsonString);
    pythonProcess.stdin.end();

    const pdfPath = await new Promise((resolve, reject) => {
      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}: ${errorOutput}`));
        } else {
          resolve(output.trim());
        }
      });
    });

    const fileBuffer = await fs.readFile(pdfPath);

    fs.unlink(pdfPath).catch(() => { });

    return new NextResponse(fileBuffer, {
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