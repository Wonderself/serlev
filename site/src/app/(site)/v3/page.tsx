"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

/* ────── Intersection Observer hook ────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ────── Reveal components ────── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(50px) rotateX(8deg)",
        transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        transformOrigin: "bottom center",
      }}
    >
      {children}
    </div>
  );
}

/* ────── 3D Tilt Card ────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ────── Data ────── */
const categories = [
  {
    title: "Doces Saudáveis",
    sub: "Brownies, cookies, brigadeiros",
    image: "/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
    href: "/cardapio#doces",
    color: "from-pistachio-deep to-pistachio-dark",
    emoji: "🍫",
  },
  {
    title: "Salgados",
    sub: "Quibes, pães, quiches",
    image: "/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
    href: "/cardapio#salgados",
    color: "from-pistachio-dark to-sage",
    emoji: "🥐",
  },
  {
    title: "Pratos Principais",
    sub: "Refeições nutritivas e completas",
    image: "/photos/ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
    href: "/cardapio#pratos",
    color: "from-sage to-pistachio-deep",
    emoji: "🥗",
  },
  {
    title: "Bolos & Tortas",
    sub: "Para suas ocasiões especiais",
    image: "/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
    href: "/cardapio#bolos",
    color: "from-pistachio to-pistachio-deep",
    emoji: "🎂",
  },
];

const galleryPhotos = [
  "ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
  "ser.levemente_1745346648_3616552271900707356_6683801803_10.jpg",
  "ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
  "ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
  "ser.levemente_1565651578_2109160769053505539_6683801803_10.jpg",
  "ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
  "ser.levemente_1548196844_1962739844117326612_6683801803_6.jpg",
  "ser.levemente_1543222645_1921013244313337774_6683801803_5.jpg",
  "ser.levemente_1542112822_1911703368185536361_6683801803_8.jpg",
  "ser.levemente_1535734059_1858194432412569885_6683801803_2.jpg",
  "ser.levemente_1533559526_1839953124690740115_6683801803_8.jpg",
  "ser.levemente_1531318387_1821153085914835252_6683801803_8.jpg",
];

