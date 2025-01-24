import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const location = searchParams.get("location");
  const description = searchParams.get("description");
  const themeImage = searchParams.get("themeImage");
  const color = searchParams.get("color") ?? undefined;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          {/* Background Image */}
          {themeImage && (
            <img
              src={themeImage}
              alt="Theme"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Content Overlay */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            <h1 style={{ fontSize: 60, color, marginBottom: "20px" }}>
              {title}
            </h1>
            <p style={{ fontSize: 40, color: "#666", marginBottom: "10px" }}>
              {date}
            </p>
            <p style={{ fontSize: 30, color: "#666", marginBottom: "20px" }}>
              {location}
            </p>
            <p style={{ fontSize: 24, color: "#666", maxWidth: "600px" }}>
              {description}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
