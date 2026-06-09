import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const settings =
    await prisma.wikiSettings.findFirst();

  if (!settings) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 404,
      }
    );
  }

  await prisma.wikiSettings.update({
    where: {
      id: settings.id,
    },

    data: {
      backgroundUrl:
        body.backgroundUrl,
    },
  });

  return NextResponse.json({
    success: true,
  });
}