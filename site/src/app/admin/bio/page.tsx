"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BioSection {
  id: string;
  title: string;
  content: string;
  image: string;
  order: number;
}

export default function AdminBio() {
  const [sections, setSections] = useState<BioSection[]>([]);
  const [editing, setEditing] = useState<BioSection | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch("/api/bio").then((r) => r.json());
    setSections(data.sort((a: BioSection, b: BioSection) => a.order - b.order));
  }

  async function handleSave() {
    if (!editing) return;
    if (isNew) {
      await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch("/api/bio", {
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
    if (!confirm("Tem certeza que deseja excluir esta seção?")) return;
    await fetch(`/api/bio?id=${id}`, { method: "DELETE" });
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-800">Bio / Parcours</h1>
          <p className="text-sm text-gray-500">Gerencie as seções da página &quot;Minha História&quot;</p>
        </div>
        <button
          onClick={() => {
            setEditing({ id: "", title: "", content: "", image: "", order: sections.length });
            setIsNew(true);
          }}
          className="bg-primary-dark text-cream px-4 py-2 rounded-lg text-sm hover:bg-primary transition-colors"
        >
          + Nova Seção
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {isNew ? "Nova Seção" : "Editar Seção"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Título</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Conteúdo</label>
                <textarea
                  rows={8}
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Imagem (opcional)</label>
                {editing.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-2">
                    <Image src={editing.image} alt="" fill className="object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.image}
                    onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                    placeholder="URL da imagem"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <label className="bg-gray-100 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-200">
                    {uploading ? "..." : "Upload"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  </label>
                </div>
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

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex">
              {section.image && (
                <div className="relative w-48 flex-shrink-0">
                  <Image src={section.image} alt={section.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Seção {section.order + 1}</span>
                    <h3 className="font-medium text-gray-800">{section.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-3">{section.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => { setEditing(section); setIsNew(false); }}
                      className="text-xs text-primary-dark hover:text-primary px-3 py-1 border rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="text-xs text-red-500 hover:text-red-700 px-3 py-1 border border-red-200 rounded-lg"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
