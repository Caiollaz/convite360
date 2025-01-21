import * as z from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    startDate: z.string().min(1, "Data do evento é obrigatória"),
    eventType: z.string().min(1, "Tipo do evento é obrigatório"),
    location: z.string().min(1, "Local é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    phone: z.string().min(10, "Telefone inválido").max(15, "Telefone inválido"),
    terms: z.boolean().refine((val) => val === true, "Você precisa aceitar os termos"),
})

export type FormData = z.infer<typeof formSchema>