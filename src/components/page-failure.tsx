import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

export function PageFailure() {
  return (
    <Card className="w-full max-w-xl bg-card/50 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-center flex flex-col items-center gap-4">
          <div className="relative">
            <XCircle className="w-20 h-20 text-red-500" />
            <div className="absolute inset-0 bg-red-500 opacity-20 blur-xl rounded-full" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Ops! Algo deu errado.
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-lg">
          Infelizmente, houve um problema ao processar seu pagamento.
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <AlertTriangle className="w-5 h-5" />
          <p>Por favor, tente novamente ou entre em contato com o suporte.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Link href="/">
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Tentar novamente
        </Button>
      </CardFooter>
    </Card>
  );
}
