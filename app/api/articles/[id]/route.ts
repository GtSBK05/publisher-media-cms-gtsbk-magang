import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { logActivity } from "@/lib/logger";
import { calculateHealthScore } from "@/lib/healthScore";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const params = await context.params;

    const id = params.id;

    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token =
      authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const article =
      await prisma.article.findUnique({
        where: {
          id,
        },
      });

    if (!article) {
      return Response.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    if (
      article.authorId !== decoded.id
    ) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const healthScore =
      calculateHealthScore({
        title: body.title,
        content: body.content,

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
          title: body.title,
          content: body.content,

          seoTitle:
            body.seoTitle,

          seoDescription:
            body.seoDescription,

          seoKeywords:
            body.seoKeywords,

          healthScore,
        },
      });

    await logActivity(
      decoded.id,
      "UPDATE_ARTICLE",
      updated.id
    );

    return Response.json(updated);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const params = await context.params;

    const id = params.id;

    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token =
      authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const article =
      await prisma.article.findUnique({
        where: {
          id,
        },
      });

    if (!article) {
      return Response.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    if (
      article.authorId !== decoded.id
    ) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
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
      message: "Deleted",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}