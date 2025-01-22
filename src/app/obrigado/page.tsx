"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageSuccess } from "@/components/page-success";
import { PageFailure } from "@/components/page-failure";
import { PagePending } from "@/components/page-pending";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const renderThankYouComponent = () => {
    switch (status) {
      case "sucesso":
        return <PageSuccess />;
      case "falha":
        return <PageFailure />;
      case "pendente":
        return <PagePending />;
      default:
        return <></>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      <header className="w-full p-6 flex justify-between items-center relative z-10">
        <Link href="/">
          <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Convite360
          </h1>
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <Suspense fallback={<div>Loading...</div>}>
          {renderThankYouComponent()}
        </Suspense>
      </main>
      <footer className="w-full p-6 text-center text-sm text-muted-foreground relative z-10 border-t border-border">
        © 2024 Convite360. Todos os direitos reservados.
      </footer>
    </div>
  );
}
