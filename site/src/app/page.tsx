"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   FLOATING GOLD DUST
   Tiny gold particles drifting in the dark, like dust in a spotlight
   ═══════════════════════════════════════════════════════════ */
function GoldDust({ count = 60, boost = false }: { count?: number; boost?: boolean }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 8;
    const size = 0.8 + Math.random() * (boost ? 3.5 : 2);
    const dur = 6 + Math.random() * 10;
    const dx = (Math.random() - 0.5) * 60;
    const dy = (Math.random() - 0.5) * 60;
    const brightness = 0.4 + Math.random() * 0.6;
    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(255,215,0,${brightness}), transparent 70%)`,
          animation: `dust-float ${dur}s ease-in-out ${delay}s infinite`,
          ["--dx" as string]: `${dx}px`,
          ["--dy" as string]: `${dy}px`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{particles}</div>;
}

/* ═══════════════════════════════════════════════════════════
   ORBITING SPARKLES
   Small sparkles that orbit slowly around the gift box
   ═══════════════════════════════════════════════════════════ */
function OrbitingSparkles({ active }: { active: boolean }) {
  const sparkles = Array.from({ length: 8 }, (_, i) => {
    const angle = (360 / 8) * i;
    const radius = 180 + Math.random() * 40;
    const size = 3 + Math.random() * 3;
    const delay = i * 0.5;
    return (
      <div
        key={i}
        className="absolute left-1/2 top-1/2"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: `radial-gradient(circle, rgba(255,250,200,0.9), rgba(255,215,0,0.3), transparent)`,
          borderRadius: "50%",
          boxShadow: "0 0 6px rgba(255,215,0,0.4)",
          animation: `orbit ${12 + i * 2}s linear ${delay}s infinite`,
          ["--radius" as string]: `${radius}px`,
          ["--start-angle" as string]: `${angle}deg`,
          opacity: active ? 1 : 0,
          transition: "opacity 2s ease-in",
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{sparkles}</div>;
}

/* ═══════════════════════════════════════════════════════════
   RISING PARTICLES (emerge from inside the box when opening)
   ═══════════════════════════════════════════════════════════ */
function RisingParticles({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 40 }, (_, i) => {
    const left = 20 + Math.random() * 60;
    const delay = Math.random() * 2;
    const dur = 1.5 + Math.random() * 2.5;
    const size = 2 + Math.random() * 5;
    const drift = (Math.random() - 0.5) * 100;
    const isGold = Math.random() > 0.3;
    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          bottom: "50%",
          width: size,
          height: size,
          background: isGold
            ? `radial-gradient(circle, rgba(255,250,200,0.95), rgba(255,215,0,0.5), transparent)`
            : `radial-gradient(circle, rgba(255,255,255,0.9), transparent)`,
          boxShadow: isGold ? `0 0 ${size * 2}px rgba(255,215,0,0.3)` : "none",
          animation: `rise-up ${dur}s ease-out ${delay}s forwards`,
          opacity: 0,
          ["--drift" as string]: `${drift}px`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none z-20">{particles}</div>;
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI (luxurious gold-themed burst)
   ═══════════════════════════════════════════════════════════ */
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const colors = [
    "#FFD700", "#f5d680", "#e8b44c", "#DAA520", "#d4a040",
    "#ffffff", "#fffbe6", "#c49020", "#e87461", "#b5d89a",
  ];
  const particles = Array.from({ length: 120 }, (_, i) => {
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 1;
    const dur = 3 + Math.random() * 3;
    const size = 3 + Math.random() * 8;
    const rotation = Math.random() * 720 - 360;
    const drift = (Math.random() - 0.5) * 350;
    const shape = i % 5;
    return (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${left}%`,
          top: "-5%",
          width: shape === 2 ? size * 0.35 : shape === 4 ? size * 0.6 : size,
          height: shape === 2 ? size * 2 : shape === 4 ? size * 0.6 : size,
          backgroundColor: shape === 3 ? "transparent" : color,
          border: shape === 3 ? `1.5px solid ${color}` : "none",
          borderRadius: shape === 1 ? "50%" : shape === 4 ? "50% 0" : "1px",
          animation: `confetti-fall ${dur}s ease-in ${delay}s forwards`,
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
   SCREEN FLASH (golden bloom when gift opens)
   ═══════════════════════════════════════════════════════════ */
