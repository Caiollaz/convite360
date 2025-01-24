import "server-only";
import { createTransport } from "nodemailer";
import { prisma } from "./prisma";
import handlebars from "handlebars";
import { readFileSync } from "fs";
import { join } from "path";

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

    // Compile the email template
    const templatePath = join(process.cwd(), "src/lib/email-templates/invitation-ready.hbs");
    const template = handlebars.compile(readFileSync(templatePath, "utf8"));

    // Prepare template data
    const templateData = {
      eventTitle: invitation.title,
      invitationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/convites/${invitationId}/preview`,
    };

    // Generate HTML from template
    const html = template(templateData);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "✨ Seu convite está pronto! ",
      html,
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
