import { ImageResponse } from "@vercel/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { name, eventTitle, eventDate, location, eventType, buttonColor } = await request.json();

    const image = await new ImageResponse(
      <div
        style={{
          width: "800px",
          height: "1131px",
          padding: "40px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              color: buttonColor,
              margin: "0",
              textAlign: "center",
            }}
          >
            {eventTitle}
          </h1>
          <p style={{ fontSize: "24px", color: "#666", margin: "0" }}>
            {eventDate}
          </p>
          <p style={{ fontSize: "20px", color: "#666", margin: "0" }}>
            {location}
          </p>
          <p style={{ fontSize: "18px", color: "#666", margin: "0" }}>
            {eventType}
          </p>
        </div>
        <p style={{ fontSize: "16px", color: "#666", margin: "0" }}>
          Convite para: {name}
        </p>
      </div>,
      {
        width: 800,
        height: 1131,
      }
    );

    return image;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
