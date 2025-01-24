import { ImageResponse } from "@vercel/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { name, eventTitle, eventDate, location, eventType, buttonColor } = await request.json();

    // Generate image using proper JSX
    const image = await new ImageResponse(
      <div
        style={{
          width: "800px",
          height: "1131px", // A4 proportion
          padding: "40px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: "48px", color: buttonColor, marginBottom: "24px" }}>
          {eventTitle}
        </h1>
        <div style={{ fontSize: "24px", color: "#666", marginBottom: "16px" }}>
          {eventDate}
        </div>
        <div style={{ fontSize: "20px", color: "#666", marginBottom: "24px" }}>
          {location}
        </div>
        <div style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>
          {eventType}
        </div>
        <div style={{ fontSize: "16px", color: "#666" }}>
          Convite para: {name}
        </div>
      </div>,
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
