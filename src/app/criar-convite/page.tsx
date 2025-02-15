"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useMercadoPago from "@/hooks/useMercadoPago";
import { colors } from "@/interfaces/colors";
import { FormData, formSchema } from "@/interfaces/schema";
import { themes } from "@/interfaces/themes";
import { createInvitation } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, MapPinned, Maximize2, Ticket, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function InvitationForm() {
  const { createMercadoPagoCheckout } = useMercadoPago();
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    eventType: "",
    location: "",
    description: "",
    color: colors[0],
    theme: themes[0].id,
    name: "",
    email: "",
    phone: "",
    terms: false,
  });

  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J"))) {
  //       e.preventDefault()
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown)
  //   return () => window.removeEventListener("keydown", handleKeyDown)
  // }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValue(name as keyof FormData, value);
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventType: value }));
    setValue("eventType", value);
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleThemeChange = (theme: string) => {
    const newTheme = themes.find((t) => t.id === theme) || themes[0];
    setSelectedTheme(newTheme);
    setFormData((prev) => ({ ...prev, theme }));
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const invitationId = uuidv4();

      if (!selectedTheme) {
        toast.error("Por favor, selecione um tema");
        return;
      }

      await createInvitation({
        ...data,
        invitationId,
        color: formData.color,
        themeId: selectedTheme.id,
        themeName: selectedTheme.name,
        themeImage: selectedTheme.image,
      });

      await createMercadoPagoCheckout({
        id: invitationId,
        email: data.email,
        name: data.name,
        phoneNumber: data.phone,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar convite. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const PreviewContent = () => (
    <div className="w-full h-full bg-white rounded-lg">
      <div className="w-full flex justify-center items-center">
        <img
          src={selectedTheme.image || "/placeholder.svg"}
          alt={selectedTheme.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="max-w-2xl mx-auto px-6 py-8 bg-white text-gray-800">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: formData.color }}
        >
          {formData.title || "Título do Evento"}
        </h1>
        <div className="space-y-4">
          {formData.startDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <p className="text-sm">
                {new Date(formData.startDate).toLocaleString("pt-BR", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>
          )}

          {formData.eventType && (
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              <p className="text-sm">Evento {formData.eventType}</p>
            </div>
          )}

          {formData.location && (
            <div className="flex items-center gap-2">
              <MapPinned className="w-5 h-5" />
              <p className="text-sm">Local: {formData.location}</p>
            </div>
          )}

          {formData.description && (
            <div className="text-sm break-words pt-8 text-gray-500">
              {formData.description}
            </div>
          )}
        </div>
      </div>
      <div
        className="w-full p-2 text-center text-white"
        style={{ backgroundColor: `${formData.color}80` }}
      >
        <p className="text-sm">
          Criado por {formData.name || "Nome do Organizador"}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onSelect={(e) => e.preventDefault()}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between my-6">
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <h1 className="font-leckerli text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Convite360
              </h1>
            </Link>
          </div>
          <ThemeToggle />
        </div>

        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-8">
              Crie um convite digital para o seu evento
            </p>
            <div className="bg-muted rounded-lg overflow-hidden relative shadow-md">
              <PreviewContent />
              <Button
                className="absolute bottom-4 right-4"
                onClick={() => setShowFullPreview(true)}
                aria-label="Visualizar em tela cheia"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Sobre o evento
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Nome do evento"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Data do Evento</Label>
                      <Input
                        id="startDate"
                        {...register("startDate")}
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={errors.startDate ? "border-red-500" : ""}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-red-500">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <RadioGroup
                        value={formData.eventType}
                        onValueChange={handleRadioChange}
                        className="flex gap-4"
                        style={{ marginTop: "1rem" }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="presencial" id="presencial" />
                          <Label htmlFor="presencial">Presencial</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online</Label>
                        </div>
                      </RadioGroup>
                      {errors.eventType && (
                        <p className="text-sm text-red-500">
                          {errors.eventType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Local</Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="Link ou endereço"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={errors.location ? "border-red-500" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Escreva sobre os detalhes do evento"
                      className={`min-h-[100px] ${
                        errors.description ? "border-red-500" : ""
                      }`}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personalização</h2>

                  <div className="space-y-2">
                    <Label>Cor principal</Label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full transition-transform ${
                            formData.color === color
                              ? "scale-110 ring-2 ring-primary"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          type="button"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tema do evento</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          className={`aspect-video relative rounded-lg overflow-hidden transition-all ${
                            formData.theme === theme.id
                              ? "ring-2 ring-primary scale-95"
                              : "hover:scale-95"
                          }`}
                          onClick={() => handleThemeChange(theme.id)}
                          type="button"
                        >
                          <img
                            src={theme.image || "/placeholder.svg"}
                            alt={theme.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60" />
                          <span className="absolute inset-0 flex items-center justify-center text-sm text-white">
                            {theme.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Dados para contato</h2>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        {...register("email")}
                        type="email"
                        placeholder="exemplo@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="(99) 99999-9999"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({
                          ...prev,
                          terms: checked === true,
                        }));
                        setValue("terms", checked === true);
                      }}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Li e concordo com os{" "}
                      <a href="#" className="text-primary hover:underline">
                        Termos e Condições
                      </a>{" "}
                      e com a{" "}
                      <a href="#" className="text-primary hover:underline">
                        Política de Privacidade
                      </a>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-red-500">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-r-foreground" />
                      Gerando convite...
                    </>
                  ) : (
                    "Gerar convite"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {showFullPreview && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background rounded-lg shadow-lg overflow-hidden max-w-2xl w-full mx-4">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold">Visualização completa</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFullPreview(false)}
                aria-label="Fechar visualização"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <PreviewContent />
            </div>
          </div>
        </div>
      )}

      <footer className="w-full p-6 text-center text-sm text-muted-foreground relative z-10 border-t border-border">
        2024 Convite360. Todos os direitos reservados.
      </footer>
    </div>
  );
}
