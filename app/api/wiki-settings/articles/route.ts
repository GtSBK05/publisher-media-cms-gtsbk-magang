import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles =
      await prisma.article.findMany({
        where: {
          status: "PUBLISHED",
        },

        select: {
          id: true,
          title: true,
          seoDescription: true,
          slug: true,

          category: {
            select: {
              name: true,
            },
          },
        },

        orderBy: {
          title: "asc",
        },
      });

    return Response.json(
      articles
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to load articles",
      },
      {
        status: 500,
      }
    );
  }
}