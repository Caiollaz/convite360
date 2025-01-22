import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <TriangleAlert
            key={i}
            className={`absolute text-primary/10 animate-float`}
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              position: "fixed",
            }}
          />
        ))}
      </div>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Convite360
          </h1>
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="relative inline-block">
            <FileQuestion className="w-32 h-32 text-primary mx-auto" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-2xl rounded-full" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            404 - Página não encontrada
          </h2>
          <p className="text-md text-muted-foreground">
            Ops! Parece que você se perdeu no caminho para a festa. Não se
            preocupe, nós te levaremos de volta!
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </main>
      <footer className="w-full p-6 text-center text-sm text-muted-foreground relative z-10 border-t border-border">
        © 2024 Convite360. Todos os direitos reservados.
      </footer>
    </div>
  );
}
