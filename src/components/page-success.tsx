import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

export function PageSuccess() {
  return (
    <Card className="w-full max-w-xl bg-card/50 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-center flex flex-col items-center gap-4">
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-green-500" />
            <div className="absolute inset-0 bg-green-500 opacity-20 blur-xl rounded-full" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            Obrigado!
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-lg">
          Seu convite foi criado com sucesso e o pagamento foi processado.
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Mail className="w-5 h-5" />
          <p>Verifique seu e-mail para mais detalhes.</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Calendar className="w-5 h-5" />
          <p>Seu evento está agora no nosso sistema.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            Voltar para a página inicial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
