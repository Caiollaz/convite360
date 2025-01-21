"use client"

import { PageFailure } from "@/components/page-failure";
import { PagePending } from "@/components/page-pending";
import { PageSuccess } from "@/components/page-success";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
    const searchParams = useSearchParams()
    const status = searchParams.get("status")

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="w-full p-4 flex justify-between items-center">
                <h1 className="font-leckerli text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Convite360
                </h1>
                <ThemeToggle />
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
                {status === "sucesso" ? (
                    <PageSuccess />
                ) : status === "falha" ? (
                    <PageFailure />
                ) : status === "pendente" ? (
                    <PagePending />
                ) : (
                    <></>
                )}
            </main>

            <footer className="w-full p-4 text-center text-sm text-muted-foreground">
                © 2023 Convite360. Todos os direitos reservados.
            </footer>
        </div>
    )
}

