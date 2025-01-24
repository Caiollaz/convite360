import { ImageResponse } from "@vercel/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { html } = await request.json();

    // Convert HTML to an image using @vercel/og
    const image = await new ImageResponse(
      <div
        style={{
          width: "800px",
          height: "1131px", // A4 proportion
          padding: "40px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />,
      {
        width: 800,
        height: 1131,
      }
    );

    // Return the image as a response
    return image;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
