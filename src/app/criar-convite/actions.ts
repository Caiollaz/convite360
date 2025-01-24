'use server';

import { prisma } from "@/lib/prisma";
import { FormData } from "@/interfaces/schema";

export async function createInvitation(data: FormData & { 
  invitationId: string, 
  color: string,
  themeId: string,
  themeName: string,
  themeImage: string 
}) {
  try {
    return await prisma.invitation.create({
      data: {
        id: data.invitationId,
        title: data.title,
        startDate: new Date(data.startDate),
        eventType: data.eventType,
        location: data.location,
        description: data.description,
        name: data.name,
        email: data.email,
        phone: data.phone,
        terms: data.terms,
        color: data.color,
        themeId: data.themeId,
        themeName: data.themeName,
        themeImage: data.themeImage,
      },
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    throw new Error('Failed to create invitation');
  }
}
