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
    invitationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}`,
    buttonColor: invitation.color,
  };

  const html = template(templateData);

  const png = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pdf`, {
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

  if (!png.ok) {
    throw new Error("Failed to generate PNG");
  }

  const pngBuffer = await png.arrayBuffer();

  return { png: Buffer.from(pngBuffer), image: imageUrl };
}

export async function sendConfirmationEmail(
  email: string,
  invitationId: string
) {
  try {
    console.log(
      `Starting email send process for invitation ${invitationId} to ${email}`
    );

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new Error("Invitation not found");
    }

    console.log("Generating PNG and image...");
    const { png, image } = await generatePNGAndImage(invitationId);
    console.log("PNG and image generated successfully");

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Seu convite está pronto! ",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Seu convite está pronto!</h1>
          <p>Olá! Seu convite para "${invitation.title}" foi criado com sucesso.</p>
          <div style="margin: 20px 0;">
            <img src="${image}" alt="Convite" style="max-width: 100%; height: auto;" />
          </div>
          <p>Você pode visualizar e compartilhar seu convite através do link:</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}" style="color: #0070f3; text-decoration: none;">
            ${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}
          </a>
        </div>
      `,
      attachments: [
        {
          filename: "convite.png",
          content: png,
          contentType: "image/png",
        },
      ],
    };

    console.log("Sending email...");
    console.log("Using SMTP settings:", {
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
      },
    });

    // Use promise-based sendMail
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error);
        } else {
          console.log("Email sent successfully:", info.response);
          resolve(info);
        }
      });
    });

    console.log("Email sent successfully");
    return info;
  } catch (error) {
    console.error("Error in sendConfirmationEmail:", error);
    throw error;
  }
}
