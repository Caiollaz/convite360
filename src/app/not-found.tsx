import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Convite360
        </h1>
        <ThemeToggle />
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <FileQuestion className="w-24 h-24 text-muted-foreground mx-auto" />
          <h2 className="text-4xl font-bold">404 - Página não encontrada</h2>
          <p className="text-xl text-muted-foreground">
            Ops! Parece que você se perdeu no caminho para a festa.
          </p>
          <Link href="/">
            <Button size="lg" className="mt-8">
              <Home className="w-5 h-5 mr-2" />
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </main>

      <footer className="w-full p-4 text-center text-sm text-muted-foreground">
        © 2023 Convite360. Todos os direitos reservados.
      </footer>
    </div>
  );
}