/* ────── Main Component ────── */
export default function HomeV3() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* ═══════ HERO - Immersive 3D Parallax ═══════ */}
      <section className="relative min-h-[100svh] overflow-hidden bg-pistachio-light flex items-center">
        {/* Animated gradient orbs at different depths */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-pistachio/30 blur-[120px]"
          style={{
            top: "10%",
            left: "60%",
            transform: `translate3d(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-pistachio-deep/15 blur-[100px]"
          style={{
            bottom: "5%",
            left: "10%",
            transform: `translate3d(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30}px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-golden/10 blur-[80px]"
          style={{
            top: "40%",
            right: "5%",
            transform: `translate3d(${(mousePos.x - 0.5) * 50}px, ${(mousePos.y - 0.5) * 50}px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise" />

        <div className="max-w-7xl mx-auto px-5 py-10 md:py-0 w-full relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-4 items-center">
            {/* Text block */}
            <div className="w-full md:col-span-5 relative z-20">
              <Reveal>
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-pistachio-deep animate-pulse" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-pistachio-deep font-semibold">
                    Cozinha Consciente
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-logo text-7xl sm:text-8xl md:text-9xl text-pistachio-deep leading-[0.85] mb-2">
                  Leve
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <span className="text-sm tracking-[0.6em] uppercase text-primary-dark/50 font-medium block mb-8 ml-1">
                  Mente
                </span>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="text-foreground/55 text-base sm:text-lg max-w-sm mb-10 leading-relaxed font-light">
                  Comida saudável com afeto. Simplificar, trazer comida boa,
                  saudável, descomplicada na versão gostosa.
                </p>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/cardapio"
                    className="group relative bg-pistachio-deep text-white px-8 py-4 rounded-full text-sm tracking-wider uppercase font-medium text-center overflow-hidden shadow-xl shadow-pistachio-deep/30"
                  >
                    <span className="relative z-10">Ver Cardápio</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pistachio-dark to-sage opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  <Link
                    href="/contato"
                    className="border-2 border-pistachio-deep/40 text-pistachio-deep px-8 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-pistachio-deep hover:text-white transition-all text-center backdrop-blur-sm"
                  >
                    Encomenda
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* 3D Photo composition */}
            <div className="w-full md:col-span-7 relative perspective-2000">
              <div
                className="relative h-[55vh] md:h-[80vh] preserve-3d"
                style={{
                  transform: `rotateY(${(mousePos.x - 0.5) * 6}deg) rotateX(${(mousePos.y - 0.5) * -4}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* Back layer photo */}
                <div
                  className="absolute top-[5%] right-[5%] w-[65%] h-[60%] rounded-3xl overflow-hidden shadow-2xl"
                  style={{ transform: "translateZ(-30px)" }}
                >
                  <Image
                    src="/photos/ser.levemente_1565651578_2109160769053505539_6683801803_10.jpg"
                    alt="Ser Levemente"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-pistachio/10" />
                </div>

                {/* Middle layer - main photo */}
                <div
                  className="absolute top-[10%] left-[5%] w-[60%] h-[65%] rounded-3xl overflow-hidden shadow-2xl"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <Image
                    src="/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg"
                    alt="Ser Levemente"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Front layer - small accent photo */}
                <div
                  className="absolute bottom-[5%] right-[10%] w-[45%] h-[40%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <Image
                    src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
                    alt="Ser Levemente"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating glass badge */}
                <div
                  className="absolute bottom-[35%] left-[15%] z-10 glass rounded-2xl p-4 shadow-xl animate-float"
                  style={{ transform: "translateZ(70px)" }}
                >
                  <p className="text-pistachio-deep text-xs font-semibold tracking-wide">Desde 2017</p>
                  <p className="text-foreground/50 text-[10px]">Trancoso & Vila Velha</p>
                </div>

                {/* Floating pill */}
                <div
                  className="absolute top-[15%] left-[50%] z-10 bg-pistachio-deep text-white rounded-full px-4 py-2 shadow-xl animate-float-reverse"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">100% Natural</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-pistachio-deep/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-pistachio-deep/50 rounded-full animate-float-slow" />
          </div>
        </div>
      </section>

      {/* ═══════ VALUES - 3D Glass cards that tilt ═══════ */}
      <section className="py-4 md:py-6 relative overflow-hidden">
        <div className="bg-gradient-to-r from-pistachio-deep via-pistachio-dark to-sage">
          <div className="max-w-7xl mx-auto px-5 py-3">
            <div className="animate-marquee whitespace-nowrap flex gap-8">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="text-white/80 text-[10px] tracking-[0.3em] uppercase font-medium flex gap-8 shrink-0">
                  <span>Saudável</span>
                  <span className="text-white/30">◆</span>
                  <span>Low Carb</span>
                  <span className="text-white/30">◆</span>
                  <span>Vegano</span>
                  <span className="text-white/30">◆</span>
                  <span>Funcional</span>
                  <span className="text-white/30">◆</span>
                  <span>Sem Glúten</span>
                  <span className="text-white/30">◆</span>
                  <span>Natural</span>
                  <span className="text-white/30">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORIES - 3D Tilt Cards ═══════ */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Giant decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <p className="font-logo text-[30vw] text-pistachio/[0.04] whitespace-nowrap leading-none">
            Cardápio
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <Reveal>
            <div className="mb-14 md:mb-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-pistachio-deep" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-pistachio-deep font-semibold">
                  Explore
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-primary-dark italic">
                Nosso Cardápio
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.12}>
                <TiltCard className="h-full">
                  <Link href={cat.href} className="group block h-full">
                    <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-3xl">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Floating 3D content */}
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        {/* Emoji floater */}
                        <div className="absolute top-6 right-6 text-4xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-2">
                          {cat.emoji}
                        </div>

                        <div className={`inline-block self-start bg-gradient-to-r ${cat.color} px-4 py-1.5 rounded-full mb-3 shadow-lg`}>
                          <span className="text-white text-[10px] tracking-[0.25em] uppercase font-semibold">
                            {cat.title}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm md:text-base font-light mb-4">{cat.sub}</p>

                        {/* Animated explore bar */}
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="h-px bg-white/40 w-0 group-hover:w-12 transition-all duration-700" />
                          <span className="text-white text-xs tracking-wider uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            Explorar
                          </span>
                          <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PHILOSOPHY - Immersive parallax split ═══════ */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* Background with parallax effect */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pistachio-light via-pistachio-light to-pistachio/20" />
          {/* Organic blob shapes */}
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-pistachio/20 animate-blob" style={{ animationDuration: "15s" }} />
          <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-pistachio-deep/10 animate-blob" style={{ animationDelay: "5s", animationDuration: "12s" }} />
        </div>

        {/* Giant quotation mark */}
        <div className="absolute top-10 md:top-16 left-4 md:left-12 pointer-events-none select-none">
          <span className="font-display text-[12rem] md:text-[20rem] text-pistachio/15 leading-none">&ldquo;</span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground/60 font-light italic leading-relaxed mb-10">
                Somos não só o que comemos, e sim o que somos, o que
                consumimos, o que vestimos, a música que ouvimos, o conteúdo que consumimos
                no dia-a-dia. Nutrir nossa mente com equilíbrio e consciência é um convite
                para uma vida mais bem vivida.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-pistachio-deep/30" />
                <div className="w-3 h-3 rounded-full bg-pistachio-deep/20" />
                <div className="w-12 h-px bg-pistachio-deep/30" />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-logo text-4xl sm:text-5xl md:text-6xl text-pistachio-deep">
                &quot;Seja leve me leve&quot;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY - 3D Carousel effect ═══════ */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-pistachio-deep" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-pistachio-deep font-semibold">
                    Instagram
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-dark italic">
                  @ser.levemente
                </h2>
              </div>
              <a
                href="https://instagram.com/ser.levemente"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-pistachio-deep text-white px-6 py-3 rounded-full text-sm tracking-wide hover:bg-pistachio-dark transition-colors shadow-lg shadow-pistachio-deep/20"
              >
                Seguir no Instagram
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* 3D tilt gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {galleryPhotos.map((file, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <TiltCard>
                  <a
                    href="https://instagram.com/ser.levemente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer"
                  >
                    <Image
                      src={`/photos/${file}`}
                      alt="Ser Levemente"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-pistachio-deep/0 group-hover:bg-pistachio-deep/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                        ♡
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <a
              href="https://instagram.com/ser.levemente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pistachio-deep text-white px-6 py-3 rounded-full text-sm tracking-wide hover:bg-pistachio-dark transition-colors shadow-lg"
            >
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ CTA - 3D Glass panel over gradient ═══════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pistachio-deep via-pistachio-dark to-sage animate-gradient" />

        {/* Floating orbs */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-[15%] right-[15%] w-48 h-48 rounded-full bg-white/5 animate-float-reverse" />
        <div className="absolute top-[50%] right-[30%] w-20 h-20 rounded-full bg-pistachio/10 animate-float-slow" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          {/* Glass panel */}
          <div className="glass rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center" style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(24px)" }}>
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white italic mb-4 leading-tight">
                Faça sua encomenda
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white/60 mb-10 text-sm md:text-lg font-light max-w-md mx-auto">
                WhatsApp ou formulário de contato — estamos aqui para você
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://wa.me/5527999999999?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20com%20a%20Ser%20Levemente!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-pistachio-deep px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-pistachio-light transition-all shadow-xl font-semibold"
                >
                  WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  Contato
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
