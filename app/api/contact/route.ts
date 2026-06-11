import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function getOAuth2Client() {
  const client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return client;
}

function buildRaw(to: string, subject: string, html: string) {
  const from = `WIDER <${process.env.GMAIL_USER}>`;
  const msg = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${to}`,
    `Subject: =?utf-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ].join("\r\n");
  return Buffer.from(msg).toString("base64url");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, product, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const auth = getOAuth2Client();
    const gmail = google.gmail({ version: "v1", auth });

    const subject = `Nuova richiesta da ${name}${product ? ` — ${product}` : ""}`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
        <h2 style="font-size: 20px; margin-bottom: 24px;">Nuova richiesta dal sito WIDER</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nome</td><td>${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          ${product ? `<tr><td style="padding: 8px 0; font-weight: bold;">Prodotto</td><td>${product}</td></tr>` : ""}
          ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Messaggio</td><td>${message}</td></tr>` : ""}
        </table>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">Rispondi direttamente a questa email per contattare ${name}.</p>
      </div>
    `;

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: buildRaw(process.env.GMAIL_USER!, subject, html) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
