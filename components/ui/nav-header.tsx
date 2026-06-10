"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type NavItem = { label: string; href: string };

type Position = { left: number; width: number; opacity: number };

export function NavHeader({ items, scrolled = false }: { items: NavItem[]; scrolled?: boolean }) {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full p-1"
      style={{
        border: `1px solid ${scrolled ? "rgba(93,84,73,0.25)" : "rgba(255,253,244,0.35)"}`,
      }}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab key={item.href} href={item.href} setPosition={setPosition} scrolled={scrolled}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} scrolled={scrolled} />
    </ul>
  );
}

function Tab({
  children,
  href,
  setPosition,
  scrolled,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  scrolled: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      style={{
        position: "relative",
        zIndex: 10,
        display: "block",
        cursor: "pointer",
        padding: "7px 18px",
        fontSize: "11px",
        fontWeight: 400,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        mixBlendMode: "difference",
        color: scrolled ? "var(--verde)" : "var(--panna)",
        whiteSpace: "nowrap",
      }}
    >
      <a href={href} style={{ textDecoration: "none", color: "inherit" }}>{children}</a>
    </li>
  );
}

function Cursor({ position, scrolled }: { position: Position; scrolled: boolean }) {
  return (
    <motion.li
      animate={position}
      style={{
        position: "absolute",
        zIndex: 0,
        height: "32px",
        borderRadius: "9999px",
        background: scrolled ? "var(--verde)" : "var(--panna)",
      }}
    />
  );
}
