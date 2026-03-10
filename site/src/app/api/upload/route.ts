import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Arquivo obrigatório" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json([]);
  }
  const files = fs.readdirSync(uploadDir).map((f) => `/uploads/${f}`);
  return NextResponse.json(files);
}
