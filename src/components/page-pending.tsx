import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export function PagePending() {
    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle className="text-center flex flex-col items-center gap-4">
                    <Clock className="w-16 h-16 text-yellow-500" />
                    <span className="text-2xl">Pagamento Pendente</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-center">Seu convite foi criado, mas o pagamento ainda está sendo processado.</p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <AlertCircle className="w-5 h-5" />
                    <p>O processo pode levar alguns minutos para ser concluído.</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <RefreshCw className="w-5 h-5" />
                    <p>Atualize esta página em alguns instantes para verificar o status.</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
                <Link href="/">
                    <Button variant="outline">Voltar para a página inicial</Button>
                </Link>
                <Button onClick={() => window.location.reload()}>Atualizar status</Button>
            </CardFooter>
        </Card>
    )
}

