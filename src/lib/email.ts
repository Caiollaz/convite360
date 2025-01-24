import "server-only";
import { createTransport } from "nodemailer";
import handlebars from "handlebars";
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

export async function generateInvitationImage(
  invitationId: string
): Promise<string> {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  const params = new URLSearchParams({
    title: invitation.title,
    date: invitation.startDate.toLocaleDateString("pt-BR"),
    location: invitation.location,
    description: invitation.description,
    themeImage: invitation.themeImage
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${invitation.themeImage}`
      : "",
    color: invitation.color,
  });

  const imageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/og?${params.toString()}`;

  // Fetch the image as a buffer
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("Failed to generate invitation image");
  }

  return imageUrl;
}

export async function generatePNGAndImage(invitationId: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  const imageUrl = await generateInvitationImage(invitationId);

  const templatePath = join(
    process.cwd(),
    "src/lib/email-templates/confirmation.hbs"
  );
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
    invitationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}/preview`,
    buttonColor: invitation.color,
  };

  const html = template(templateData);

  const pngResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: invitation.name,
      eventTitle: invitation.title,
      eventDate: new Date(invitation.startDate).toLocaleString("pt-BR", {
        dateStyle: "long",
        timeStyle: "short",
      }),
      location: invitation.location,
      eventType: invitation.eventType,
      buttonColor: invitation.color,
    }),
  });

  if (!pngResponse.ok) {
    throw new Error("Failed to generate PNG");
  }

  const pngArrayBuffer = await pngResponse.arrayBuffer();
  const pngBuffer = Buffer.from(pngArrayBuffer);

  return { png: pngBuffer, image: imageUrl };
}

export async function sendConfirmationEmail(
  email: string,
  invitationId: string
) {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new Error("Invitation not found");
    }

    const { png, image } = await generatePNGAndImage(invitationId);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "✨ Seu convite está pronto! ",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Seu convite está pronto!</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="height: 6px; background-color: ${invitation.color};"></div>
              <div style="padding: 40px 30px;">
                <h1 style="color: #333; font-size: 28px; margin: 0 0 20px 0; text-align: center;">✨ Seu convite está pronto!</h1>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin: 0 0 25px 0; text-align: center;">
                  Olá! Seu convite para <strong style="color: ${invitation.color};">${invitation.title}</strong> foi criado com sucesso.
                </p>
                <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                  <p style="color: #888; font-size: 14px; margin: 0 0 15px 0; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
                    Prévia do seu convite
                  </p>
                  <div style="text-align: center;">
                    <img src="cid:convite" alt="Convite" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);" />
                  </div>
                </div>
                <div style="text-align: center; margin-bottom: 35px;">
                  <p style="color: #666; font-size: 16px; margin: 0 0 20px 0;">
                    Visualize e compartilhe seu convite através do link:
                  </p>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}/preview" 
                     style="display: inline-block; background-color: ${invitation.color}; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 500; font-size: 16px;">
                    Ver meu convite
                  </a>
                </div>
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #888; font-size: 14px; margin: 0;">
                    Este é um email automático, por favor não responda.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: "convite.png",
          content: png,
          contentType: "image/png",
          cid: "convite"
        },
      ],
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    return info;
  }
  catch (error) {
    throw error;
  }
}
