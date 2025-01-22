import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const email = metadata.email; // Os metadados do Mercado Pago são convertidos para snake_case
  const id = metadata.id; // Os metadados do Mercado Pago são convertidos para snake_case

  // Faz alguma ação aqui - manda email pro usuario, libera acesso, etc.

  return;
}
