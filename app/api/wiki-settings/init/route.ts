import { prisma }
from "@/lib/prisma";

import {
  verifyToken,
  requireRole,
} from "@/lib/auth";

import {
  NextResponse,
} from "next/server";

export async function GET(
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