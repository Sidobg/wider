"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { NavHeader } from "@/components/ui/nav-header";
import { TextEffect } from "@/components/ui/text-effect";
import { WorldMap } from "@/components/ui/map";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import { t, type Lang } from "@/lib/translations";

const MILANO = { lat: 45.4642, lng: 9.19, label: "Milano" };
const communityDots = [
  { start: MILANO, end: { lat: 48.8566, lng: 2.3522, label: "Parigi" } },
  { start: MILANO, end: { lat: 51.5074, lng: -0.1278, label: "Londra" } },
  { start: MILANO, end: { lat: 40.7128, lng: -74.006, label: "New York" } },
  { start: MILANO, end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" } },
  { start: MILANO, end: { lat: 52.52, lng: 13.405, label: "Berlino" } },
  { start: MILANO, end: { lat: 25.2048, lng: 55.2708, label: "Dubai" } },
];

const galleryImgs = [
  "/gallery/IMG_8178.jpg",
  "/gallery/IMG_8190.jpg",
  "/gallery/IMG_8294.jpg",
  "/gallery/IMG_8448.jpg",
  "/gallery/IMG_8691.jpg",
  "/gallery/IMG_8694.jpg",
  "/gallery/IMG_8759.jpg",
  "/gallery/IMG_8802.jpg",
  "/gallery/IMG_8848.jpg",
  "/gallery/IMG_8908.jpg",
  "/gallery/IMG_9058.jpg",
  "/gallery/IMG_9082.jpg",
  "/gallery/IMG_9103.jpg",
  "/gallery/IMG_9198.jpg",
  "/gallery/IMG_9286.jpg",
  "/gallery/IMG_9320.jpg",
  "/gallery/IMG_9470.jpg",
];

const productSlugs = [
  { slug: "cappello-beige",    count: 3 },
  { slug: "cappello-verde",    count: 4 },
  { slug: "cowboy",            count: 9 },
  { slug: "foulard",           count: 4 },
  { slug: "long-sleeve",       count: 6 },
  { slug: "t-shirt-verde",    count: 3 },
  { slug: "t-shirt-bianca",   count: 4 },
];
const productPhotos: string[][] = productSlugs.map((s) =>
  Array.from({ length: s.count }, (_, i) => `/products/${s.slug}/${i + 1}.jpg`)
);

function ProductCard({
  nome,
  photos,
  cta,
  onRequest,
  onZoom,
}: {
  nome: string;
  photos: string[];
  cta: string;
  onRequest: () => void;
  onZoom: (photos: string[], idx: number, nome: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const n = photos.length;
  const go = (e: React.MouseEvent, dir: number) => {
    e.stopPropagation();
    setIdx((i) => (i + dir + n) % n);
  };
  const dot = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    setIdx(i);
  };
  const zoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    onZoom(photos, idx, nome);
  };

  return (
    <div className="dest-card fade-up" onClick={onRequest}>
      {photos.map((src, i) => (
        <div
          key={i}
          className="dest-card-bg"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={nome}
            fill
            className="object-cover"
            sizes="(max-width: 560px) 90vw, (max-width: 1024px) 45vw, 380px"
          />
        </div>
      ))}
      <div className="dest-card-overlay" />

      <button className="dest-card-zoom" onClick={zoom} aria-label="Ingrandisci foto">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>

      {n > 1 && (
        <>
          <button className="dest-card-nav prev" onClick={(e) => go(e, -1)} aria-label="Foto precedente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="dest-card-nav next" onClick={(e) => go(e, 1)} aria-label="Foto successiva">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="dest-card-dots" onClick={(e) => e.stopPropagation()}>
            {photos.map((_, i) => (
              <span
                key={i}
                className={i === idx ? "on" : ""}
                onClick={(e) => dot(e, i)}
              />
            ))}
          </div>
        </>
      )}

      <div className="dest-card-content">
        <div className="dest-card-nome">{nome}</div>
        <button className="dest-card-btn">
          <span>{cta}</span>
          <svg className="dest-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang,           setLang]           = useState<Lang>("it");
  const [navScrolled,    setNavScrolled]    = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [modalProduct,   setModalProduct]   = useState("");
  const [cardSize,       setCardSize]       = useState({ w: 480, h: 320 });
  const [manifestoInView, setManifestoInView] = useState(false);
  const [vaporFont,      setVaporFont]      = useState("60px");
  const [formSending,    setFormSending]    = useState(false);
  const [lightbox,       setLightbox]       = useState<{ photos: string[]; idx: number; nome: string } | null>(null);

  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const tr = t[lang];
  const navItems = [
    { label: tr.nav.brand,      href: "#brand"      },
    { label: tr.nav.collezione, href: "#collezione" },
    { label: tr.nav.gallery,    href: "#gallery"    },
    { label: tr.nav.community,  href: "#community"  },
  ];
  const galleryItems: CardStackItem[] = tr.gallery.items.map((item, i) => ({
    id: i + 1,
    title: item.title,
    description: item.description,
    imageSrc: galleryImgs[i],
  }));
  const products = tr.collezione.products.map((p, i) => ({
    nome: p.nome,
    photos: productPhotos[i] ?? [],
  }));

  const manifestoRef = useRef<HTMLHeadingElement>(null);

  const heroWrapperRef    = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const heroBgRef         = useRef<HTMLDivElement>(null);
  const heroRightRef      = useRef<HTMLDivElement>(null);
  const scrollIndRef      = useRef<HTMLDivElement>(null);
  const videoOverlayRef   = useRef<HTMLDivElement>(null);
  const valoriSectionRef  = useRef<HTMLElement>(null);
  const canvasRef         = useRef<HTMLCanvasElement>(null);

  // Responsive card size
  useEffect(() => {
    const update = () => {
      const mob = window.innerWidth < 768;
      setCardSize({ w: mob ? 290 : 480, h: mob ? 195 : 320 });
      const size = Math.round(Math.min(64, Math.max(22, window.innerWidth / 13)));
      setVaporFont(size + "px");
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Hero scroll expansion
  useEffect(() => {
    const updateHero = () => {
      const wrapper = heroWrapperRef.current;
      const mc  = mediaContainerRef.current;
      const bg  = heroBgRef.current;
      const rgt = heroRightRef.current;
      const ind = scrollIndRef.current;
      const ov  = videoOverlayRef.current;
      if (!wrapper || !mc || !bg || !rgt || !ind || !ov) return;

      const rect       = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(-rect.top / scrollable, 1));

      const mob    = window.innerWidth < 768;
      const startW = mob ? 340 : 300;
      const startH = mob ? 604 : 533;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const endW = vw;
      const endH = mob ? vh : Math.round(vw * 9 / 21);

      mc.style.width        = Math.min(startW + p * (endW - startW), endW) + "px";
      mc.style.height       = Math.min(startH + p * (endH - startH), endH) + "px";
      mc.style.borderRadius = 20 * (1 - p) + "px";
      bg.style.opacity      = String(1 - p);

      rgt.style.transform = `scale(${1 + p * 0.12})`;
      rgt.style.opacity   = String(Math.max(0, 1 - p * 2.4));
      ind.style.opacity   = String(Math.max(0, 1 - p * 5));

      ov.style.background = `rgba(4,33,14,${Math.max(0.08, 0.32 - p * 0.22)})`;
    };
    window.addEventListener("scroll", updateHero, { passive: true });
    window.addEventListener("resize", updateHero, { passive: true });
    updateHero();
    return () => {
      window.removeEventListener("scroll", updateHero);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  // Nav scroll state
  useEffect(() => {
    const handle = () => {
      const wrapper = heroWrapperRef.current;
      if (!wrapper) return;
      setNavScrolled(window.scrollY > wrapper.offsetHeight - 120);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Manifesto text effect trigger on view
  useEffect(() => {
    const el = manifestoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setManifestoInView(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fade on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io  = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Canvas beams (valori section)
  useEffect(() => {
    const section = valoriSectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BEAMS = 22;
    let beams: {
      x: number; y: number; width: number; length: number; angle: number;
      speed: number; opacity: number; hue: number; pulse: number; pulseSpd: number;
    }[] = [];
    let animId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = section.offsetWidth, h = section.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };

    const mkBeam = (index: number) => {
      const w = section.offsetWidth, h = section.offsetHeight;
      const hue = index % 4 === 0 ? 52 + Math.random() * 12 : 195 + Math.random() * 25;
      return {
        x: Math.random() * w * 1.5 - w * 0.25,
        y: Math.random() * h * 1.5 - h * 0.25,
        width: 40 + Math.random() * 70,
        length: h * 2.5,
        angle: -35 + Math.random() * 10,
        speed: 0.5 + Math.random() * 1.0,
        opacity: 0.10 + Math.random() * 0.14,
        hue,
        pulse: Math.random() * Math.PI * 2,
        pulseSpd: 0.018 + Math.random() * 0.025,
      };
    };

    const resetBeam = (b: typeof beams[0], i: number) => {
      const w = section.offsetWidth, h = section.offsetHeight;
      const spacing = w / 3;
      b.y      = h + 100;
      b.x      = (i % 3) * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      b.width  = 80 + Math.random() * 90;
      b.speed  = 0.4 + Math.random() * 0.7;
      b.opacity = 0.10 + Math.random() * 0.12;
      return b;
    };

    const drawBeam = (b: typeof beams[0]) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.angle * Math.PI) / 180);
      const op = b.opacity * (0.8 + Math.sin(b.pulse) * 0.2);
      const g  = ctx.createLinearGradient(0, 0, 0, b.length);
      g.addColorStop(0,   `hsla(${b.hue},75%,72%,0)`);
      g.addColorStop(0.1, `hsla(${b.hue},75%,72%,${op * 0.5})`);
      g.addColorStop(0.4, `hsla(${b.hue},75%,72%,${op})`);
      g.addColorStop(0.6, `hsla(${b.hue},75%,72%,${op})`);
      g.addColorStop(0.9, `hsla(${b.hue},75%,72%,${op * 0.5})`);
      g.addColorStop(1,   `hsla(${b.hue},75%,72%,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(-b.width / 2, 0, b.width, b.length);
      ctx.restore();
    };

    const animate = () => {
      const w = section.offsetWidth, h = section.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.filter = "blur(35px)";
      beams.forEach((b, i) => {
        b.y -= b.speed;
        b.pulse += b.pulseSpd;
        if (b.y + b.length < 0) resetBeam(b, i);
        drawBeam(b);
      });
      animId = requestAnimationFrame(animate);
    };

    resize();
    beams = Array.from({ length: BEAMS }, (_, i) => mkBeam(i));
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    animate();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  // Body overflow lock
  useEffect(() => {
    document.body.style.overflow = modalOpen || mobileMenuOpen || lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, mobileMenuOpen, lightbox]);

  // Keyboard Escape + frecce nel lightbox
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setModalOpen(false); setLightbox(null); }
      if (lightbox) {
        if (e.key === "ArrowLeft")  setLightbox((l) => l && { ...l, idx: (l.idx - 1 + l.photos.length) % l.photos.length });
        if (e.key === "ArrowRight") setLightbox((l) => l && { ...l, idx: (l.idx + 1) % l.photos.length });
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [lightbox]);

  const openModal = useCallback((product = "") => {
    setModalProduct(product);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          product: modalProduct,
          message: messageRef.current?.value,
        }),
      });
      if (res.ok) {
        alert(lang === "it" ? "Richiesta inviata! Ti risponderemo presto." : "Request sent! We'll get back to you soon.");
        closeModal();
      } else {
        alert(lang === "it" ? "Errore nell'invio. Riprova." : "Error sending. Please try again.");
      }
    } catch {
      alert(lang === "it" ? "Errore nell'invio. Riprova." : "Error sending. Please try again.");
    } finally {
      setFormSending(false);
    }
  };

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className={navScrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          <img src="/logo.jpg" alt="WIDER" />
        </div>
        <div className="nav-pill-wrapper">
          <NavHeader items={navItems} scrolled={navScrolled} />
        </div>
        <div className="nav-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === "it" ? "en" : "it")} aria-label="Switch language">
            {lang === "it" ? "🇬🇧" : "🇮🇹"}
          </button>
          <button className="nav-cta" onClick={() => openModal()}>{tr.nav.cta}</button>
          <button className="hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
            <span /><span />
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <div className="hero-scroll-wrapper" ref={heroWrapperRef}>
        <section className="hero-sticky">
          <div className="hero-bg" ref={heroBgRef} />
          <div className="media-container" ref={mediaContainerRef}>
            <video autoPlay muted loop playsInline preload="auto">
              <source src="/video-hero.webm" type="video/webm" />
              <source src="/video hero.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" ref={videoOverlayRef} />
          </div>
          <div className="hero-text">
            <div className="hero-vapor" ref={heroRightRef}>
              <VaporizeTextCycle
                texts={["Rotate your perspective."]}
                font={{ fontFamily: "Space Grotesk, sans-serif", fontSize: vaporFont, fontWeight: 500 }}
                color="rgb(255,253,244)"
                spread={4}
                density={6}
                animation={{ vaporizeDuration: 2.2, fadeInDuration: 1.2, waitDuration: 3, initialDelay: 2 }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H1}
              />
            </div>
          </div>
          <div className="scroll-indicator" ref={scrollIndRef}>
            <span>{tr.hero.scroll}</span>
            <div className="scroll-line" />
          </div>
        </section>
      </div>

      <div className="hero-separator" />

      {/* ===== MANIFESTO ===== */}
      <section className="section-brand" id="brand">
        <span className="label fade-up">{tr.manifesto.label}</span>
        <div className="divider fade-up" />
        <h2 className="manifesto" ref={manifestoRef}>
          <TextEffect as="span" per="word" preset="blur" trigger={manifestoInView} className="manifesto-line">
            {tr.manifesto.line1}
          </TextEffect>
          <span className="manifesto-line">
            <TextEffect as="span" per="word" preset="blur" trigger={manifestoInView} delay={0.5} className="manifesto-inline">
              {tr.manifesto.line2a}
            </TextEffect>
            <TextEffect as="span" per="word" preset="blur" trigger={manifestoInView} delay={0.9} className="manifesto-inline manifesto-em">
              {tr.manifesto.line2b}
            </TextEffect>
          </span>
        </h2>
        <div className="divider fade-up" />
        <p className="fade-up">
          {tr.manifesto.body[0]}<br />
          {tr.manifesto.body[1]}<br /><br />
          {tr.manifesto.body[2]}<br /><br />
          {tr.manifesto.body[3]}<br />
          {tr.manifesto.body[4]}
        </p>
      </section>

      {/* ===== VALORI ===== */}
      <section className="section-valori" ref={valoriSectionRef}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", filter: "blur(15px)" }}
        />
        <span className="label fade-up">{tr.valori.label}</span>
        <div className="valori-grid">
          {tr.valori.items.map((v, i) => (
            <div key={i} className="valore-item fade-up">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COLLEZIONE ===== */}
      <section className="section-collezione" id="collezione">
        <div className="section-header">
          <span className="label fade-up">{tr.collezione.label}</span>
          <h2 className="fade-up">{tr.collezione.title}</h2>
          <p className="fade-up">{tr.collezione.subtitle}</p>
        </div>
        <div className="prodotti-grid">
          {products.map((p, i) => (
            <ProductCard
              key={i}
              nome={p.nome}
              photos={p.photos}
              cta={tr.collezione.cta}
              onRequest={() => openModal(p.nome)}
              onZoom={(photos, idx, nome) => setLightbox({ photos, idx, nome })}
            />
          ))}
        </div>
        <div className="guida-taglie-wrap fade-up">
          <button
            className="guida-taglie-btn"
            onClick={() => setLightbox({ photos: ["/products/guida-taglie.jpg"], idx: 0, nome: tr.collezione.sizeGuide })}
          >
            {tr.collezione.sizeGuide}
          </button>
        </div>
      </section>

      {/* ===== GALLERIA ===== */}
      <section className="section-gallery" id="gallery">
        <div className="section-header">
          <span className="label fade-up">{tr.gallery.label}</span>
          <AnimatedText
            text={tr.gallery.title}
            className="fade-up shiny-title-wrap"
            textClassName="shiny-title"
            gradientColors="linear-gradient(110deg, #5FA8C4 0%, #5FA8C4 35%, #FFFFFF 50%, #5FA8C4 65%, #5FA8C4 100%)"
            gradientAnimationDuration={2.5}
          />
        </div>
        <div className="gallery-stack fade-up">
          <CardStack
            items={galleryItems}
            cardWidth={cardSize.w}
            cardHeight={cardSize.h}
            loop
            showDots
            autoAdvance={false}
            overlap={0.42}
            spreadDeg={44}
          />
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section className="section-community" id="community">
        <span className="label fade-up">{tr.community.label}</span>
        <h2 className="fade-up">
          {tr.community.title1}<br />
          {tr.community.title2}
        </h2>
        <p className="fade-up">
          {tr.community.body[0]}<br />
          {tr.community.body[1]}<br /><br />
          {tr.community.body[2]}<br />
          {tr.community.body[3]}
        </p>
        <div className="community-map fade-up">
          <WorldMap dots={communityDots} lineColor="#C2E5FF" dotColor="#FFFDF44D" showLabels={false} />
        </div>
        <a
          className="btn-outline-light fade-up"
          href="https://www.instagram.com/weare.wider"
          target="_blank"
          rel="noopener noreferrer"
        >
          {tr.community.cta}
        </a>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Chiudi">&#215;</button>
          {lightbox.photos.length > 1 && (
            <button
              className="lightbox-nav prev"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => l && { ...l, idx: (l.idx - 1 + l.photos.length) % l.photos.length }); }}
              aria-label="Foto precedente"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          )}
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.photos[lightbox.idx]!}
              alt={lightbox.nome}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          {lightbox.photos.length > 1 && (
            <button
              className="lightbox-nav next"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => l && { ...l, idx: (l.idx + 1) % l.photos.length }); }}
              aria-label="Foto successiva"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          )}
          <div className="lightbox-caption">
            {lightbox.nome}
            {lightbox.photos.length > 1 && <span> · {lightbox.idx + 1}/{lightbox.photos.length}</span>}
          </div>
        </div>
      )}

      {/* ===== MODAL ===== */}
      <div
        className={`modal-overlay${modalOpen ? " active" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>&#215;</button>
          <h3>{tr.modal.title}</h3>
          <p className="modal-subtitle">{tr.modal.subtitle}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{tr.modal.name}</label>
              <input ref={nameRef} type="text" placeholder={tr.modal.namePlaceholder} required />
            </div>
            <div className="form-group">
              <label>{tr.modal.email}</label>
              <input ref={emailRef} type="email" placeholder={tr.modal.emailPlaceholder} required />
            </div>
            <div className="form-group">
              <label>{tr.modal.product}</label>
              <select value={modalProduct} onChange={(e) => setModalProduct(e.target.value)}>
                <option value="">{tr.modal.productDefault}</option>
                {products.map((p) => <option key={p.nome}>{p.nome}</option>)}
                <option>{tr.modal.productOther}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{tr.modal.message}</label>
              <textarea ref={messageRef} placeholder={tr.modal.messagePlaceholder} />
            </div>
            <button type="submit" className="form-submit" disabled={formSending}>
              {formSending ? "..." : tr.modal.submit}
            </button>
          </form>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>&#215;</button>
        <a href="#brand"      onClick={() => setMobileMenuOpen(false)}>{tr.nav.brand}</a>
        <a href="#collezione" onClick={() => setMobileMenuOpen(false)}>{tr.nav.collezione}</a>
        <a href="#gallery"    onClick={() => setMobileMenuOpen(false)}>{tr.nav.gallery}</a>
        <a href="#community"  onClick={() => setMobileMenuOpen(false)}>{tr.nav.community}</a>
        <button className="mobile-menu-cta-btn" onClick={() => { setMobileMenuOpen(false); openModal(); }}>
          {tr.nav.cta}
        </button>
      </div>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <img src="/logo.jpg" alt="WIDER" />
          </div>
          <ul className="footer-links">
            <li><a href="https://www.instagram.com/weare.wider" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="#brand">{tr.footer.brand}</a></li>
            <li><a href="#collezione">{tr.footer.collezione}</a></li>
            <li><a href="#community">{tr.footer.community}</a></li>
          </ul>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p>{tr.footer.rights}</p>
            <p>{tr.footer.tagline}</p>
          </div>
          <div className="footer-credit">
            <p>{tr.footer.credit} <a href="https://www.futureai.it" target="_blank" rel="noopener noreferrer">FUTURE AI</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
