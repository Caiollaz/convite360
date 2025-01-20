"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { colors } from "@/interfaces/colors";
import { themes } from "@/interfaces/themes";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function InvitationForm() {
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
  });

  console.log(formData)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventType: value }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleThemeChange = (theme: string) => {
    setFormData((prev) => ({ ...prev, theme }));
  };

  const selectedTheme =
    themes.find((theme) => theme.id === formData.theme) || themes[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <h1 className="font-leckerli text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Convite360
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-8">
              Crie um convite digital para o seu evento
            </p>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
              <img
                src={selectedTheme.image || "/placeholder.svg"}
                alt={selectedTheme.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <h2 className="text-center text-3xl font-bold mb-2" style={{ color: formData.color }}>
                  {formData.title}
                </h2>
                <div className="flex flex-col items-center">
                  <p className="text-lg mb-2" style={{ color: formData.color }}>
                    {formData.startDate
                      ? new Date(formData.startDate).toLocaleString("pt-BR", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })
                      : ""}
                  </p>
                  <p className="mb-2" style={{ color: formData.color }}>
                    {formData.eventType}
                  </p>
                  <p className="mb-2" style={{ color: formData.color }}>
                    {formData.location}
                  </p>
                  <p className="text-sm" style={{ color: formData.color }}>
                    {formData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Sobre o evento
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Nome do evento"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Início</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Fim</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <RadioGroup
                      value={formData.eventType}
                      onValueChange={handleRadioChange}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Presencial" id="presencial" />
                        <Label htmlFor="presencial">Presencial</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Online" id="online" />
                        <Label htmlFor="online">Online</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Local</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Link ou endereço"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Escreva sobre os detalhes do evento"
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
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
                      name="name"
                      placeholder="Nome completo"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="exemplo@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(99) 99999-9999"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-updates" />
                    <Label htmlFor="email-updates" className="text-sm">
                      Aceito receber atualizações e promoções por e-mail
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms-updates" />
                    <Label htmlFor="sms-updates" className="text-sm">
                      Aceito receber atualizações e promoções por SMS
                    </Label>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Gerar convite
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
