import { ImageResponse } from "@vercel/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const {
      name,
      eventTitle,
      eventDate,
      location,
      eventType,
      buttonColor
    } = await request.json();

    const image = await new ImageResponse(
      (
        <div
          style={{
            width: "800px",
            height: "1131px",
            padding: "60px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "200px",
              background: `linear-gradient(to bottom, ${buttonColor}22, transparent)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "200px",
              background: `linear-gradient(to top, ${buttonColor}22, transparent)`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              textAlign: "center",
              maxWidth: "600px",
              padding: "40px",
              border: `2px solid ${buttonColor}22`,
              borderRadius: "16px",
              backgroundColor: "white",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: buttonColor,
                textTransform: "uppercase",
                letterSpacing: "2px",
                opacity: "0.9",
              }}
            >
              {eventType}
            </div>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: buttonColor,
                margin: "0",
                lineHeight: "1.2",
                textAlign: "center",
              }}
            >
              {eventTitle}
            </h1>
            <div
              style={{
                width: "80px",
                height: "3px",
                background: buttonColor,
                opacity: "0.5",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                color: "#555",
              }}
            >
              <p style={{ fontSize: "28px", margin: "0", fontWeight: "500" }}>
                {eventDate}
              </p>
              <p style={{ fontSize: "24px", margin: "0", color: "#666" }}>
                {location}
              </p>
            </div>
            <div
              style={{
                marginTop: "16px",
                fontSize: "20px",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              Convite especial de:
              <div
                style={{
                  fontSize: "24px",
                  color: buttonColor,
                  marginTop: "8px",
                  fontWeight: "500",
                }}
              >
                {name}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 1131,
        headers: {
          "content-type": "image/png",
          "cache-control": "public, max-age=0, must-revalidate",
        },
      }
    );

    const buffer = await image.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
