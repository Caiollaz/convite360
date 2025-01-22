import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Clock, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export function PagePending() {
  return (
    <Card className="w-full max-w-xl bg-card/50 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-center flex flex-col items-center gap-4">
          <div className="relative">
            <Clock className="w-20 h-20 text-yellow-500 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-500 opacity-20 blur-xl rounded-full" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Pagamento Pendente
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-lg">
          Seu convite foi criado, mas o pagamento ainda está sendo processado.
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <AlertCircle className="w-5 h-5" />
          <p>O processo pode levar alguns minutos para ser concluído.</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <RefreshCw className="w-5 h-5" />
          <p>
            Atualize esta página em alguns instantes para verificar o status.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Link href="/">
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Página inicial
          </Button>
        </Link>
        <Button
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar status
        </Button>
      </CardFooter>
    </Card>
  );
}
