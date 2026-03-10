"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  subtitle: string;
  order: number;
}

export default function AdminCategorias() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch("/api/categories").then((r) => r.json());
    setCategories(data.sort((a: Category, b: Category) => a.order - b.order));
  }

  async function handleSave() {
    if (!editing) return;
    if (isNew) {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch("/api/categories", {
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
    if (!confirm("Tem certeza? Os produtos desta categoria não serão excluídos.")) return;
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-gray-800">Categorias</h1>
        <button
          onClick={() => {
            setEditing({ id: "", name: "", subtitle: "", order: categories.length });
            setIsNew(true);
          }}
          className="bg-primary-dark text-cream px-4 py-2 rounded-lg text-sm hover:bg-primary transition-colors"
        >
          + Nova Categoria
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {isNew ? "Nova Categoria" : "Editar Categoria"}
            </h2>
            <div className="space-y-4">
              {isNew && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ID (slug)</label>
                  <input
                    type="text"
                    value={editing.id}
                    onChange={(e) => setEditing({ ...editing, id: e.target.value.toLowerCase().replace(/\s/g, "-") })}
                    placeholder="ex: doces-especiais"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              )}
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
                <label className="block text-sm text-gray-600 mb-1">Subtítulo</label>
                <input
                  type="text"
                  value={editing.subtitle}
                  onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ordem</label>
                <input
                  type="number"
                  value={editing.order}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={handleSave} className="flex-1 bg-primary-dark text-cream py-2 rounded-lg text-sm">
                Salvar
              </button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.subtitle}</p>
              <span className="text-xs text-gray-400">ID: {cat.id} | Ordem: {cat.order}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditing(cat); setIsNew(false); }}
                className="text-xs text-primary-dark hover:text-primary px-3 py-1 border rounded-lg"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-xs text-red-500 hover:text-red-700 px-3 py-1 border border-red-200 rounded-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
