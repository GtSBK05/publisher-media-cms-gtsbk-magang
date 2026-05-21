import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles =
      await prisma.article.findMany({
        include: {
          author: true,
          category: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

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