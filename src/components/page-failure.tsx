import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, XCircle } from "lucide-react";
import Link from "next/link";

export function PageFailure() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-center flex flex-col items-center gap-4">
          <XCircle className="w-16 h-16 text-red-500" />
          <span className="text-2xl">Ops! Algo deu errado.</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center">
          Infelizmente, houve um problema ao processar seu pagamento.
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <AlertTriangle className="w-5 h-5" />
          <p>Por favor, tente novamente ou entre em contato com o suporte.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
