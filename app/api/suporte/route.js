import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { category, subject, description } = await request.json();

        if (!category || !subject || !description) {
            return NextResponse.json({ success: false, error: 'Campos obrigatórios ausentes' }, { status: 400 });
        }

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            console.error('DISCORD_WEBHOOK_URL não configurado.');
            return NextResponse.json({ success: false, error: 'Erro de configuração do servidor' }, { status: 500 });
        }

        let color = 3447003; // Default Blue (Dúvida)
        if (category === 'Bug') {
            color = 16711680; // Red
        } else if (category === 'Sugestão') {
            color = 16776960; // Yellow
        }

        const payload = {
            username: "Suporte EduTrack",
            embeds: [
                {
                    title: "Novo Chamado de Suporte",
                    description: description,
                    color: color,
                    fields: [
                        { name: "Categoria", value: category, inline: true },
                        { name: "Assunto", value: subject, inline: true }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Erro ao enviar para o Discord:', errorText);
            return NextResponse.json({ success: false, error: 'Falha ao enviar chamado para o sistema de tickets' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Erro na API de suporte:', error);
        return NextResponse.json({ success: false, error: 'Erro interno do servidor' }, { status: 500 });
    }
}
