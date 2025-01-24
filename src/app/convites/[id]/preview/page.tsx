import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PreviewContent } from "../../components/PreviewContent";
import { Metadata } from "next";
import { Suspense } from "react";
import { PartyPopper } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return {
        title: "Convite não encontrado",
        description: "O convite que você está procurando não existe.",
      };
    }

    const invitation = await prisma.invitation.findUnique({
      where: { id },
      select: { title: true, description: true },
    });

    if (!invitation) {
      return {
        title: "Convite não encontrado",
        description: "O convite que você está procurando não existe.",
      };
    }

    return {
      title: `${invitation.title} - Meu Convite`,
      description: invitation.description,
    };
  } catch (error) {
    return {
      title: "Erro - Meu Convite",
      description: "Ocorreu um erro ao carregar o convite.",
    };
  }
}

function LoadingPreview() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-64 bg-primary/10 rounded-lg mb-4"></div>
          <div className="h-8 bg-primary/10 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-primary/10 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id },
    });

    if (!invitation) {
      notFound();
    }

    return (
      <div className="max-w-full min-h-screen bg-background text-foreground">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <PartyPopper
              key={i}
              className="absolute text-primary/10 animate-float"
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
        <div className="relative">
          <header className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href={"/"}>
              <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Convite360
              </h1>
            </Link>
            <ThemeToggle />
          </header>
          <main className="container mx-auto px-4 py-8">
            <div className="w-full max-w-2xl mx-auto">
              <Suspense fallback={<LoadingPreview />}>
                <PreviewContent invitation={invitation} />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-full min-h-screen bg-background text-foreground">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ops! Algo deu errado
            </h1>
            <p className="text-gray-400">
              Não foi possível carregar o convite. Tente novamente mais tarde.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
