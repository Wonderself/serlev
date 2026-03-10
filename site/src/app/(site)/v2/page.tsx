"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Doces Saudáveis",
    description: "Brownies, cookies, brigadeiros e muito mais",
    image: "/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
    href: "/cardapio#doces",
    num: "01",
  },
  {
    title: "Salgados",
    description: "Quibes, pães artesanais, quiches e tortas",
    image: "/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
    href: "/cardapio#salgados",
    num: "02",
  },
  {
    title: "Pratos Principais",
    description: "Refeições completas e nutritivas",
    image: "/photos/ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
    href: "/cardapio#pratos",
    num: "03",
  },
  {
    title: "Bolos & Tortas",
    description: "Para ocasiões especiais",
    image: "/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
    href: "/cardapio#bolos",
    num: "04",
  },
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
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function HorizontalReveal({ children, className = "", delay = 0, from = "left" }: { children: React.ReactNode; className?: string; delay?: number; from?: "left" | "right" }) {
  const { ref, visible } = useInView();
  const dir = from === "left" ? "-60px" : "60px";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${dir})`,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomeV2() {
  return (
    <>
      {/* Hero - Cinematic full bleed with editorial typography */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg"
            alt="Ser Levemente"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        {/* Giant decorative text behind */}
        <div className="absolute bottom-[15%] left-0 right-0 pointer-events-none select-none overflow-hidden">
          <p className="font-logo text-[20vw] md:text-[18vw] text-white/[0.04] whitespace-nowrap leading-none">
            Ser Levemente
          </p>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-5 pb-12 sm:pb-16 md:pb-20">
            <div className="max-w-2xl">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-white/40" />
                  <span className="text-white/70 text-[10px] tracking-[0.5em] uppercase font-medium">
                    Cozinha Consciente
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.9] mb-2">
                  Ser
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="font-logo text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-8">
                  Levemente
                </h1>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-white/70 text-base sm:text-lg md:text-xl font-light max-w-lg mb-10 leading-relaxed">
                  Comida saudável com afeto desde 2017.
                  Simplificar, trazer comida boa, descomplicada.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/cardapio"
                    className="glass text-white px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-white/30 transition-all font-medium text-center"
                  >
                    Ver Cardápio
                  </Link>
                  <Link
                    href="/contato"
                    className="border border-white/30 text-white px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-sage transition-all text-center"
                  >
                    Encomenda
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center pb-6">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40 animate-float-slow" />
          </div>
        </div>
      </section>

      {/* Values - Horizontal strip with oversized numbers */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "01", title: "Natural", text: "Ingredientes da natureza" },
              { icon: "02", title: "Low Carb", text: "Sem culpa, com sabor" },
              { icon: "03", title: "Vegano", text: "Plant-based com amor" },
              { icon: "04", title: "Funcional", text: "Cada ingrediente importa" },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="relative group">
                  <span className="font-display text-7xl md:text-8xl text-sage/10 font-light absolute -top-4 -left-2 group-hover:text-sage/20 transition-colors">
                    {p.icon}
                  </span>
                  <div className="relative pt-12 md:pt-16">
                    <h3 className="text-sage font-semibold tracking-wide mb-1 text-base md:text-lg">{p.title}</h3>
                    <p className="text-foreground/50 text-sm leading-relaxed">{p.text}</p>
                    <div className="w-8 h-0.5 bg-sage/30 mt-3 group-hover:w-16 transition-all duration-500" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Editorial alternating with oversized type */}
      <section className="py-0 bg-sage-light/10">
        {categories.map((cat, i) => (
          <Link key={cat.title} href={cat.href} className="group block">
            <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} min-h-[50vh] md:min-h-[70vh]`}>
              {/* Photo side */}
              <HorizontalReveal className="relative md:w-[55%] h-64 sm:h-80 md:h-auto overflow-hidden" from={i % 2 === 1 ? "right" : "left"}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </HorizontalReveal>
              {/* Text side */}
              <div className="md:w-[45%] flex items-center">
                <div className="p-8 sm:p-10 md:p-16 w-full">
                  <Reveal delay={0.2}>
                    <span className="font-display text-6xl md:text-8xl text-sage/15 font-light block leading-none mb-4">
                      {cat.num}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary-dark font-light italic mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-foreground/50 text-base md:text-lg font-light mb-6 max-w-sm">{cat.description}</p>
                    <div className="flex items-center gap-3 text-sage font-medium text-sm group-hover:gap-5 transition-all duration-500">
                      <span className="tracking-wider uppercase">Explorar</span>
                      <div className="w-8 h-px bg-sage group-hover:w-16 transition-all duration-500" />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Philosophy - Split screen */}
      <section className="flex flex-col md:flex-row min-h-[60vh]">
        <div className="md:w-1/2 relative h-64 sm:h-80 md:h-auto">
          <Image
            src="/photos/ser.levemente_1548196844_1962739844117326612_6683801803_6.jpg"
            alt="Filosofia"
            fill
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 bg-sage flex items-center">
          <div className="p-8 sm:p-10 md:p-16 lg:p-20">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase">Nossa Filosofia</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white italic mb-6 leading-tight">
                O que nutre sua mente?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/70 leading-relaxed text-base md:text-lg font-light mb-8">
                Somos não só o que comemos, e sim o que somos, o que consumimos,
                o que vestimos, a música que ouvimos, o conteúdo que consumimos
                no dia-a-dia.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-logo text-3xl md:text-4xl text-white/80">
                &quot;Seja leve me leve&quot;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Instagram Gallery - Tight grid with hover effects */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[10px] tracking-[0.4em] uppercase text-sage font-semibold block mb-3">Nos Acompanhe</span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-dark italic">
                @ser.levemente
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 md:gap-2">
            {[
              "ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
              "ser.levemente_1745346648_3616552271900707356_6683801803_10.jpg",
              "ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
              "ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
              "ser.levemente_1565651578_2109160769053505539_6683801803_10.jpg",
              "ser.levemente_1561128497_2071218418955904581_6683801803_1.jpg",
              "ser.levemente_1548196844_1962739844117326612_6683801803_6.jpg",
              "ser.levemente_1543222645_1921013244313337774_6683801803_5.jpg",
            ].map((file, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="aspect-square relative overflow-hidden group cursor-pointer">
                  <Image
                    src={`/photos/${file}`}
                    alt="Ser Levemente"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-sage/0 group-hover:bg-sage/30 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage to-pistachio-deep animate-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white italic mb-4">
              Faça sua encomenda
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 mb-10 text-sm md:text-lg font-light">
              Entre em contato pelo WhatsApp ou formulário
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/3300000000?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20com%20a%20Ser%20Levemente!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-sage px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-sage-light transition-all shadow-xl font-semibold"
              >
                WhatsApp
              </a>
              <Link
                href="/contato"
                className="glass text-white px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-white/25 transition-all"
              >
                Contato
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
