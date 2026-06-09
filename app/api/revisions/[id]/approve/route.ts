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

    const article =
      await prisma.article.update({
        where: {
          id:
            revision.articleId,
        },

        data: {
          title:
            revision.title,

          content:
            revision.content,

          categoryId:
            revision.categoryId,

          version: {
            increment: 1,
          },

          status:
            "PUBLISHED",

          lastContentUpdate:
            new Date(),             
        },
      });

    await prisma.articleRevision.update({
      where: {
        id:
          revision.id,
      },

      data: {
        status:
          "APPROVED",

        approvedById:
          decoded.id,

        approvedAt:
          new Date(),
      },
    });

    await prisma.articleRevision.updateMany({
      where: {
        articleId:
          article.id,

        status:
          "PENDING",

        baseVersion:
          revision.baseVersion,
      },

      data: {
        status:
          "OUTDATED",
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
          "Approve failed",
      },
      {
        status: 500,
      }
    );
  }
}