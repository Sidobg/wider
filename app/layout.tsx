import type { Metadata } from "next";
import "./globals.css";

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
        <script type="text/javascript" src="https://app.legalblink.it/api/scripts/lb_cs.js" async />
        <script id="lb_cs" type="text/javascript" dangerouslySetInnerHTML={{ __html: 'lb_cs("6a2f270b0000de0029a6d9e4");' }} />
      </body>
    </html>
  );
}
