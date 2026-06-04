import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles =
      await prisma.article.findMany({
        include: {
          author: true,
          category: true,

          revisions: {
            where: {
              status: "PENDING",
            },

            select: {
              id: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const result =
      articles.map(
        (article) => ({
          ...article,

          pendingCount:
            article.revisions
              .length,
        })
      );

    return Response.json(
      result
    );      

    return Response.json(articles);

  } catch {
    return Response.json(
      {
        error:
          "Failed to fetch articles",
      },
      {
        status: 500,
      }
    );
  }
}