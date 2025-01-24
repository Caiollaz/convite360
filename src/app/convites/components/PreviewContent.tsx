import { Calendar, MapPinned, Ticket } from "lucide-react";
import { Invitation } from "@prisma/client";

interface PreviewContentProps {
  invitation: Invitation;
}

export function PreviewContent({ invitation }: PreviewContentProps) {
  return (
    <div className="w-full h-full bg-white rounded-lg">
      <div className="max-w-2xl mx-auto flex justify-center items-center">
        <img
          src={invitation.themeImage || "/placeholder.svg"}
          alt={invitation.themeName || ""}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="max-w-2xl mx-auto px-6 py-8 bg-white text-gray-800">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: invitation.color }}
        >
          {invitation.title}
        </h1>
        <div className="space-y-4">
          {invitation.startDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <p className="text-sm">
                {new Date(invitation.startDate).toLocaleString("pt-BR", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>
          )}

          {invitation.eventType && (
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              <p className="text-sm">Evento {invitation.eventType}</p>
            </div>
          )}

          {invitation.location && (
            <div className="flex items-center gap-2">
              <MapPinned className="w-5 h-5" />
              <p className="text-sm">Local: {invitation.location}</p>
            </div>
          )}

          {invitation.description && (
            <div className="text-sm break-words pt-8 text-gray-500">
              {invitation.description}
            </div>
          )}
        </div>
      </div>
      <div
        className="w-full p-2 text-center text-white"
        style={{ backgroundColor: `${invitation.color}80` }}
      >
        <p className="text-sm">
          Criado por {invitation.name}
        </p>
      </div>
    </div>
  );
}
