import mpClient from "@/lib/mercado-pago";
import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, email, name, phoneNumber } = await req.json();

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          id,
          email: email, // O Mercado Pago converte para snake_case, ou seja, email vai virar email
        },
        payer: {
          email: email,
          name: name,
          phone: {
            number: phoneNumber,
          },
        },
        items: [
          {
            id: "1",
            description: "Template de um convite basico",
            title: "Convite Basico",
            quantity: 1,
            unit_price: 6.9,
            currency_id: "BRL",
            category_id: "category", // Recomendado inserir, mesmo que não tenha categoria - Aumenta a pontuação da sua integração com o Mercado Pago
          },
        ],
        payment_methods: {
          // Comente para desativar métodos de pagamento
          excluded_payment_methods: [{ id: "bolbradesco" }, { id: "pec" }],
          excluded_payment_types: [{ id: "debit_card" }, { id: "credit_card" }],
          installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/obrigado?status=sucesso`,
          failure: `${req.headers.get("origin")}/obrigado?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("Erro: preferenceID não foi gerado.");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error("Erro ao criar a preferência no Mercado Pago:", err);
    return NextResponse.json(
      { error: "Erro ao processar o pagamento" },
      { status: 500 }
    );
  }
}
