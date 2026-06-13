"use client";

import React, { useId } from "react";

// GlowButton — adattato alla palette WIDER (verde #04210E / azzurro #C2E5FF)
export function GlowButton({
  children = "Guida alle taglie",
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const id = useId().replace(/:/g, "");
  const f1 = `gb1-${id}`;
  const f2 = `gb2-${id}`;
  const f3 = `gb3-${id}`;

  const grad1 = "linear-gradient(90deg,#C2E5FF 30%,#0000 50%,#2f8f5b 70%)";
  const grad2 = "linear-gradient(90deg,#d6eeff 20%,#0000 45% 55%,#4aa873 80%)";
  const grad3 = "linear-gradient(90deg,#eaf6ff 30%,#0000 45% 55%,#84cca0 70%)";

  return (
    <button
      type="button"
      onClick={onClick}
      className="glow-btn group"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        padding: "0 2.4em",
        borderRadius: 999,
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter width="300%" x="-100%" height="300%" y="-100%" id={f1}>
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 9 0" />
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id={f2}>
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id={f3}>
          <feColorMatrix values="1 0 0 0.2 0 0 1 0 0.2 0 0 0 1 0.2 0 0 0 0 2 0" />
        </filter>
      </svg>

      {/* Glow esterno */}
      <span
        style={{ position: "absolute", inset: 0, borderRadius: 999, overflow: "hidden", zIndex: -3, opacity: 0.55, filter: `blur(1.4em) url(#${f1})` }}
      >
        <span className="glow-rot" style={{ position: "absolute", inset: "-150%", background: grad1 }} />
      </span>

      {/* Glow medio */}
      <span
        style={{ position: "absolute", inset: -2, borderRadius: 999, overflow: "hidden", zIndex: -3, opacity: 0.5, filter: `blur(0.25em) url(#${f2})` }}
      >
        <span className="glow-rot" style={{ position: "absolute", inset: "-150%", background: grad2 }} />
      </span>

      {/* Bordo */}
      <span style={{ position: "absolute", inset: 0, borderRadius: 999, zIndex: -2, background: "rgba(0,0,0,0.35)" }} />

      {/* Glow interno */}
      <span
        style={{ position: "absolute", inset: 1, borderRadius: 999, overflow: "hidden", zIndex: -2, opacity: 0.5, filter: `blur(2px) url(#${f3})` }}
      >
        <span className="glow-rot" style={{ position: "absolute", inset: "-150%", background: grad3 }} />
      </span>

      {/* Superficie */}
      <span style={{ position: "absolute", inset: 2, borderRadius: 999, zIndex: -1, background: "#04210E" }} />

      <span
        style={{
          position: "relative",
          color: "#FFFDF4",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </button>
  );
}

export default GlowButton;
