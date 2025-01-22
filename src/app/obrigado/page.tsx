"use client";

import { PageFailure } from "@/components/page-failure";
import { PagePending } from "@/components/page-pending";
import { PageSuccess } from "@/components/page-success";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Convite360
          </h1>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Suspense fallback={<div>Carregando...</div>}>
          <StatusContent />
        </Suspense>
      </main>

      <footer className="w-full p-4 text-center text-sm text-muted-foreground">
        © 2023 Convite360. Todos os direitos reservados.
      </footer>
    </div>
  );
}

function StatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  if (status === "sucesso") {
    return <PageSuccess />;
  } else if (status === "falha") {
    return <PageFailure />;
  } else if (status === "pendente") {
    return <PagePending />;
  } else {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 border-opacity-50"></div>
      </div>
    );
  }

  return null;
}
