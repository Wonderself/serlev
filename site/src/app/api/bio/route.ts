import { NextRequest, NextResponse } from "next/server";
import { getBio, setBio, BioSection } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getBio());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const bio = getBio();
  const newSection: BioSection = {
    id: Date.now().toString(),
    title: body.title || "",
    content: body.content || "",
    image: body.image || "",
    order: bio.length,
  };
  bio.push(newSection);
  setBio(bio);
  return NextResponse.json(newSection, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (Array.isArray(body)) {
    setBio(body);
    return NextResponse.json(body);
  }
  const bio = getBio();
  const index = bio.findIndex((b) => b.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  bio[index] = { ...bio[index], ...body };
  setBio(bio);
  return NextResponse.json(bio[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  const bio = getBio().filter((b) => b.id !== id);
  setBio(bio);
  return NextResponse.json({ success: true });
}
