import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Download, Palette, Send, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Convite360
            </h1>
          </Link>
          <ThemeToggle />
        </header>

        <main className="container mx-auto px-4 pt-20 pb-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Crie convites digitais
              <br />
              em poucos minutos
            </h2>

            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Transforme suas ideias em convites profissionais para qualquer
              ocasião. Simples, rápido e elegante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/criar-convite">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white min-w-[200px]"
                >
                  Criar convite
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                icon={<Palette className="w-6 h-6" />}
                title="Design Personalizado"
                description="Escolha entre diversos temas e personalize cada detalhe do seu convite."
              />
              <FeatureCard
                icon={<Send className="w-6 h-6" />}
                title="Compartilhamento Fácil"
                description="Envie seus convites digitalmente por qualquer plataforma."
              />
              <FeatureCard
                icon={<Download className="w-6 h-6" />}
                title="Download em PDF/IMG"
                description="Baixe seu convite em PDF ou imagem para usar onde quiser."
              />
            </div>
          </div>
        </main>

        <footer className="absolute bottom-0 w-full border-t border-gray-800">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
            © 2024 Convite360. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-400 to-pink-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
