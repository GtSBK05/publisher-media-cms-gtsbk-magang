import { prisma } from "@/lib/prisma";
import {
  verifyToken,
  requireRole,
} from "@/lib/auth";
import { logActivity } from "@/lib/logger";

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
          status: "PUBLISHED",
          publishedAt: new Date(),
          
          lastContentUpdate:
            new Date(),           
        },
      });

    await logActivity(
      decoded.id,
      "PUBLISH_ARTICLE",
      article.id
    );

    return Response.json(article);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Publish failed" },
      { status: 500 }
    );
  }
}