function ScreenFlash({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(255,250,220,0.8), rgba(255,215,0,0.3), transparent 70%)",
        animation: "screen-flash 2s ease-out forwards",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   GIFT BOX — Redesigned for coherence

   Architecture:
   - Container holds everything with proper proportions
   - Burst-fade wrapper: entire box fades + shrinks together (no orphaned glows)
   - Lid + Bow in ONE wrapper: they lift together, bow uses fixed min(px,vw) sizing
   - Light beam & effects only during "open" phase, NOT during "burst"
   - Body: deep crimson with gold ribbons + jewel at crossing
   ═══════════════════════════════════════════════════════════ */
function GiftBox({ phase }: { phase: "idle" | "shake" | "glow" | "open" | "burst" }) {
  const isOpen = phase === "open";
  const isBurst = phase === "burst";
  const isOpening = isOpen || isBurst;

  // Lid+bow wrapper lift amount (max caps negative value on large screens)
  const liftY = isOpen ? "translateY(max(-85px, -22vw))" : "translateY(0)";

  // Shared gold ribbon gradient (horizontal direction)
  const ribbonGrad = `linear-gradient(90deg,
    #5c4510 0%, #8b6914 14%, #c49530 32%, #e8b84c 44%,
    #f5d680 48%, #ffe4a0 50%, #f5d680 52%,
    #e8b84c 56%, #c49530 68%, #8b6914 86%, #5c4510 100%)`;
  const ribbonGradV = `linear-gradient(180deg,
    #5c4510 0%, #8b6914 14%, #c49530 32%, #e8b84c 44%,
    #f5d680 48%, #ffe4a0 50%, #f5d680 52%,
    #e8b84c 56%, #c49530 68%, #8b6914 86%, #5c4510 100%)`;

  // Noise texture SVG data URI
  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

  return (
    <div
      className="relative"
      style={{
        width: "min(270px, 66vw)",
        height: "min(380px, 92vw)",
        animation: phase === "shake" ? "gift-shake-lux 0.55s ease-in-out 5" : "none",
      }}
    >
      {/* ═══ BURST FADE WRAPPER ═══
          Everything inside fades + shrinks together during burst.
          No more orphaned glows or flat golden ellipses. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isBurst ? 0 : 1,
          transform: isBurst ? "scale(0.5)" : "scale(1)",
          transition: isBurst ? "all 1s ease-in" : "opacity 0.3s",
        }}
      >
        {/* ── Floor reflection ── */}
        <div
          className="absolute left-[5%] right-[5%] bottom-[-2%] h-[16%]"
          style={{
            background: "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(140,20,20,0.15), rgba(80,10,10,0.08) 40%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
        {/* Contact shadow */}
        <div
          className="absolute left-[12%] right-[12%] bottom-[2%] h-[3%]"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.55), transparent 70%)",
            filter: "blur(6px)",
          }}
        />

        {/* ── Ambient glow (glow & open phases only, NOT burst) ── */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "-60%",
            background: "radial-gradient(circle, rgba(255,215,0,0.12), rgba(200,30,30,0.04), transparent 55%)",
            opacity: phase === "glow" || isOpen ? 1 : 0,
            transform: isOpen ? "scale(3)" : "scale(0.3)",
            transition: "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* ── GOLDEN LIGHT BEAM from gap (only "open", NOT "burst") ── */}
        <div
          className="absolute left-[15%] right-[15%]"
          style={{
            top: "5%",
            height: "39%",
            background: `radial-gradient(ellipse 70% 100% at 50% 100%,
              rgba(255,255,240,0.85) 0%, rgba(255,250,200,0.5) 15%,
              rgba(255,215,0,0.25) 35%, rgba(232,180,76,0.08) 55%, transparent 75%)`,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom center",
            transition: isOpen ? "all 2s ease-out 0.5s" : "all 0.3s ease-in",
            filter: "blur(6px)",
            zIndex: 5,
          }}
        />
        {/* Gap glow line — right at body top */}
        <div
          className="absolute left-[8%] right-[8%]"
          style={{
            top: "43.5%",
            height: "6px",
            background: `radial-gradient(ellipse 80% 100% at 50% 50%,
              rgba(255,255,240,1) 0%, rgba(255,250,200,0.8) 30%,
              rgba(255,215,0,0.4) 60%, transparent 90%)`,
            opacity: isOpen ? 1 : 0,
            transition: isOpen ? "opacity 1s ease-out 0.3s" : "opacity 0.2s ease-in",
            filter: "blur(3px)",
            zIndex: 6,
          }}
        />

        {/* Rising sparkles from inside */}
        <RisingParticles active={isOpen} />

        {/* ══════════════════════════════════════════════
           BOX BODY — Deep crimson with gold ribbons
           Body top at 44%, lid bottom flush at 44%
           ══════════════════════════════════════════════ */}
        <div
          className="absolute left-[10%] right-[10%] bottom-[4%] rounded-b-[10px] rounded-t-[5px] overflow-hidden"
          style={{
            top: "44%",
            background: `
              radial-gradient(ellipse 60% 40% at 22% 10%, rgba(255,255,255,0.09), transparent),
              linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.18) 100%),
              linear-gradient(172deg,
                #ef3535 0%, #dc2626 15%, #c81e1e 30%,
                #b91c1c 45%, #a01818 60%, #8b1414 75%, #7f1d1d 90%)
            `,
            boxShadow: `
              0 2px 3px rgba(0,0,0,0.5),
              0 8px 20px rgba(0,0,0,0.4),
              0 25px 50px -5px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.12),
              inset -2px 0 8px rgba(0,0,0,0.08),
              inset 2px 0 8px rgba(0,0,0,0.08),
              inset 0 -4px 12px rgba(0,0,0,0.12)
            `,
          }}
        >
          {/* Velvet noise texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: noiseSvg }} />

          {/* Top edge highlight */}
          <div className="absolute top-0 left-[3%] right-[3%] h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(255,200,200,0.3) 30%, rgba(255,220,220,0.4) 50%, rgba(255,200,200,0.3) 70%, transparent)",
          }} />
          {/* Left edge highlight */}
          <div className="absolute top-[3%] left-0 bottom-[3%] w-px" style={{
            background: "linear-gradient(180deg, transparent, rgba(255,200,200,0.15) 30%, rgba(255,200,200,0.2) 50%, transparent 95%)",
          }} />

          {/* Interior glow when open */}
          <div className="absolute top-0 left-[3%] right-[3%] h-[35%]" style={{
            background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,250,220,0.5), rgba(255,215,0,0.15), transparent 70%)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }} />

          {/* ── Vertical gold satin ribbon ── */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 overflow-hidden" style={{ width: "12%" }}>
            <div className="absolute inset-0" style={{ background: ribbonGrad, boxShadow: "inset 0 0 3px rgba(0,0,0,0.08)" }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.35) 49%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.35) 51%, transparent)",
              backgroundSize: "100% 350%",
              animation: isOpening ? "none" : "ribbon-shimmer-v 4s ease-in-out infinite",
            }} />
            <div className="absolute top-0 bottom-0 left-0 w-[1.5px]" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.12), transparent)" }} />
            <div className="absolute top-0 bottom-0 right-0 w-[1.5px]" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.12), transparent)" }} />
          </div>

          {/* ── Horizontal gold satin ribbon ── */}
          <div className="absolute left-0 right-0 overflow-hidden" style={{ top: "38%", height: "12%" }}>
            <div className="absolute inset-0" style={{ background: ribbonGradV, boxShadow: "inset 0 0 3px rgba(0,0,0,0.08)" }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 49%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.35) 51%, transparent)",
              backgroundSize: "350% 100%",
              animation: isOpening ? "none" : "ribbon-shimmer-h 4s ease-in-out 2s infinite",
            }} />
            <div className="absolute left-0 right-0 top-0 h-[1.5px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)" }} />
            <div className="absolute left-0 right-0 bottom-0 h-[1.5px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)" }} />
          </div>

          {/* ── Center jewel at ribbon crossing ── */}
          <div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ top: "36%", width: "13%", paddingBottom: "13%" }}>
            <div className="absolute inset-[-25%] rounded-full" style={{
              background: "radial-gradient(circle, rgba(255,215,0,0.2), transparent 60%)",
              animation: isOpening ? "none" : "jewel-pulse 3s ease-in-out infinite",
            }} />
            <div className="absolute inset-0 rounded-full" style={{
              background: `radial-gradient(circle at 36% 30%,
                #fff8e0 0%, #ffe4a0 12%, #f5d680 28%, #d4a040 50%, #a88020 75%, #8b6914 100%)`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.4), 0 0 22px rgba(255,215,0,0.2), inset 0 1px 3px rgba(255,255,255,0.5)",
            }} />
            <div className="absolute rounded-full" style={{
              top: "14%", left: "20%", width: "38%", height: "32%",
              background: "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.75), transparent 80%)",
            }} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
           LID + BOW WRAPPER — They lift together as one unit.
           Wrapper spans from top of container down to body top (44%).
           Lid sits at the BOTTOM of this wrapper = flush with body top.
           Bow sits above lid with FIXED min(px,vw) sizing.
           ══════════════════════════════════════════════════ */}
        <div
          className="absolute left-0 right-0 top-0 z-10"
          style={{
            bottom: "56%",
            transform: liftY,
            transition: isOpen
              ? "transform 2.8s cubic-bezier(0.22, 0.61, 0.36, 1)"
              : "transform 0.5s ease",
            filter: isOpen ? "drop-shadow(0 8px 20px rgba(0,0,0,0.35))" : "none",
          }}
        >
          {/* ── LID — sits at bottom of wrapper, wider than body ── */}
          <div
            className="absolute left-[7%] right-[7%] bottom-0 overflow-hidden"
            style={{
              height: "min(56px, 15vw)",
              borderRadius: "10px 10px 5px 5px",
              background: `
                radial-gradient(ellipse 50% 50% at 25% 20%, rgba(255,255,255,0.14), transparent 60%),
                linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.06) 100%),
                linear-gradient(172deg,
                  #f87171 0%, #ef4444 12%, #dc2626 28%, #c81e1e 48%,
                  #b91c1c 65%, #a01818 80%, #8b1414 100%)
              `,
              boxShadow: `
                0 4px 20px rgba(0,0,0,0.3),
                0 2px 8px rgba(0,0,0,0.2),
                inset 0 1px 0 rgba(255,255,255,0.2),
                inset 0 -1px 3px rgba(0,0,0,0.1)
              `,
            }}
          >
            {/* Velvet texture */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: noiseSvg }} />
            {/* Bottom edge shadow */}
            <div className="absolute bottom-0 left-[2%] right-[2%] h-[3px] rounded-full" style={{
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.25) 85%, transparent)",
            }} />
            {/* Top edge highlight */}
            <div className="absolute top-0 left-[4%] right-[4%] h-px" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,220,220,0.35) 30%, rgba(255,230,230,0.4) 50%, rgba(255,220,220,0.35) 70%, transparent)",
            }} />
            {/* Ribbon strip on lid */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 overflow-hidden" style={{ width: "11.5%" }}>
              <div className="absolute inset-0" style={{ background: ribbonGrad }} />
            </div>
          </div>

          {/* ══════════ SATIN BOW ══════════
              Fixed min(px,vw) sizing — NOT percentage of lid height!
              Positioned just above lid. */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: "min(56px, 15vw)",
              width: "min(140px, 46vw)",
              height: "min(96px, 32vw)",
            }}
          >
            {/* Bow shadow cast on lid */}
            <div className="absolute left-[20%] right-[20%] bottom-[-12%] h-[18%]" style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.18), transparent 70%)",
              filter: "blur(5px)",
            }} />

            {/* Left satin loop — large elliptical shape */}
            <div
              className="absolute"
              style={{
                right: "36%",
                top: "0%",
                width: "74%",
                height: "75%",
                borderRadius: "50% 48% 42% 50% / 52% 70% 30% 48%",
                background: `linear-gradient(140deg,
                  #ffe8a8 0%, #f5d680 18%, #e8c060 35%,
                  #d4a040 52%, #c49020 68%, #a88020 82%, #8b6914 100%)`,
                boxShadow: `
                  inset 4px 4px 12px rgba(255,255,255,0.4),
                  inset -3px -3px 8px rgba(0,0,0,0.15),
                  0 4px 14px rgba(0,0,0,0.3)
                `,
                transform: "rotate(-15deg)",
              }}
            >
              <div className="absolute inset-0 rounded-[inherit]" style={{
                background: "radial-gradient(ellipse 55% 45% at 32% 25%, rgba(255,255,255,0.5), transparent 60%)",
              }} />
            </div>

            {/* Right satin loop — mirror */}
            <div
              className="absolute"
              style={{
                left: "36%",
                top: "0%",
                width: "74%",
                height: "75%",
                borderRadius: "48% 50% 50% 42% / 70% 52% 48% 30%",
                background: `linear-gradient(220deg,
                  #ffe8a8 0%, #f5d680 18%, #e8c060 35%,
                  #d4a040 52%, #c49020 68%, #a88020 82%, #8b6914 100%)`,
                boxShadow: `
                  inset -4px 4px 12px rgba(255,255,255,0.4),
                  inset 3px -3px 8px rgba(0,0,0,0.15),
                  0 4px 14px rgba(0,0,0,0.3)
                `,
                transform: "rotate(15deg)",
              }}
            >
              <div className="absolute inset-0 rounded-[inherit]" style={{
                background: "radial-gradient(ellipse 55% 45% at 68% 25%, rgba(255,255,255,0.5), transparent 60%)",
              }} />
            </div>

            {/* Left ribbon tail */}
            <div className="absolute" style={{
              left: "16%",
              bottom: "-32%",
              width: "13%",
              height: "58%",
              background: `linear-gradient(90deg, #8b6914, #c49020 30%, #e8b84c 50%, #c49020 70%, #a88020)`,
              borderRadius: "2px 2px 30% 60%",
              transform: "rotate(-28deg)",
              boxShadow: "2px 3px 8px rgba(0,0,0,0.3)",
            }} />

            {/* Right ribbon tail */}
            <div className="absolute" style={{
              right: "16%",
              bottom: "-32%",
              width: "13%",
              height: "58%",
              background: `linear-gradient(90deg, #a88020, #c49020 30%, #e8b84c 50%, #c49020 70%, #8b6914)`,
              borderRadius: "2px 2px 60% 30%",
              transform: "rotate(28deg)",
              boxShadow: "-2px 3px 8px rgba(0,0,0,0.3)",
            }} />

            {/* Center knot */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{
              top: "18%", width: "22%", height: "38%",
            }}>
              <div className="absolute inset-0" style={{
                borderRadius: "44% 44% 48% 48%",
                background: `radial-gradient(circle at 40% 30%,
                  #fff8e0 0%, #ffe4a0 15%, #f5d680 30%, #e8c060 45%,
                  #d4a040 60%, #a88020 80%, #8b6914 100%)`,
                boxShadow: `
                  0 3px 12px rgba(0,0,0,0.4),
                  0 0 20px rgba(255,215,0,0.3),
                  inset 0 2px 3px rgba(255,255,255,0.5)
                `,
              }} />
              <div className="absolute rounded-full" style={{
                top: "12%", left: "18%", width: "38%", height: "30%",
                background: "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.7), transparent 70%)",
              }} />
              {/* Fold line */}
              <div className="absolute left-[28%] top-[52%] w-[44%] h-px rotate-[-6deg]" style={{
                background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)",
              }} />
            </div>
          </div>
        </div>

        {/* Orbiting sparkles */}
        <OrbitingSparkles active={phase === "glow" || isOpening} />
      </div>
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
    const timers: NodeJS.Timeout[] = [];

    // Cinematic timeline - the opening is the star of the show
    timers.push(setTimeout(() => setFadeIn(true), 400));        // Fade in from black
    timers.push(setTimeout(() => setPhase("shake"), 3200));     // Anticipation shake
    timers.push(setTimeout(() => setPhase("glow"), 5000));      // Golden aura builds
    timers.push(setTimeout(() => setPhase("open"), 6200));      // Lid lifts up SLOWLY
    timers.push(setTimeout(() => setFlashActive(true), 8800));  // Golden flash
    timers.push(setTimeout(() => setConfettiActive(true), 9000)); // Confetti burst
    timers.push(setTimeout(() => setPhase("burst"), 10000));    // Box dissolves
    timers.push(setTimeout(() => setPhase("reveal"), 10800));   // Content fades in
    timers.push(setTimeout(() => setShowContent(true), 11100));

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
      {/* ═══ Keyframe Animations ═══ */}
      <style jsx global>{`
        @keyframes dust-float {
          0%, 100% { opacity: 0.15; transform: translate(0, 0) scale(1); }
          25% { opacity: 0.9; transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) scale(1.4); }
          50% { opacity: 0.25; transform: translate(var(--dx), var(--dy)) scale(0.6); }
          75% { opacity: 0.8; transform: translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.7)) scale(1.1); }
        }
        @keyframes orbit {
          from { transform: rotate(var(--start-angle)) translateX(var(--radius)) rotate(calc(-1 * var(--start-angle))); }
          to { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * var(--start-angle) - 360deg)); }
        }
        @keyframes rise-up {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.3); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-250px) translateX(var(--drift)) scale(0); }
        }
        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rotation)); }
        }
        @keyframes gift-shake-lux {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-14px) rotate(-4deg); }
          20% { transform: translateX(14px) rotate(4deg); }
          30% { transform: translateX(-12px) rotate(-3.5deg); }
          40% { transform: translateX(12px) rotate(3.5deg); }
          50% { transform: translateX(-10px) rotate(-2.5deg); }
          60% { transform: translateX(10px) rotate(2.5deg); }
          70% { transform: translateX(-7px) rotate(-1.5deg); }
          80% { transform: translateX(7px) rotate(1.5deg); }
          90% { transform: translateX(-3px) rotate(-0.5deg); }
        }
        @keyframes gift-float-lux {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.01); }
        }
        @keyframes ribbon-shimmer-v {
          0% { background-position: 100% -100%; }
          50% { background-position: 100% 250%; }
          100% { background-position: 100% -100%; }
        }
        @keyframes ribbon-shimmer-h {
          0% { background-position: -100% 100%; }
          50% { background-position: 250% 100%; }
          100% { background-position: -100% 100%; }
        }
        @keyframes jewel-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        @keyframes screen-flash {
          0% { opacity: 0; }
          20% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 0; }
        }
        @keyframes spotlight-breathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.65; }
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
        @keyframes golden-pulse {
          0% { transform: scale(0.1); opacity: 0.9; }
          60% { opacity: 0.5; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Confetti active={confettiActive} />
      <ScreenFlash active={flashActive} />

      {/* ═══════════════════════════════════════════════════
         PHASE 1: THE GIFT — Pure cinematic experience
         No text, just the gift in its spotlight
         ═══════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center transition-all"
        style={{
          opacity: phase === "reveal" ? 0 : 1,
          pointerEvents: phase === "reveal" ? "none" : "auto",
          transition: "opacity 1.5s ease-out",
          background: "#000000",
        }}
      >
        {/* Warm spotlight from above — like a luxury product shot */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 45% at 50% 40%,
                rgba(45,30,12,0.5) 0%,
                rgba(25,15,5,0.25) 35%,
                rgba(10,5,2,0.1) 55%,
                transparent 70%)
            `,
            animation: "spotlight-breathe 7s ease-in-out infinite",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 3s ease-out",
          }}
        />

        {/* Vignette — cinematic framing */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)" }}
        />

        {/* Film grain — subtle cinematic texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating gold dust — ambient magic */}
        <GoldDust count={phase === "open" || phase === "burst" ? 90 : 50} boost={phase === "glow" || phase === "open"} />

        {/* Golden burst pulse — expanding golden light masks the box disappearance */}
        {(phase === "burst" || phase === "reveal") && (
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div
              style={{
                width: "200vmax",
                height: "200vmax",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,250,220,0.6), rgba(255,215,0,0.2) 25%, transparent 50%)",
                animation: "golden-pulse 2s ease-out forwards",
              }}
            />
          </div>
        )}

        {/* The Gift — centered, floating, majestic */}
        <div
          style={{
            animation: phase === "intro" || phase === "glow" ? "gift-float-lux 4.5s ease-in-out infinite" : "none",
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
            transition: "opacity 2.5s ease-out, transform 2.5s ease-out",
          }}
        >
          <GiftBox phase={giftPhase} />
        </div>

        {/* Skip button — barely visible, doesn't distract */}
        <button
          onClick={skipAnimation}
          className="absolute bottom-5 text-white/[0.06] hover:text-white/20 text-[9px] tracking-[0.5em] uppercase transition-colors duration-700"
        >
          Pular
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════
         PHASE 2: Birthday Content Reveal
         ═══════════════════════════════════════════════════ */}
      <div
        className="min-h-[100svh] flex flex-col overflow-hidden transition-all"
        style={{
          background: showContent ? "#fef9f4" : "#000000",
          transitionDuration: "2s",
        }}
      >
        <div
          className="h-1 bg-gradient-to-r from-coral via-pistachio to-golden transition-opacity duration-1000"
          style={{ opacity: showContent ? 1 : 0 }}
        />

        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 sm:py-10 relative">
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

        <div
          className="h-1 bg-gradient-to-r from-pistachio via-coral to-golden transition-opacity duration-1000"
          style={{ opacity: showContent ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
