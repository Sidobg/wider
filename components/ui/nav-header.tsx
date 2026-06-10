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
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-xs uppercase tracking-widest mix-blend-difference"
      style={{ color: scrolled ? "var(--verde)" : "var(--panna)" }}
    >
      <a href={href}>{children}</a>
    </li>
  );
}

function Cursor({ position, scrolled }: { position: Position; scrolled: boolean }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full"
      style={{ background: scrolled ? "var(--verde)" : "var(--panna)" }}
    />
  );
}
