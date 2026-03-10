"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   FLOATING GOLD DUST PARTICLES
   Tiny glittering particles that drift through the dark scene
   ═══════════════════════════════════════════════════════════ */
function GoldDust({ count = 50, intensity = 1 }: { count?: number; intensity?: number }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 6;
    const size = 1 + Math.random() * 2.5;
    const duration = 5 + Math.random() * 8;
    const driftX = (Math.random() - 0.5) * 60;
    const driftY = (Math.random() - 0.5) * 60;
    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(255,215,0,${0.7 * intensity}), rgba(245,214,128,0) 70%)`,
          animation: `dust-float ${duration}s ease-in-out ${delay}s infinite`,
          ["--dx" as string]: `${driftX}px`,
          ["--dy" as string]: `${driftY}px`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{particles}</div>;
}

/* ═══════════════════════════════════════════════════════════
   PREMIUM CONFETTI (gold-themed luxurious burst)
   ═══════════════════════════════════════════════════════════ */
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const colors = [
    "#FFD700", "#f5d680", "#e8b44c", "#DAA520", "#d4a040",
    "#ffffff", "#fffbe6", "#c49020", "#e87461", "#b5d89a",
  ];
  const particles = Array.from({ length: 100 }, (_, i) => {
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.8;
    const duration = 3 + Math.random() * 3;
    const size = 3 + Math.random() * 8;
    const rotation = Math.random() * 720 - 360;
    const drift = (Math.random() - 0.5) * 300;
    const shape = i % 4;
    return (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${left}%`,
          top: "-5%",
          width: shape === 2 ? size * 0.4 : size,
          height: shape === 2 ? size * 1.8 : size,
          backgroundColor: shape === 3 ? "transparent" : color,
          border: shape === 3 ? `1.5px solid ${color}` : "none",
          borderRadius: shape === 1 ? "50%" : shape === 3 ? "2px" : "1px",
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
   GOLDEN LIGHT RAYS (burst from opened gift)
   ═══════════════════════════════════════════════════════════ */
function LightBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const rays = Array.from({ length: 24 }, (_, i) => {
    const angle = (360 / 24) * i;
    const width = i % 2 === 0 ? 4 : 2;
    const maxH = i % 2 === 0 ? 220 : 140;
    return (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 origin-bottom"
        style={{
          width: `${width}px`,
          height: "0px",
          background: `linear-gradient(to top, rgba(255,215,0,0.7), rgba(245,214,128,0.2), transparent)`,
          transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          animation: `light-ray-lux 1.8s ease-out 0.1s forwards`,
          ["--max-h" as string]: `${maxH}px`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none z-10">{rays}</div>;
}

/* ═══════════════════════════════════════════════════════════
   SCREEN FLASH (golden flash when gift opens)
   ═══════════════════════════════════════════════════════════ */
function ScreenFlash({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(255,250,220,0.6), rgba(255,215,0,0.2), transparent 70%)",
        animation: "screen-flash 1.5s ease-out forwards",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   HYPERREALISTIC 3D GIFT BOX
   Premium red velvet with metallic gold satin ribbon
   ═══════════════════════════════════════════════════════════ */
function GiftBox({ phase }: { phase: "idle" | "shake" | "glow" | "open" | "burst" }) {
  const isOpening = phase === "open" || phase === "burst";

  return (
    <div
      className="relative"
      style={{
        width: "min(320px, 72vw)",
        height: "min(360px, 80vw)",
        perspective: "1200px",
        transformStyle: "preserve-3d",
        animation: phase === "shake" ? "gift-shake-lux 0.6s ease-in-out 4" : "none",
      }}
    >
      {/* Floor reflection - soft red glow beneath */}
      <div
        className="absolute left-[5%] right-[5%] bottom-[-10%] h-[25%] transition-all duration-1000"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(180,30,30,0.25), transparent 70%)",
          filter: "blur(25px)",
          opacity: phase === "burst" ? 0 : 0.7,
        }}
      />

      {/* Ambient glow behind box */}
      <div
        className="absolute inset-[-60%] rounded-full transition-all"
        style={{
          background: "radial-gradient(circle, rgba(255,215,0,0.2), rgba(220,38,38,0.06), transparent 55%)",
          opacity: phase === "glow" || isOpening ? 1 : 0,
          transform: phase === "burst" ? "scale(5)" : isOpening ? "scale(2.5)" : "scale(0.3)",
          transition: "all 2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ══════════ BOX BODY ══════════ */}
      <div
        className="absolute bottom-[6%] left-[6%] right-[6%] top-[22%] rounded-[14px] transition-all"
        style={{
          background: `
            radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.09) 0%, transparent 45%),
            linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%),
            linear-gradient(168deg, #ef4444 0%, #dc2626 15%, #c81e1e 30%, #b91c1c 50%, #991b1b 70%, #7f1d1d 88%, #6b1515 100%)
          `,
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.4),
            0 8px 20px rgba(0,0,0,0.3),
            0 30px 60px -10px rgba(0,0,0,0.5),
            0 60px 120px -20px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -3px 8px rgba(0,0,0,0.1)
          `,
          transform: phase === "burst" ? "scale(0) rotateX(25deg)" : "none",
          opacity: phase === "burst" ? 0 : 1,
          transitionDuration: "0.9s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Subtle noise/velvet texture */}
        <div
          className="absolute inset-0 rounded-[14px] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vertical gold satin ribbon */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 overflow-hidden"
          style={{ width: "14%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg,
                #705a10 0%, #8b6914 8%, #b8942a 18%, #d4a040 28%,
                #f5d680 40%, #ffe4a0 48%, #fff5d0 50%, #ffe4a0 52%,
                #f5d680 60%, #d4a040 72%, #b8942a 82%, #8b6914 92%, #705a10 100%)`,
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.15)",
            }}
          />
          {/* Shimmer animation */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.35) 55%, transparent 100%)",
              backgroundSize: "100% 300%",
              animation: isOpening ? "none" : "ribbon-shimmer-v 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Horizontal gold satin ribbon */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden"
          style={{ height: "14%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg,
                #705a10 0%, #8b6914 8%, #b8942a 18%, #d4a040 28%,
                #f5d680 40%, #ffe4a0 48%, #fff5d0 50%, #ffe4a0 52%,
                #f5d680 60%, #d4a040 72%, #b8942a 82%, #8b6914 92%, #705a10 100%)`,
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.15)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.35) 55%, transparent 100%)",
              backgroundSize: "300% 100%",
              animation: isOpening ? "none" : "ribbon-shimmer-h 4s ease-in-out 2s infinite",
            }}
          />
        </div>

        {/* Ribbon cross center - luxury jewel ornament */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ width: "17%", height: "17%" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 38% 32%,
                #fff5d0 0%, #ffe4a0 15%, #f5d680 30%, #d4a040 55%, #8b6914 90%)`,
              boxShadow: `
                0 2px 10px rgba(0,0,0,0.35),
                0 0 25px rgba(255,215,0,0.3),
                inset 0 1px 2px rgba(255,255,255,0.4)
              `,
            }}
          />
          <div
            className="absolute inset-[18%] rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.6), rgba(255,255,255,0.1) 45%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* ══════════ LID ══════════ */}
      <div
        className="absolute left-[2%] right-[2%] top-[1%] transition-all rounded-[16px]"
        style={{
          height: "24%",
          background: `
            radial-gradient(ellipse at 28% 25%, rgba(255,255,255,0.12) 0%, transparent 50%),
            linear-gradient(168deg, #f87171 0%, #ef4444 20%, #dc2626 45%, #c81e1e 70%, #b91c1c 100%)
          `,
          boxShadow: `
            0 -2px 8px rgba(0,0,0,0.05),
            0 6px 25px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 2px rgba(0,0,0,0.08)
          `,
          transformOrigin: "top center",
          transform: phase === "open"
            ? "perspective(1200px) rotateX(-135deg) translateY(-35px)"
            : phase === "burst"
              ? "perspective(1200px) rotateX(-180deg) translateY(-120px) scale(0)"
              : "perspective(1200px) rotateX(0deg)",
          transitionDuration: phase === "open" ? "2.2s" : "0.9s",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: phase === "burst" ? 0 : 1,
        }}
      >
        {/* Lid texture */}
        <div
          className="absolute inset-0 rounded-[16px] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Lid ribbon strip */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 overflow-hidden rounded-[16px]"
          style={{ width: "13%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg,
                #705a10 0%, #b8942a 18%, #f5d680 40%, #fff5d0 50%, #f5d680 60%, #b8942a 82%, #705a10 100%)`,
            }}
          />
        </div>

        {/* ══════════ PREMIUM BOW ══════════ */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-70%",
            width: "min(160px, 48%)",
            height: "min(110px, 32%)",
            opacity: phase === "burst" ? 0 : 1,
            transition: "opacity 0.5s",
          }}
        >
          {/* Left satin loop */}
          <div
            className="absolute right-[48%] top-[15%]"
            style={{
              width: "95%",
              height: "72%",
              borderRadius: "55% 50% 40% 55% / 55% 80% 25% 50%",
              background: `linear-gradient(140deg,
                #ffe4a0 0%, #f5d680 20%, #d4a040 45%, #c49020 65%, #a07818 85%, #8b6914 100%)`,
              boxShadow: `
                inset 3px 3px 10px rgba(255,255,255,0.35),
                inset -3px -3px 8px rgba(0,0,0,0.2),
                0 3px 12px rgba(0,0,0,0.25)
              `,
              transform: "rotate(-22deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-[inherit]"
              style={{
                background: "radial-gradient(ellipse at 38% 28%, rgba(255,255,255,0.4), transparent 55%)",
              }}
            />
          </div>

          {/* Right satin loop */}
          <div
            className="absolute left-[48%] top-[15%]"
            style={{
              width: "95%",
              height: "72%",
              borderRadius: "50% 55% 55% 40% / 80% 55% 50% 25%",
              background: `linear-gradient(220deg,
                #ffe4a0 0%, #f5d680 20%, #d4a040 45%, #c49020 65%, #a07818 85%, #8b6914 100%)`,
              boxShadow: `
                inset -3px 3px 10px rgba(255,255,255,0.35),
                inset 3px -3px 8px rgba(0,0,0,0.2),
                0 3px 12px rgba(0,0,0,0.25)
              `,
              transform: "rotate(22deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-[inherit]"
              style={{
                background: "radial-gradient(ellipse at 62% 28%, rgba(255,255,255,0.4), transparent 55%)",
              }}
            />
          </div>

          {/* Left tail */}
          <div
            className="absolute left-[12%] bottom-[-35%]"
            style={{
              width: "13%",
              height: "65%",
              background: `linear-gradient(90deg, #a07818, #d4a040 40%, #f5d680 60%, #c49020)`,
              borderRadius: "3px 3px 40% 60%",
              transform: "rotate(-28deg)",
              boxShadow: "1px 3px 6px rgba(0,0,0,0.25)",
            }}
          />

          {/* Right tail */}
          <div
            className="absolute right-[12%] bottom-[-35%]"
            style={{
              width: "13%",
              height: "65%",
              background: `linear-gradient(90deg, #c49020, #f5d680 40%, #d4a040 60%, #a07818)`,
              borderRadius: "3px 3px 60% 40%",
              transform: "rotate(28deg)",
              boxShadow: "-1px 3px 6px rgba(0,0,0,0.25)",
            }}
          />

          {/* Center knot */}
          <div
            className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: "30%",
              height: "42%",
              borderRadius: "42%",
              background: `radial-gradient(circle at 38% 32%,
                #fff5d0 0%, #ffe4a0 15%, #f5d680 35%, #d4a040 60%, #8b6914 100%)`,
              boxShadow: `
                0 3px 12px rgba(0,0,0,0.35),
                0 0 20px rgba(255,215,0,0.4),
                inset 0 1px 3px rgba(255,255,255,0.5)
              `,
            }}
          >
            <div
              className="absolute inset-[12%] rounded-[inherit]"
              style={{
                background: "radial-gradient(circle at 32% 25%, rgba(255,255,255,0.7), rgba(255,255,255,0.1) 50%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Interior golden glow when opening */}
      <div
        className="absolute left-[8%] right-[8%] top-[16%] bottom-[8%] rounded-lg transition-all"
        style={{
          background: `radial-gradient(ellipse at 50% 0%,
            rgba(255,255,240,1) 0%, rgba(255,250,220,0.8) 15%,
            rgba(255,215,0,0.5) 35%, rgba(232,180,76,0.2) 55%, transparent 75%)`,
          opacity: isOpening && phase !== "burst" ? 1 : 0,
          transform: isOpening ? "translateY(-18%) scaleY(1.3)" : "translateY(0) scaleY(1)",
          transitionDuration: "1.8s",
          filter: "blur(3px)",
        }}
      />

      <LightBurst active={isOpening} />
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
  const [flashActive, setFlashActive] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Fade in from pure black
    const t0 = setTimeout(() => setFadeIn(true), 300);

    const timers: NodeJS.Timeout[] = [t0];

    // Cinematic sequence timeline
    timers.push(setTimeout(() => setPhase("shake"), 3000));      // Anticipation shake
    timers.push(setTimeout(() => setPhase("glow"), 4800));       // Golden glow builds
    timers.push(setTimeout(() => setPhase("open"), 5800));       // Lid opens slowly
    timers.push(setTimeout(() => setFlashActive(true), 7200));   // Screen flash
    timers.push(setTimeout(() => setConfettiActive(true), 7400));// Gold confetti
    timers.push(setTimeout(() => setPhase("burst"), 8200));      // Box dissolves
    timers.push(setTimeout(() => setPhase("reveal"), 9000));     // Content fades in
    timers.push(setTimeout(() => setShowContent(true), 9300));

    return () => timers.forEach(clearTimeout);
  }, []);

  const skipAnimation = useCallback(() => {
    setPhase("reveal");
    setShowContent(true);
    setConfettiActive(true);
    setFadeIn(true);
  }, []);

  const giftPhase = phase === "intro" ? "idle" : phase === "reveal" ? "burst" : phase;

  return (
    <div className="min-h-[100svh] bg-black relative overflow-hidden">
      {/* ═══ Animation Keyframes ═══ */}
      <style jsx global>{`
        @keyframes dust-float {
          0%, 100% {
            opacity: 0.2;
            transform: translate(0, 0) scale(1);
          }
          25% { opacity: 0.8; transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) scale(1.2); }
          50% { opacity: 0.4; transform: translate(var(--dx), var(--dy)) scale(0.8); }
          75% { opacity: 0.9; transform: translate(calc(var(--dx) * 0.6), calc(var(--dy) * 0.6)) scale(1.1); }
        }

        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rotation)); }
        }

        @keyframes light-ray-lux {
          0% { height: 0; opacity: 0; }
          15% { opacity: 0.9; }
          100% { height: var(--max-h, 200px); opacity: 0; }
        }

        @keyframes gift-shake-lux {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-12px) rotate(-3.5deg); }
          20% { transform: translateX(12px) rotate(3.5deg); }
          30% { transform: translateX(-11px) rotate(-3deg); }
          40% { transform: translateX(11px) rotate(3deg); }
          50% { transform: translateX(-9px) rotate(-2.5deg); }
          60% { transform: translateX(9px) rotate(2.5deg); }
          70% { transform: translateX(-7px) rotate(-1.5deg); }
          80% { transform: translateX(7px) rotate(1.5deg); }
          90% { transform: translateX(-3px) rotate(-0.5deg); }
        }

        @keyframes gift-float-lux {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-14px) scale(1.008); }
        }

        @keyframes ribbon-shimmer-v {
          0% { background-position: 100% -100%; }
          50% { background-position: 100% 200%; }
          100% { background-position: 100% -100%; }
        }

        @keyframes ribbon-shimmer-h {
          0% { background-position: -100% 100%; }
          50% { background-position: 200% 100%; }
          100% { background-position: -100% 100%; }
        }

        @keyframes screen-flash {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes spotlight-breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @keyframes title-reveal {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes card-reveal {
          0% { opacity: 0; transform: translateY(60px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
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

        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Confetti system */}
      <Confetti active={confettiActive} />

      {/* Screen flash */}
      <ScreenFlash active={flashActive} />

      {/* ═══ PHASE 1: Gift Box Scene ═══ */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all"
        style={{
          opacity: phase === "reveal" ? 0 : 1,
          pointerEvents: phase === "reveal" ? "none" : "auto",
          transition: "opacity 1.2s ease-out",
          background: "#000000",
        }}
      >
        {/* Spotlight effect - warm circle from above */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 45% at 50% 45%,
                rgba(40,25,10,0.6) 0%,
                rgba(20,12,5,0.3) 40%,
                rgba(0,0,0,0) 70%)
            `,
            animation: "spotlight-breathe 6s ease-in-out infinite",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 2s ease-out",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating gold dust */}
        <GoldDust
          count={phase === "open" || phase === "burst" ? 80 : 40}
          intensity={phase === "glow" || phase === "open" ? 1.5 : 1}
        />

        {/* "Um presente especial" text */}
        <div
          className="mb-10 sm:mb-14 text-center transition-all duration-1500"
          style={{
            opacity: fadeIn && (phase === "intro" || phase === "shake") ? 1 : phase === "glow" ? 0.6 : 0,
            transform: fadeIn
              ? phase === "burst" ? "translateY(-40px) scale(0.8)" : "translateY(0)"
              : "translateY(20px)",
            transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p
            className="text-[9px] sm:text-[11px] tracking-[0.6em] uppercase font-light mb-3"
            style={{
              background: "linear-gradient(90deg, rgba(255,215,0,0.5), rgba(245,214,128,0.8), rgba(255,215,0,0.5))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
              animation: "text-shimmer 4s linear infinite",
            }}
          >
            Um presente especial
          </p>
          <p
            className="font-logo text-2xl sm:text-3xl"
            style={{
              color: "rgba(255,215,0,0.35)",
              textShadow: "0 0 30px rgba(255,215,0,0.1)",
            }}
          >
            pra voc&ecirc;
          </p>
        </div>

        {/* Floating gift box */}
        <div
          style={{
            animation: phase === "intro" ? "gift-float-lux 4s ease-in-out infinite" : "none",
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 2s ease-out, transform 2s ease-out",
          }}
        >
          <GiftBox phase={giftPhase} />
        </div>

        {/* "Toque para abrir" hint */}
        <div
          className="mt-10 sm:mt-14 text-center transition-all duration-1000"
          style={{
            opacity: fadeIn && (phase === "intro" || phase === "shake") ? 0.4 : 0,
          }}
        >
          <p className="text-[8px] sm:text-[10px] tracking-[0.5em] uppercase text-[#e8b44c]/30 font-light">
            Aguarde...
          </p>
        </div>

        {/* Skip button */}
        <button
          onClick={skipAnimation}
          className="absolute bottom-6 sm:bottom-8 text-white/10 hover:text-white/30 text-[10px] tracking-[0.4em] uppercase transition-colors duration-500"
        >
          Pular
        </button>
      </div>

      {/* ═══ PHASE 2: Birthday Content ═══ */}
      <div
        className="min-h-[100svh] flex flex-col overflow-hidden transition-all duration-1500"
        style={{
          background: showContent ? "#fef9f4" : "#000000",
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
