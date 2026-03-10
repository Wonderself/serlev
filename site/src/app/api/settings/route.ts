import { NextRequest, NextResponse } from "next/server";
import { getSettings, setSettings } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const current = getSettings();
  const updated = { ...current, ...body };
  setSettings(updated);
  return NextResponse.json(updated);
}
