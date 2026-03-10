"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   CONFETTI PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════ */
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const colors = ["#e87461", "#b5d89a", "#e8b44c", "#d4a574", "#7a9e6b", "#d4725c", "#c4a87c", "#3d7a2e"];
  const particles = Array.from({ length: 80 }, (_, i) => {
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.8;
    const duration = 2.5 + Math.random() * 2;
    const size = 4 + Math.random() * 8;
    const rotation = Math.random() * 720 - 360;
    const drift = (Math.random() - 0.5) * 200;
    const shape = i % 3; // 0=square, 1=circle, 2=rectangle
    return (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${left}%`,
          top: "-5%",
          width: shape === 2 ? size * 0.4 : size,
          height: shape === 2 ? size * 1.5 : size,
          backgroundColor: color,
          borderRadius: shape === 1 ? "50%" : shape === 2 ? "2px" : "1px",
          animation: `confetti-fall ${duration}s ease-in ${delay}s forwards`,
          opacity: 0,
          ["--drift" as string]: `${drift}px`,
          ["--rotation" as string]: `${rotation}deg`,
        }}
      />
    );
  });
  return <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">{particles}</div>;
}

/* ═══════════════════════════════════════════════════════════
   SPARKLE PARTICLES (floating during gift reveal)
   ═══════════════════════════════════════════════════════════ */
function Sparkles({ count = 30 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 3;
    const size = 2 + Math.random() * 4;
    const duration = 2 + Math.random() * 3;
    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          background: "radial-gradient(circle, rgba(232,180,76,0.9), rgba(232,180,76,0) 70%)",
          animation: `sparkle-pulse ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{sparkles}</div>;
}

/* ═══════════════════════════════════════════════════════════
   LIGHT RAYS (burst from opened gift)
   ═══════════════════════════════════════════════════════════ */
function LightBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (360 / 12) * i;
    return (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 origin-bottom"
        style={{
          width: "3px",
          height: "0px",
          background: "linear-gradient(to top, rgba(232,180,76,0.8), rgba(232,180,76,0))",
          transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          animation: `light-ray 1.2s ease-out 0.1s forwards`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{rays}</div>;
}

/* ═══════════════════════════════════════════════════════════
   3D GIFT BOX
   ═══════════════════════════════════════════════════════════ */
function GiftBox({ phase }: { phase: "idle" | "shake" | "glow" | "open" | "burst" }) {
  const boxSize = "min(280px, 65vw)";

  return (
    <div
      className="relative"
      style={{
        width: boxSize,
        height: boxSize,
        perspective: "800px",
        animation: phase === "shake" ? "gift-shake 0.4s ease-in-out 3" : "none",
      }}
    >
      {/* Glow behind box */}
      <div
        className="absolute inset-[-30%] rounded-full transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(232,180,76,0.4), transparent 70%)",
          opacity: phase === "glow" || phase === "open" || phase === "burst" ? 1 : 0,
          transform: phase === "burst" ? "scale(3)" : phase === "open" ? "scale(1.5)" : "scale(0.5)",
        }}
      />

      {/* Box body */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-700"
        style={{
          background: "linear-gradient(135deg, #e87461 0%, #d4725c 50%, #c4513f 100%)",
          boxShadow: phase === "glow" || phase === "open"
            ? "0 20px 60px rgba(232,116,97,0.5), 0 0 40px rgba(232,180,76,0.3)"
            : "0 20px 40px rgba(0,0,0,0.3)",
          transform: phase === "burst" ? "scale(0) rotateX(20deg)" : "none",
          opacity: phase === "burst" ? 0 : 1,
        }}
      >
        {/* Box pattern - diagonal stripes */}
        <div className="absolute inset-0 overflow-hidden rounded-xl opacity-10">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute h-[200%] w-3"
              style={{
                left: `${i * 12 - 20}%`,
                top: "-50%",
                background: "rgba(255,255,255,0.5)",
                transform: "rotate(45deg)",
              }}
            />
          ))}
        </div>

        {/* Vertical ribbon */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[14%] -translate-x-1/2 bg-gradient-to-b from-[#e8b44c] via-[#d4a040] to-[#c49530] shadow-inner" />

        {/* Horizontal ribbon */}
        <div className="absolute top-1/2 left-0 right-0 h-[14%] -translate-y-1/2 bg-gradient-to-r from-[#e8b44c] via-[#d4a040] to-[#c49530] shadow-inner" />

        {/* Ribbon cross center jewel */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] h-[18%] rounded-full bg-gradient-to-br from-[#f0c85c] to-[#c49020] shadow-lg z-10 flex items-center justify-center">
          <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        </div>
      </div>

      {/* Lid */}
      <div
        className="absolute left-[-4%] right-[-4%] h-[22%] top-[-4%] transition-all rounded-xl"
        style={{
          background: "linear-gradient(135deg, #ef8878 0%, #e06050 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          transformOrigin: "top center",
          transform: phase === "open"
            ? "perspective(800px) rotateX(-120deg) translateY(-20px)"
            : phase === "burst"
              ? "perspective(800px) rotateX(-180deg) translateY(-80px) scale(0)"
              : "perspective(800px) rotateX(0deg)",
          transitionDuration: phase === "open" ? "1.5s" : "0.7s",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: phase === "burst" ? 0 : 1,
        }}
      >
        {/* Lid ribbon */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[13.5%] -translate-x-1/2 bg-gradient-to-b from-[#f0c85c] to-[#d4a040]" />

        {/* Bow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[50%]"
          style={{
            opacity: phase === "burst" ? 0 : 1,
            transition: "opacity 0.5s",
          }}
        >
          {/* Left loop */}
          <div
            className="absolute -left-8 sm:-left-10 -top-1 w-8 sm:w-10 h-6 sm:h-7 rounded-full border-[3px] sm:border-4 border-[#e8b44c]"
            style={{ transform: "rotate(-30deg)", background: "rgba(232,180,76,0.15)" }}
          />
          {/* Right loop */}
          <div
            className="absolute -right-8 sm:-right-10 -top-1 w-8 sm:w-10 h-6 sm:h-7 rounded-full border-[3px] sm:border-4 border-[#e8b44c]"
            style={{ transform: "rotate(30deg)", background: "rgba(232,180,76,0.15)" }}
          />
          {/* Center knot */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#f0c85c] to-[#c49020] shadow-md" />
          {/* Tails */}
          <div className="absolute left-1/2 top-3 sm:top-4 -translate-x-[130%] w-2 h-6 sm:h-8 bg-gradient-to-b from-[#e8b44c] to-[#d4a040] rounded-b-full" style={{ transform: "translateX(-130%) rotate(-15deg)" }} />
          <div className="absolute left-1/2 top-3 sm:top-4 translate-x-[30%] w-2 h-6 sm:h-8 bg-gradient-to-b from-[#e8b44c] to-[#d4a040] rounded-b-full" style={{ transform: "translateX(30%) rotate(15deg)" }} />
        </div>
      </div>

      {/* Light from inside when opening */}
      <div
        className="absolute inset-[10%] top-0 rounded-lg transition-all duration-1000"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(255,250,220,0.9), rgba(232,180,76,0.4), transparent 70%)",
          opacity: phase === "open" ? 1 : 0,
          transform: phase === "open" ? "translateY(-10%)" : "translateY(0)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function BirthdayPage() {
  const [phase, setPhase] = useState<"intro" | "shake" | "glow" | "open" | "burst" | "reveal">("intro");
  const [showContent, setShowContent] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    // Cinematic sequence timeline
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setPhase("shake"), 2000));     // Box shakes
    timers.push(setTimeout(() => setPhase("glow"), 3400));      // Glow appears
    timers.push(setTimeout(() => setPhase("open"), 4400));      // Lid opens
    timers.push(setTimeout(() => setConfettiActive(true), 5200)); // Confetti
    timers.push(setTimeout(() => setPhase("burst"), 6500));     // Box disappears
    timers.push(setTimeout(() => setPhase("reveal"), 7200));    // Content fades in
    timers.push(setTimeout(() => setShowContent(true), 7400));

    return () => timers.forEach(clearTimeout);
  }, []);

  const skipAnimation = useCallback(() => {
    setPhase("reveal");
    setShowContent(true);
    setConfettiActive(true);
  }, []);

  const giftPhase = phase === "intro" ? "idle" : phase === "reveal" ? "burst" : phase;

  return (
    <div className="min-h-[100svh] bg-[#0a0a0a] relative overflow-hidden">
      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rotation)); }
        }
        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes light-ray {
          0% { height: 0; opacity: 0; }
          30% { opacity: 1; }
          100% { height: 150px; opacity: 0; }
        }
        @keyframes gift-shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-8px) rotate(-2deg); }
          40% { transform: translateX(8px) rotate(2deg); }
          60% { transform: translateX(-6px) rotate(-1deg); }
          80% { transform: translateX(6px) rotate(1deg); }
        }
        @keyframes gift-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes title-reveal {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes card-reveal {
          0% { opacity: 0; transform: translateY(60px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bg-warm {
          0% { background-color: #0a0a0a; }
          100% { background-color: #fef9f4; }
        }
        @keyframes text-glow {
          0% { text-shadow: none; }
          50% { text-shadow: 0 0 30px rgba(232,180,76,0.4), 0 0 60px rgba(232,180,76,0.1); }
          100% { text-shadow: none; }
        }
        @keyframes star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Confetti system */}
      <Confetti active={confettiActive} />

      {/* ═══ PHASE 1: Gift Box Animation ═══ */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all"
        style={{
          opacity: phase === "reveal" ? 0 : 1,
          pointerEvents: phase === "reveal" ? "none" : "auto",
          transition: "opacity 1s ease-out",
          background: phase === "burst"
            ? "radial-gradient(circle, rgba(254,249,244,0.3), #0a0a0a)"
            : "#0a0a0a",
        }}
      >
        {/* Background sparkles */}
        <Sparkles count={phase === "open" || phase === "burst" ? 50 : 20} />

        {/* "Um presente pra voce" text */}
        <div
          className="mb-8 sm:mb-12 text-center transition-all duration-1000"
          style={{
            opacity: phase === "intro" || phase === "shake" ? 1 : phase === "glow" ? 0.8 : 0,
            transform: phase === "intro" ? "translateY(0)" : phase === "burst" ? "translateY(-30px) scale(0.8)" : "translateY(0)",
          }}
        >
          <p className="text-[#e8b44c]/70 text-[10px] sm:text-xs tracking-[0.5em] uppercase font-medium mb-2">
            Um presente especial
          </p>
          <p className="font-logo text-2xl sm:text-3xl text-[#e8b44c]/50">
            pra voc&ecirc;
          </p>
        </div>

        {/* Floating gift box */}
        <div style={{ animation: phase === "intro" ? "gift-float 3s ease-in-out infinite" : "none" }}>
          <GiftBox phase={giftPhase} />
          {/* Light burst on open */}
          <LightBurst active={phase === "open" || phase === "burst"} />
        </div>

        {/* Skip button */}
        <button
          onClick={skipAnimation}
          className="absolute bottom-8 text-white/20 hover:text-white/50 text-xs tracking-[0.3em] uppercase transition-colors"
        >
          Pular
        </button>
      </div>

      {/* ═══ PHASE 2: Birthday Content ═══ */}
      <div
        className="min-h-[100svh] flex flex-col overflow-hidden transition-all duration-1000"
        style={{
          background: showContent ? "#fef9f4" : "#0a0a0a",
        }}
      >
        {/* Decorative top bar */}
        <div
          className="h-1 bg-gradient-to-r from-coral via-pistachio to-golden transition-opacity duration-1000"
          style={{ opacity: showContent ? 1 : 0 }}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 sm:py-10 relative">
          {/* Animated background blurs */}
          <div
            className="absolute top-10 left-5 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-pistachio/10 blur-3xl transition-opacity duration-1000"
            style={{ opacity: showContent ? 1 : 0, animation: showContent ? "float-slow 8s ease-in-out infinite" : "none" }}
          />
          <div
            className="absolute bottom-16 right-5 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-coral/10 blur-3xl transition-opacity duration-1000"
            style={{ opacity: showContent ? 1 : 0, animation: showContent ? "float-slow 10s ease-in-out 2s infinite" : "none" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl transition-opacity duration-1000"
            style={{ opacity: showContent ? 1 : 0 }}
          />

          {/* Birthday message */}
          <div className="text-center mb-10 sm:mb-14 relative z-10">
            <p
              className="text-[10px] sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase text-coral/80 mb-4 font-semibold"
              style={{
                opacity: showContent ? 1 : 0,
                animation: showContent ? "title-reveal 1s ease-out 0.1s both" : "none",
              }}
            >
              Um presente pra voc&ecirc;
            </p>

            <h1
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic text-primary-dark mb-3 leading-tight"
              style={{
                opacity: showContent ? 1 : 0,
                animation: showContent ? "title-reveal 1.2s ease-out 0.3s both, text-glow 3s ease-in-out 2s infinite" : "none",
              }}
            >
              Feliz Anivers&aacute;rio
            </h1>

            {/* Decorative star divider */}
            <div
              className="flex items-center justify-center gap-3 mb-5"
              style={{
                opacity: showContent ? 1 : 0,
                animation: showContent ? "title-reveal 1s ease-out 0.6s both" : "none",
              }}
            >
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-coral/40" />
              <span
                className="text-golden text-lg sm:text-xl inline-block"
                style={{ animation: showContent ? "star-rotate 8s linear infinite" : "none" }}
              >
                &#10022;
              </span>
              <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-coral/40" />
            </div>

            <p
              className="text-base sm:text-lg md:text-xl text-foreground/55 font-light max-w-sm sm:max-w-md mx-auto leading-relaxed"
              style={{
                opacity: showContent ? 1 : 0,
                animation: showContent ? "title-reveal 1s ease-out 0.8s both" : "none",
              }}
            >
              Aqui est&aacute; o seu site, em 3 vers&otilde;es.
              <br />
              <span className="text-primary-dark font-medium">Escolha a que mais gostar!</span>
            </p>
          </div>

          {/* 3 Version Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-5xl w-full relative z-10">
            {[
              {
                href: "/v1",
                image: "/photos/ser.levemente_1745349010_3616572083368822439_6683801803_1.jpg",
                alt: "Vers\u00e3o Tropical",
                badge: "Vers\u00e3o 1",
                badgeBg: "bg-coral-light text-coral-dark",
                title: "Tropical",
                desc: "Quente e vibrante, com energia",
                border: "border-coral/10 hover:border-coral/30",
                delay: 0,
              },
              {
                href: "/v2",
                image: "/photos/ser.levemente_1535555625_1856697615237570673_6683801803_4.jpg",
                alt: "Vers\u00e3o Natureza",
                badge: "Vers\u00e3o 2",
                badgeBg: "bg-sage-light text-sage",
                title: "Natureza",
                desc: "Org\u00e2nica e fresca, verde",
                border: "border-sage/10 hover:border-sage/30",
                delay: 0.15,
              },
              {
                href: "/v3",
                image: "/photos/ser.levemente_1569699713_2143118985558736132_6683801803_7.jpg",
                alt: "Vers\u00e3o Pistache",
                badge: "Vers\u00e3o 3",
                badgeBg: "bg-pistachio-light text-pistachio-deep",
                title: "Pistache",
                desc: "Original e jovem, vibe brasileira",
                border: "border-pistachio/15 hover:border-pistachio/40",
                delay: 0.3,
              },
            ].map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border ${v.border}`}
                style={{
                  opacity: showContent ? 1 : 0,
                  animation: showContent ? `card-reveal 0.8s ease-out ${1 + v.delay}s both` : "none",
                }}
              >
                <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <span className={`inline-block ${v.badgeBg} text-[10px] sm:text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-2 font-semibold`}>
                    {v.badge}
                  </span>
                  <h2 className="text-lg sm:text-xl font-medium text-primary-dark mb-1">
                    {v.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/45">
                    {v.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Signature */}
          <div
            className="mt-10 sm:mt-14 text-center relative z-10"
            style={{
              opacity: showContent ? 1 : 0,
              animation: showContent ? "title-reveal 1s ease-out 1.8s both" : "none",
            }}
          >
            <p className="font-logo text-3xl sm:text-4xl text-primary-dark/25">
              &ldquo;Seja leve me leve&rdquo;
            </p>
          </div>
        </div>

        {/* Decorative bottom bar */}
        <div
          className="h-1 bg-gradient-to-r from-pistachio via-coral to-golden transition-opacity duration-1000"
          style={{ opacity: showContent ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
