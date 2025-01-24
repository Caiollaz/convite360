import "server-only";
import { createTransport } from "nodemailer";
import handlebars from "handlebars";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { join } from "path";
import { prisma } from "./prisma";

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function generatePDFAndImage(invitationId: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process'
    ],
    headless: true,
    executablePath: process.env.NODE_ENV === 'production'
      ? '/usr/bin/chromium'  // Path do Chrome na Vercel
      : puppeteer.executablePath(), // Use local Chrome in development
  });
  
  const page = await browser.newPage();
  
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}/preview`, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  const image = await page.screenshot({
    type: "png",
    fullPage: true,
  });

  await browser.close();

  return { pdf, image };
}

export async function sendConfirmationEmail(
  email: string,
  invitationId: string
) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  const { pdf, image } = await generatePDFAndImage(invitationId);

  const templatePath = join(process.cwd(), "src/lib/email-templates/confirmation.hbs");
  const template = handlebars.compile(readFileSync(templatePath, "utf8"));

  const templateData = {
    name: invitation.name,
    eventTitle: invitation.title,
    eventDate: new Date(invitation.startDate).toLocaleString("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
    }),
    location: invitation.location,
    eventType: invitation.eventType,
    invitationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}`,
    buttonColor: invitation.color,
  };

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Seu convite está pronto! ",
    html: template(templateData),
    attachments: [
      {
        filename: "convite.pdf",
        content: Buffer.from(pdf),
        contentType: "application/pdf",
      },
      {
        filename: "convite.png",
        content: Buffer.from(image),
        contentType: "image/png",
      },
    ],
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado com sucesso:', info.response);
    }
  })
}
