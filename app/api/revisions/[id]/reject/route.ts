import { prisma } from "@/lib/prisma";
import {
  verifyToken,
  requireRole,
} from "@/lib/auth";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const authHeader =
      req.headers.get(
        "authorization"
      );

    const decoded =
      verifyToken(authHeader);

    requireRole(
      decoded.role,
      ["EDITOR", "ADMIN"]
    );

    const params =
      await context.params;

    const revision =
    await prisma.articleRevision.findUnique({
        where: {
        id: params.id,
        },
    });

    if (!revision) {
    return Response.json(
        {
        error:
            "Revision not found",
        },
        {
        status: 404,
        }
    );
    }

    if (
    revision.status !==
    "PENDING"
    ) {
    return Response.json(
        {
        error:
            "Revision already processed",
        },
        {
        status: 400,
        }
    );
    }

    await prisma.articleRevision.update({
    where: {
        id: params.id,
    },

    data: {
        status:
        "REJECTED",

        approvedById:
        decoded.id,

        approvedAt:
        new Date(),
    },
    });

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Reject failed",
      },
      {
        status: 500,
      }
    );
  }
}