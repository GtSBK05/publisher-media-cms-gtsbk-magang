import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

import { logActivity }
from "@/lib/logger";

import { calculateHealthScore }
from "@/lib/healthScore";

function verifyToken(
  req: Request
) {
  try {
    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {
      return null;
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      return null;
    }

    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as any;

  } catch {
    return null;
  }
}

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const decoded =
      verifyToken(req);

    if (!decoded) {
      return Response.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const params =
      await context.params;

    const id =
      params.id;

    const article =
      await prisma.article.findUnique({
        where: {
          id,
        },
      });

    if (!article) {
      return Response.json(
        {
          error:
            "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    const body =
      await req.json();

    if (
      decoded.role ===
      "WRITER"
    ) {
      const revision =
        await prisma.articleRevision.create({
          data: {
            articleId:
              article.id,

            authorId:
              decoded.id,

            title:
              body.title,

            content:
              body.content,

            categoryId:
              body.categoryId,

            baseVersion:
              article.version,
          },
        });

      await logActivity(
        decoded.id,
        "CREATE_REVISION",
        article.id
      );

      return Response.json({
        message:
          "Revision submitted",

        revision,
      });
    }

    const healthScore =
      calculateHealthScore({
        title:
          body.title,

        content:
          body.content,

        seoTitle:
          body.seoTitle,

        seoDescription:
          body.seoDescription,

        seoKeywords:
          body.seoKeywords,
      });

    const updated =
      await prisma.article.update({
        where: {
          id,
        },

        data: {
          title:
            body.title,

          content:
            body.content,

          seoTitle:
            body.seoTitle,

          seoDescription:
            body.seoDescription,

          seoKeywords:
            body.seoKeywords,

          categoryId:
            body.categoryId ||
            null,

          healthScore,
          
          lastContentUpdate:
            new Date(),          
        },
      });

    await logActivity(
      decoded.id,
      "UPDATE_ARTICLE",
      updated.id
    );

    return Response.json(
      updated
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const decoded =
      verifyToken(req);

    if (!decoded) {
      return Response.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const params =
      await context.params;

    const id =
      params.id;

    const article =
      await prisma.article.findUnique({
        where: {
          id,
        },
      });

    if (!article) {
      return Response.json(
        {
          error:
            "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      article.authorId !==
        decoded.id &&
      decoded.role !==
        "ADMIN" &&
      decoded.role !==
        "EDITOR"
    ) {
      return Response.json(
        {
          error:
            "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    await logActivity(
      decoded.id,
      "DELETE_ARTICLE",
      article.id
    );

    await prisma.article.delete({
      where: {
        id,
      },
    });

    return Response.json({
      message:
        "Deleted",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}