"use client";
import { useState } from "react";
import Link from "next/link";

const URLS = {
  it: "https://app.legalblink.it/api/documents/6a2f270b0000de0029a6d9de/privacy-policy-per-siti-web-o-e-commerce-it",
  en: "https://app.legalblink.it/api/documents/6a2f270b0000de0029a6d9de/privacy-policy-per-siti-web-o-e-commerce-en",
};

export default function PrivacyPage() {
  const [lang, setLang] = useState<"it" | "en">("it");

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #04210E; }

        .pp-header {
          background: #04210E;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .pp-back {
          color: rgba(255,253,244,0.6);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .pp-back:hover { color: #FFFDF4; }

        .pp-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #FFFDF4;
          letter-spacing: 0.08em;
          text-decoration: none;
        }

        .pp-lang {
          display: flex;
          gap: 8px;
        }
        .pp-lang button {
          background: none;
          border: 1px solid rgba(255,253,244,0.25);
          color: rgba(255,253,244,0.5);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pp-lang button.active {
          background: rgba(255,253,244,0.1);
          border-color: rgba(255,253,244,0.5);
          color: #FFFDF4;
        }

        .pp-iframe-wrap {
          width: 100%;
          height: calc(100vh - 65px);
          background: white;
        }
        .pp-iframe-wrap iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      `}</style>

      <header className="pp-header">
        <Link href="/" className="pp-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {lang === "it" ? "Torna al sito" : "Back to site"}
        </Link>

        <Link href="/" className="pp-logo">WIDER</Link>

        <div className="pp-lang">
          <button className={lang === "it" ? "active" : ""} onClick={() => setLang("it")}>IT</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <div className="pp-iframe-wrap">
        <iframe src={URLS[lang]} title="Privacy Policy" />
      </div>
    </>
  );
}
