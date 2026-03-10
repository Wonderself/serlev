"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, bio: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/bio").then((r) => r.json()),
    ]).then(([products, categories, bio]) => {
      setStats({
        products: products.length,
        categories: categories.length,
        bio: bio.length,
      });
    });
  }, []);

  const cards = [
    { label: "Produtos", value: stats.products, href: "/admin/produtos", icon: "🍪", color: "bg-amber-50 border-amber-200" },
    { label: "Categorias", value: stats.categories, href: "/admin/categorias", icon: "📂", color: "bg-blue-50 border-blue-200" },
    { label: "Seções Bio", value: stats.bio, href: "/admin/bio", icon: "📝", color: "bg-green-50 border-green-200" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-light text-gray-800 mb-6">
        Painel de Administração
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`p-6 rounded-xl border ${card.color} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-light text-gray-800 mt-1">
                  {card.value}
                </p>
              </div>
              <span className="text-3xl">{card.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Ações Rápidas</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <Link
            href="/admin/produtos"
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">➕</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Adicionar Produto</p>
              <p className="text-xs text-gray-500">Criar um novo produto no cardápio</p>
            </div>
          </Link>
          <Link
            href="/admin/bio"
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">✏️</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Editar Bio</p>
              <p className="text-xs text-gray-500">Atualizar a página de parcours</p>
            </div>
          </Link>
          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">🖼️</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Alterar Logo</p>
              <p className="text-xs text-gray-500">Fazer upload do logo da marca</p>
            </div>
          </Link>
          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">📱</span>
            <div>
              <p className="text-sm font-medium text-gray-700">WhatsApp / Contato</p>
              <p className="text-xs text-gray-500">Alterar número e informações</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
