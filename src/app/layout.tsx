import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Leckerli_One, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const LeckerliOne = Leckerli_One({
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convite360",
  description:
    "Crie convites personalizados para seus eventos de forma fácil, rápida e profissional. Nossa plataforma oferece templates exclusivos e a personalização perfeita para qualquer ocasião.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster richColors closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
