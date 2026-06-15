import { prisma }
from "@/lib/prisma";

import {
  verifyToken,
  requireRole,
} from "@/lib/auth";

import {
  NextResponse,
} from "next/server";

export async function POST(
  request: Request
) {
  try {
    const authHeader =
      request.headers.get(
        "authorization"
      );

    const user =
      verifyToken(
        authHeader
      );

    requireRole(
      user.role,
      [
        "ADMIN",
        "EDITOR",
      ]
    );

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

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Forbidden",
      },
      {
        status: 403,
      }
    );
  }
}