import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendConfirmationEmail } from "@/lib/email";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const email = metadata.email;
  const id = metadata.id;

  try {
    await sendConfirmationEmail(email, id)

    console.log(`Payment processed successfully for invitation ${id}`)
  } catch (error) {
    console.error(`Error processing payment for invitation ${id}:`, error)
    throw error
  }

  return;
}
