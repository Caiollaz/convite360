import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

export async function POST(request: Request) {
  try {
    const { html } = await request.json();

    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    
    // Set the content and wait for the content to be loaded
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    // Return the PDF as a response
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
