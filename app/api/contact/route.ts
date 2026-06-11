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

function buildRaw(to: string, subject: string, html: string, customerName: string, customerEmail: string) {
  const from = `${customerName} via WIDER <${process.env.GMAIL_USER}>`;
  const msg = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${customerName} <${customerEmail}>`,
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
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F3EE;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:#04210E;padding:36px 40px;border-radius:12px 12px 0 0;">
            <img src="https://wider-rho.vercel.app/logo.jpg" alt="WIDER" width="72" height="72"
              style="border-radius:8px;display:block;margin:0 auto 16px;" />
            <p style="margin:0;color:rgba(255,253,244,0.5);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">
              Nuova richiesta dal sito
            </p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#FFFDF4;padding:40px;">

            <h2 style="margin:0 0 8px;font-size:22px;font-weight:400;color:#04210E;font-family:Georgia,serif;">
              ${name}
            </h2>
            <p style="margin:0 0 32px;font-size:13px;color:#8C8479;">
              <a href="mailto:${email}" style="color:#8C8479;text-decoration:none;">${email}</a>
            </p>

            <table width="100%" cellpadding="0" cellspacing="0">
              ${product ? `
              <tr>
                <td style="padding:14px 0;border-top:1px solid #EAE6DF;">
                  <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#B0A89E;">Prodotto di interesse</p>
                  <p style="margin:0;font-size:15px;color:#04210E;font-weight:500;">${product}</p>
                </td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding:14px 0;border-top:1px solid #EAE6DF;">
                  <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#B0A89E;">Messaggio</p>
                  <p style="margin:0;font-size:14px;color:#3D3830;line-height:1.7;">${message}</p>
                </td>
              </tr>` : ""}
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
              <tr>
                <td align="center">
                  <a href="mailto:${email}"
                    style="display:inline-block;background:#04210E;color:#FFFDF4;text-decoration:none;
                           font-size:11px;letter-spacing:0.14em;text-transform:uppercase;
                           padding:14px 32px;border-radius:4px;">
                    Rispondi a ${name}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#EAE6DF;padding:20px 40px;border-radius:0 0 12px 12px;">
            <p style="margin:0;font-size:10px;color:#B0A89E;letter-spacing:0.1em;text-transform:uppercase;">
              WIDER — weare.wider &nbsp;·&nbsp; Richiesta ricevuta dal form sul sito
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `;

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: buildRaw(process.env.GMAIL_USER!, subject, html, name, email) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
