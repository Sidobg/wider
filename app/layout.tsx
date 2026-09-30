import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "WIDER — Un universo da vivere",
  description: "WIDER è un invito a cambiare prospettiva. A vivere le esperienze prima di raccontarle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* Conteggio delle visite di Vercel. Senza cookie e senza
            identificatori sul dispositivo: lo script parte dal dominio del
            sito (/_vercel/insights), non da un server terzo. Per questo non
            passa dal consenso cookie qui sotto — non c'e' niente da
            consentire. Resta pero' un trattamento e va dichiarato
            nell'informativa, che per questo sito e' un documento Legal Blink
            e si aggiorna da li'. */}
        <Analytics />

        <script type="text/javascript" src="https://app.legalblink.it/api/scripts/lb_cs.js" async />
        <script id="lb_cs" type="text/javascript" dangerouslySetInnerHTML={{ __html: 'lb_cs("6a2f270b0000de0029a6d9e4");' }} />
      </body>
    </html>
  );
}
