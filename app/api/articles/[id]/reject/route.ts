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
    const params =
      await context.params;

    const id = params.id;

    const authHeader =
      req.headers.get("authorization");

    const decoded =
      verifyToken(authHeader);

    requireRole(
      decoded.role,
      ["EDITOR", "ADMIN"]
    );

    const article =
      await prisma.article.update({
        where: {
          id,
        },

        data: {
        },
      });

    return Response.json(article);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Reject failed" },
      { status: 500 }
    );
  }
}