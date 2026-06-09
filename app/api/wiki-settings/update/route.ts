import { prisma }
from "@/lib/prisma";

import {
  NextResponse,
} from "next/server";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const {
    id,
    title,
    content,
  } = body;

  await prisma.wikiBlock.update({
    where: {
      id,
    },

    data: {
      title,
      content,
    },
  });

  return NextResponse.json({
    success: true,
  });
}