import { NextRequest, NextResponse } from "next/server";
import { getProducts, setProducts, Product } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const products = getProducts();
  const newProduct: Product = {
    id: Date.now().toString(),
    name: body.name || "",
    description: body.description || "",
    image: body.image || "",
    categoryId: body.categoryId || "",
    order: products.length,
  };
  products.push(newProduct);
  setProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const products = getProducts();
  const index = products.findIndex((p) => p.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  products[index] = { ...products[index], ...body };
  setProducts(products);
  return NextResponse.json(products[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  const products = getProducts().filter((p) => p.id !== id);
  setProducts(products);
  return NextResponse.json({ success: true });
}
