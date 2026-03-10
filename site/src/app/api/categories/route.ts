import { NextRequest, NextResponse } from "next/server";
import { getCategories, setCategories, Category } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getCategories());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const categories = getCategories();
  const newCategory: Category = {
    id: body.id || Date.now().toString(),
    name: body.name || "",
    subtitle: body.subtitle || "",
    order: categories.length,
  };
  categories.push(newCategory);
  setCategories(categories);
  return NextResponse.json(newCategory, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  categories[index] = { ...categories[index], ...body };
  setCategories(categories);
  return NextResponse.json(categories[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  const categories = getCategories().filter((c) => c.id !== id);
  setCategories(categories);
  return NextResponse.json({ success: true });
}
