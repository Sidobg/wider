"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { NavHeader } from "@/components/ui/nav-header";
import { TextEffect } from "@/components/ui/text-effect";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { PoemAnimation } from "@/components/ui/3d-animation";

const communityPoem = `<p>La <span>community</span> WIDER nasce dalle persone che vivono il mondo con la stessa <span>visione</span>. Non un prodotto, ma un <span>senso di appartenenza</span>. Nelle <span>connessioni</span> che nascono, nelle <span>esperienze</span> condivise, nel modo di guardare oltre. Un punto di incontro tra <span>community</span>, territorio e <span>creatività</span>. <span>Not for narrow minds.</span> &nbsp; </p>`;

const navItems = [
  { label: "Il brand",   href: "#brand" },
  { label: "Collezione", href: "#collezione" },
  { label: "Gallery",    href: "#gallery" },
  { label: "Community",  href: "#community" },
];

const galleryItems: CardStackItem[] = [
  {
    id: 1,
    title: "First Vision",
    description: "Summer Collection 2025",
    imageSrc: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
  },
  {
    id: 2,
    title: "Openness",
    description: "Vivere le esperienze per ciò che sono",
    imageSrc: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
  },
  {
    id: 3,
    title: "Belonging",
    description: "Le persone sono il brand",
    imageSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
  },
  {
    id: 4,
    title: "Authenticity",
    description: "Momenti veri, vissuti prima di essere raccontati",
    imageSrc: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
  },
  {
    id: 5,
    title: "Aesthetic",
    description: "La cura del dettaglio come linguaggio",
    imageSrc: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
  },
];

