import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const existing =
    await prisma.wikiSettings.findFirst();

  if (!existing) {
    await prisma.wikiSettings.create({
      data: {},
    });
  }

  return NextResponse.json({
    success: true,
  });
}