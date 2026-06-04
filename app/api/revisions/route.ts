import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: Request
) {
  try {
    const authHeader =
      req.headers.get(
        "authorization"
      );

    const decoded =
      verifyToken(authHeader);

    const { searchParams } =
      new URL(req.url);

    const articleId =
      searchParams.get(
        "articleId"
      );

    const status =
    searchParams.get(
        "status"
    );

    const revisions =
    await prisma.articleRevision.findMany({
        where: {
        articleId:
            articleId || "",

        ...(status
            ? { status: status as any }
            : {}),
        },

        include: {
        author: true,

        article: {
            select: {
            title: true,
            content: true,
            version: true,
            },
        },
        },

        orderBy: {
        createdAt: "desc",
        },
    });

    return Response.json(
      revisions
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      [],
      { status: 500 }
    );
  }
}