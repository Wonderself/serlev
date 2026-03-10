"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Doces Saudáveis",
    description: "Brownies, cookies, brigadeiros e muito mais — sem culpa",
    image: "/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
    href: "/cardapio#doces",
    accent: "from-coral to-golden",
  },
  {
    title: "Salgados",
    description: "Quibes, pães artesanais, quiches e tortas",
    image: "/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
    href: "/cardapio#salgados",
    accent: "from-terracotta to-coral",
  },
  {
    title: "Pratos Principais",
    description: "Refeições completas, nutritivas e deliciosas",
    image: "/photos/ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
    href: "/cardapio#pratos",
    accent: "from-golden to-coral",
  },
  {
    title: "Bolos & Tortas",
    description: "Para suas ocasiões mais especiais",
    image: "/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
    href: "/cardapio#bolos",
    accent: "from-coral to-terracotta",
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

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero - Organic flowing layout */}
      <section className="relative min-h-[100svh] bg-sand overflow-hidden flex items-center">
        {/* Animated organic blobs */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-coral/10 animate-blob" style={{ animationDuration: "12s" }} />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-golden/10 animate-blob" style={{ animationDelay: "4s", animationDuration: "15s" }} />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-coral-light/30 animate-blob" style={{ animationDelay: "2s", animationDuration: "10s" }} />

        <div className="max-w-7xl mx-auto px-5 py-10 md:py-0 w-full relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 items-center min-h-[85vh]">
            {/* Text - overlapping the grid */}
            <div className="w-full md:col-span-5 md:col-start-1 relative z-20">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-coral-dark font-semibold">
                    Cozinha Consciente
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-logo text-6xl sm:text-7xl md:text-8xl text-primary-dark mb-1 leading-[0.9]">
                  Leve
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <span className="text-xs sm:text-sm tracking-[0.5em] uppercase text-coral font-semibold block mb-6 ml-1">
                  Mente
                </span>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-foreground/60 leading-relaxed mb-8 max-w-sm text-base sm:text-lg font-light">
                  Comida saudável com afeto desde 2017. Simplificar, trazer comida boa,
                  saudável, descomplicada na versão gostosa.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/cardapio"
                    className="group bg-coral text-white px-8 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-coral-dark transition-all shadow-xl shadow-coral/20 font-medium text-center relative overflow-hidden"
                  >
                    <span className="relative z-10">Ver Cardápio</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-coral-dark to-coral opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    href="/contato"
                    className="border-2 border-primary-dark/60 text-primary-dark px-8 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-primary-dark hover:text-white transition-all text-center"
                  >
                    Fazer Encomenda
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Photo composition - organic overlapping images */}
            <div className="w-full md:col-span-7 md:col-start-6 relative">
              <div className="relative h-[60vh] md:h-[80vh]">
                {/* Main large photo */}
                <Reveal delay={0.2} className="absolute top-0 right-0 w-[75%] h-[70%]">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image
                      src="/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg"
                      alt="Ser Levemente"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </Reveal>
                {/* Smaller overlapping photo */}
                <Reveal delay={0.4} className="absolute bottom-0 left-0 w-[55%] h-[50%]">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-sand">
                    <Image
                      src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
                      alt="Ser Levemente"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                {/* Floating accent circle */}
                <div className="absolute bottom-[20%] right-[5%] z-10 w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-coral to-golden animate-float shadow-lg flex items-center justify-center">
                  <span className="text-white text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-center leading-tight">
                    Desde<br />2017
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ribbon */}
      <section className="py-4 bg-coral overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-white/90 text-xs tracking-[0.3em] uppercase font-medium flex gap-8 shrink-0">
              <span>Saudável</span>
              <span className="text-white/40">✦</span>
              <span>Low Carb</span>
              <span className="text-white/40">✦</span>
              <span>Vegetariana</span>
              <span className="text-white/40">✦</span>
              <span>Funcional</span>
              <span className="text-white/40">✦</span>
              <span>Sem Glúten</span>
              <span className="text-white/40">✦</span>
              <span>Natural</span>
              <span className="text-white/40">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Categories - Asymmetric creative layout */}
      <section className="py-16 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral-light/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <Reveal>
            <div className="mb-12 md:mb-20">
              <span className="text-[10px] tracking-[0.4em] uppercase text-coral font-semibold block mb-3">
                Explore
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-dark italic">
                Nosso Cardápio
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.1}>
                <Link
                  href={cat.href}
                  className={`group block relative overflow-hidden rounded-3xl ${i === 0 ? "md:row-span-2 md:h-full" : ""}`}
                >
                  <div className={`relative ${i === 0 ? "h-64 md:h-full min-h-[300px]" : "h-64 md:h-72"} overflow-hidden`}>
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className={`inline-block bg-gradient-to-r ${cat.accent} px-3 py-1 rounded-full mb-3`}>
                        <span className="text-white text-[10px] tracking-[0.2em] uppercase font-semibold">
                          {cat.title}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm md:text-base font-light">{cat.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span>Explorar</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Full bleed with organic shape */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/ser.levemente_1543222645_1921013244313337774_6683801803_5.jpg"
            alt="Filosofia"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coral-dark/90 via-coral/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <div className="max-w-xl">
            <Reveal>
              <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase block mb-4">
                Nossa Filosofia
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light italic mb-6 leading-tight">
                O que nutre sua mente?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6 font-light">
                O levemente é mais que um simples negócio. Trabalhamos com nutrição de uma
                forma geral: porque somos não só o que comemos, e sim o que somos, o que
                consumimos, o que vestimos, a música que ouvimos.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-logo text-3xl md:text-4xl text-white/90">
                &quot;Seja leve me leve&quot;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery - Masonry-style flowing grid */}
      <section className="py-16 md:py-28 bg-sand relative">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-end justify-between mb-10 md:mb-16">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-coral font-semibold block mb-3">
                  Instagram
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-primary-dark italic">
                  @ser.levemente
                </h2>
              </div>
              <a
                href="https://instagram.com/ser.levemente"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-full text-sm tracking-wide hover:bg-coral-dark transition-colors shadow-lg shadow-coral/20"
              >
                Seguir
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </Reveal>
          {/* Gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {galleryPhotos.map((file, i) => (
              <Reveal key={i} delay={i * 0.05}>
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
                  <div className="absolute inset-0 bg-coral/0 group-hover:bg-coral/20 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <a
              href="https://instagram.com/ser.levemente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-full text-sm tracking-wide hover:bg-coral-dark transition-colors shadow-lg shadow-coral/20"
            >
              Siga-nos no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA - Gradient with organic blob */}
      <section className="relative py-20 md:py-28 bg-primary-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/10 animate-blob" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white italic mb-4">
              Faça sua encomenda
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/50 mb-10 text-sm md:text-lg font-light">
              Entre em contato pelo WhatsApp ou pelo nosso formulário
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/5527999999999?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20com%20a%20Ser%20Levemente!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-[#20BD5A] transition-all shadow-xl shadow-[#25D366]/25 font-medium"
              >
                WhatsApp
              </a>
              <Link
                href="/contato"
                className="border-2 border-white/25 text-white px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-white hover:text-primary-dark transition-all"
              >
                Formulário de Contato
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
