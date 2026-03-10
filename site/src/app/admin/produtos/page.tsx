"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProdutos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [prods, cats] = await Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]);
    setProducts(prods);
    setCategories(cats);
  }

  async function handleSave() {
    if (!editing) return;
    if (isNew) {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    }
    setEditing(null);
    setIsNew(false);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const { url } = await res.json();
    setEditing({ ...editing, image: url });
    setUploading(false);
  }

  const filtered = filter
    ? products.filter((p) => p.categoryId === filter)
    : products;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-gray-800">Produtos</h1>
        <button
          onClick={() => {
            setEditing({
              id: "",
              name: "",
              description: "",
              image: "",
              categoryId: categories[0]?.id || "",
              order: products.length,
            });
            setIsNew(true);
          }}
          className="bg-primary-dark text-cream px-4 py-2 rounded-lg text-sm hover:bg-primary transition-colors"
        >
          + Novo Produto
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("")}
          className={`px-3 py-1 rounded-full text-xs ${!filter ? "bg-primary-dark text-cream" : "bg-gray-100 text-gray-600"}`}
        >
          Todos ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1 rounded-full text-xs ${filter === cat.id ? "bg-primary-dark text-cream" : "bg-gray-100 text-gray-600"}`}
          >
            {cat.name} ({products.filter((p) => p.categoryId === cat.id).length})
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {isNew ? "Novo Produto" : "Editar Produto"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nome</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Descrição</label>
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Categoria</label>
                <select
                  value={editing.categoryId}
                  onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Imagem</label>
                {editing.image && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2">
                    <Image src={editing.image} alt="" fill className="object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.image}
                    onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                    placeholder="URL da imagem ou upload"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <label className="bg-gray-100 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                    {uploading ? "..." : "Upload"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-dark text-cream py-2 rounded-lg text-sm hover:bg-primary transition-colors"
              >
                Salvar
              </button>
              <button
                onClick={() => { setEditing(null); setIsNew(false); }}
                className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {product.image && (
              <div className="relative h-40">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {categories.find((c) => c.id === product.categoryId)?.name || product.categoryId}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setEditing(product); setIsNew(false); }}
                  className="text-xs text-primary-dark hover:text-primary transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