const products = [
  { nome: "Cappotto Verde",    tipo: "Outerwear", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80" },
  { nome: "Camicia Panna",     tipo: "Camicia",   img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" },
  { nome: "Maglione Beige",    tipo: "Knitwear",  img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" },
  { nome: "Giacca Marrone",    tipo: "Outerwear", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
  { nome: "Pantaloni Wide",    tipo: "Pantaloni", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80" },
  { nome: "T-shirt Essenziale",tipo: "T-shirt",   img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
];

export default function Home() {
  const [navScrolled,    setNavScrolled]    = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [modalProduct,   setModalProduct]   = useState("");
  const [cardSize,       setCardSize]       = useState({ w: 480, h: 320 });
  const [manifestoInView, setManifestoInView] = useState(false);

  const manifestoRef = useRef<HTMLHeadingElement>(null);

  const heroWrapperRef    = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const heroBgRef         = useRef<HTMLDivElement>(null);
  const heroLeftRef       = useRef<HTMLImageElement>(null);
  const heroRightRef      = useRef<HTMLSpanElement>(null);
  const scrollIndRef      = useRef<HTMLDivElement>(null);
  const videoOverlayRef   = useRef<HTMLDivElement>(null);
  const valoriSectionRef  = useRef<HTMLElement>(null);
  const canvasRef         = useRef<HTMLCanvasElement>(null);

  // Responsive card size
  useEffect(() => {
    const update = () => {
      const mob = window.innerWidth < 768;
      setCardSize({ w: mob ? 290 : 480, h: mob ? 195 : 320 });
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
      const lft = heroLeftRef.current;
      const rgt = heroRightRef.current;
      const ind = scrollIndRef.current;
      const ov  = videoOverlayRef.current;
      if (!wrapper || !mc || !bg || !lft || !rgt || !ind || !ov) return;

      const rect       = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(-rect.top / scrollable, 1));

      const mob    = window.innerWidth < 768;
      const startW = mob ? 340 : 300;
      const startH = mob ? 560 : 420;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      mc.style.width        = Math.min(startW + p * (vw - startW), vw) + "px";
      mc.style.height       = Math.min(startH + p * (vh - startH), vh) + "px";
      mc.style.borderRadius = 20 * (1 - p) + "px";
      bg.style.opacity      = String(1 - p);

      const tx = mob ? 0 : p * 30;
      lft.style.transform = `translateX(-${tx}vw)`;
      rgt.style.transform = `translateX(${tx}vw)`;
      lft.style.opacity   = String(Math.max(0, 1 - p * 2.4));
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
    document.body.style.overflow = modalOpen || mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, mobileMenuOpen]);

  // Keyboard Escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  const openModal = useCallback((product = "") => {
    setModalProduct(product);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Richiesta inviata! Ti risponderemo presto.");
    closeModal();
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
        <button className="nav-cta" onClick={() => openModal()}>Richiedi info</button>
        <button className="hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
          <span /><span />
        </button>
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
            <img
              id="heroLeft"
              ref={heroLeftRef}
              src="/wider-scritta.png"
              alt="Wider"
              style={{ marginLeft: "5vw", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <span className="hero-word" id="heroRight" ref={heroRightRef}>
              è uno spazio aperto.
            </span>
          </div>
          <div className="scroll-indicator" ref={scrollIndRef}>
            <span>scorri per esplorare</span>
            <div className="scroll-line" />
          </div>
        </section>
      </div>

      <div className="hero-separator" />

      {/* ===== MANIFESTO ===== */}
      <section className="section-brand" id="brand">
        <div className="manifesto-globe" aria-hidden="true">
          <GlobePulse speed={0.0025} pulseColor="#7EC8DC" />
        </div>
        <span className="label fade-up">Il Manifesto</span>
        <div className="divider fade-up" />
        <h2 className="manifesto" ref={manifestoRef}>
          <TextEffect as="span" per="word" preset="blur" trigger={manifestoInView} className="manifesto-line">
            Non è solo qualcosa da indossare.
          </TextEffect>
          <span className="manifesto-line">
            <TextEffect as="span" per="word" preset="blur" trigger={manifestoInView} delay={0.5} className="manifesto-inline">
              {"È qualcosa da "}
            </TextEffect>
            <TextEffect as="span" per="word" preset="blur" trigger={manifestoInView} delay={0.9} className="manifesto-inline manifesto-em">
              vivere.
            </TextEffect>
          </span>
        </h2>
        <div className="divider fade-up" />
        <p className="fade-up">
          WIDER è un invito a cambiare prospettiva.<br />
          A vivere le esperienze prima di raccontarle.<br /><br />
          Un immaginario costruito attraverso persone, esperienze ed estetica
          che condividono lo stesso modo di vedere il mondo.<br /><br />
          Prima ancora che un prodotto, WIDER è uno status.<br />
          Un senso di appartenenza.
        </p>
      </section>

      {/* ===== VALORI ===== */}
      <section className="section-valori" ref={valoriSectionRef}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", filter: "blur(15px)" }}
        />
        <span className="label fade-up">I valori</span>
        <div className="valori-grid">
          <div className="valore-item fade-up">
            <h3>Openness</h3>
            <p>Guardare il mondo con una prospettiva più ampia. Uscire dalle abitudini, vivere le esperienze per ciò che sono, vedere il mondo in orizzontale.</p>
          </div>
          <div className="valore-item fade-up">
            <h3>Belonging</h3>
            <p>Il prodotto è il simbolo. Le persone sono il brand. WIDER prende forma attraverso chi ne condivide la visione, le esperienze e il modo di vivere il mondo.</p>
          </div>
          <div className="valore-item fade-up">
            <h3>Authenticity</h3>
            <p>Esperienze reali. Connessioni genuine. Tutto ciò che conta nasce da momenti veri, vissuti prima di essere raccontati.</p>
          </div>
          <div className="valore-item fade-up">
            <h3>Aesthetic</h3>
            <p>La cura del dettaglio come linguaggio. Ogni elemento, dal prodotto all&apos;immagine, esprime l&apos;universo WIDER e i suoi valori.</p>
          </div>
        </div>
      </section>

      {/* ===== COLLEZIONE ===== */}
      <section className="section-collezione" id="collezione">
        <div className="section-header">
          <span className="label fade-up">Not for narrow minds</span>
          <h2 className="fade-up">First Vision — Summer Collection</h2>
          <p className="fade-up">Scopri i nostri capi. Scrivi una richiesta per ricevere informazioni.</p>
        </div>
        <div className="prodotti-grid">
          {products.map((p) => (
            <div key={p.nome} className="dest-card fade-up" onClick={() => openModal(p.nome)}>
              <div className="dest-card-bg" style={{ backgroundImage: `url('${p.img}')` }} />
              <div className="dest-card-overlay" />
              <div className="dest-card-content">
                <div className="dest-card-nome">{p.nome}</div>
                <div className="dest-card-tipo">{p.tipo}</div>
                <button className="dest-card-btn">
                  <span>Richiedi info</span>
                  <svg className="dest-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALLERIA ===== */}
      <section className="section-gallery" id="gallery">
        <div className="section-header">
          <span className="label fade-up">La Visione</span>
          <h2 className="fade-up">Un universo da vivere</h2>
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
        <div className="community-fx" aria-hidden="true">
          <PoemAnimation poemHTML={communityPoem} />
        </div>
        <span className="label fade-up">Community</span>
        <h2 className="fade-up">
          Uno status prima di una collezione.<br />
          Una comunità prima di un prodotto.
        </h2>
        <p className="fade-up">
          La forza di WIDER è nelle persone che lo vivono.<br />
          Nelle connessioni che nascono, nella mentalità condivisa, nel modo di vivere le esperienze.<br /><br />
          WIDER è un punto di incontro contemporaneo tra community, territorio e creatività.<br />
          Prende vita attraverso eventi, contenuti e collaborazioni.
        </p>
        <a
          className="btn-outline-light fade-up"
          href="https://www.instagram.com/weare.wider"
          target="_blank"
          rel="noopener noreferrer"
        >
          Scopri i nostri eventi
        </a>
      </section>

      {/* ===== MODAL ===== */}
      <div
        className={`modal-overlay${modalOpen ? " active" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>&#215;</button>
          <h3>Richiedi informazioni</h3>
          <p className="modal-subtitle">Compila il form e ti risponderemo via email.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input type="text" placeholder="Il tuo nome" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="La tua email" required />
            </div>
            <div className="form-group">
              <label>Prodotto di interesse</label>
              <select value={modalProduct} onChange={(e) => setModalProduct(e.target.value)}>
                <option value="">— Seleziona un capo —</option>
                {products.map((p) => <option key={p.nome}>{p.nome}</option>)}
                <option>Altro / Non so ancora</option>
              </select>
            </div>
            <div className="form-group">
              <label>Messaggio</label>
              <textarea placeholder="Dicci qualcosa in più..." />
            </div>
            <button type="submit" className="form-submit">Invia richiesta</button>
          </form>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>&#215;</button>
        <a href="#brand"      onClick={() => setMobileMenuOpen(false)}>Il brand</a>
        <a href="#collezione" onClick={() => setMobileMenuOpen(false)}>Collezione</a>
        <a href="#gallery"    onClick={() => setMobileMenuOpen(false)}>Gallery</a>
        <a href="#community"  onClick={() => setMobileMenuOpen(false)}>Community</a>
        <button className="mobile-menu-cta-btn" onClick={() => { setMobileMenuOpen(false); openModal(); }}>
          Richiedi info
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
            <li><a href="#brand">Il brand</a></li>
            <li><a href="#collezione">Collezione</a></li>
            <li><a href="#community">Community</a></li>
          </ul>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p>© 2025 WIDER. Tutti i diritti riservati.</p>
            <p>Un universo da vivere prima ancora che da indossare.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
