"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Painel", icon: "📊" },
  { href: "/admin/produtos", label: "Produtos", icon: "🍪" },
  { href: "/admin/categorias", label: "Categorias", icon: "📂" },
  { href: "/admin/bio", label: "Bio / Parcours", icon: "📝" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-primary-dark text-cream px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-light italic">Leve</span>
          <span className="text-xs tracking-[0.2em] uppercase">Mente</span>
          <span className="text-cream/50 mx-2">|</span>
          <span className="text-sm text-cream/70">Painel Admin</span>
        </div>
        <Link href="/" className="text-xs text-cream/50 hover:text-cream transition-colors">
          ← Voltar ao site
        </Link>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-52px)]">
          <nav className="p-4 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-primary-dark/10 text-primary-dark font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
