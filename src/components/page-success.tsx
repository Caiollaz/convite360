import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

export function PageSuccess() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-center flex flex-col items-center gap-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <span className="text-2xl">Obrigado!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center">
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
          <Button>Voltar para a página inicial</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
