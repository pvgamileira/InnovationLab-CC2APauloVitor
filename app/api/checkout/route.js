import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    
    // Se a chave secreta do Stripe não estiver configurada, ativa o modo Fallback
    if (!stripeSecret) {
      console.warn("Aviso: STRIPE_SECRET_KEY não encontrada no .env. Ativando modo Fallback Simulado.");
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    // Importação dinâmica do Stripe para evitar quebras se o pacote npm não estiver instalado
    let StripeModule;
    try {
      StripeModule = await import('stripe');
    } catch (e) {
      console.warn("Aviso: Módulo 'stripe' não instalado localmente. Ativando modo Fallback Simulado.");
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    const Stripe = StripeModule.default || StripeModule;
    const stripe = new Stripe(stripeSecret, {
      apiVersion: '2023-10-16',
    });

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Cria a sessão de checkout de assinatura do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: 'price_12345', // ID de preço dummy
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/dashboard/premium`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error) {
    console.error("Erro na Rota de Checkout do Stripe:", error);
    return NextResponse.json(
      { error: "Erro ao processar checkout. Modo simulação disponível.", fallback: true },
      { status: 200 }
    );
  }
}
