"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/v1", label: "Início" },
    { href: "/cardapio", label: "Cardápio" },
    { href: "/bio", label: "Minha História" },
    { href: "/sobre", label: "Sobre" },
    { href: "/eventos", label: "Eventos" },
    { href: "/contato", label: "Contato" },
  ];

  const isV2 = pathname === "/v2";
  const isV3 = pathname === "/v3";

  const headerBg = isV2
    ? "bg-black/20 backdrop-blur-md border-b border-white/10"
    : isV3
      ? "bg-pistachio-light/80 backdrop-blur-md border-b border-pistachio/20"
      : "bg-white/80 backdrop-blur-md border-b border-primary-light/20";

  const textColor = isV2 ? "text-white" : isV3 ? "text-pistachio-deep" : "text-primary-dark";
  const linkColor = isV2
    ? "text-white/80 hover:text-white"
    : isV3
      ? "text-pistachio-deep/70 hover:text-pistachio-deep"
      : "text-foreground/60 hover:text-primary-dark";
  const hamburgerColor = isV2 ? "bg-white" : isV3 ? "bg-pistachio-deep" : "bg-primary-dark";

  const mobileBg = isV2
    ? "bg-black/80 backdrop-blur-md border-t border-white/10"
    : isV3
      ? "bg-pistachio-light border-t border-pistachio/20"
      : "bg-white border-t border-primary-light/20";
  const mobileBorder = isV2 ? "border-white/10" : isV3 ? "border-pistachio/10" : "border-primary-light/15";

  return (
    <header className={`${headerBg} sticky top-0 z-50`}>
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - cursive style like the photo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className={`font-logo text-3xl ${textColor}`}>
            Leve
          </span>
          <span className={`text-[10px] tracking-[0.5em] uppercase ${textColor} opacity-50 -mt-1 ml-0.5`} style={{ fontWeight: 100 }}>
            Mente
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.1em] uppercase ${linkColor} transition-colors font-medium`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span className={`w-5 h-0.5 ${hamburgerColor} transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 ${hamburgerColor} transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 ${hamburgerColor} transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden ${mobileBg} px-4 pb-4`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-3 text-sm tracking-wide ${linkColor} border-b ${mobileBorder} last:border-0 transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
