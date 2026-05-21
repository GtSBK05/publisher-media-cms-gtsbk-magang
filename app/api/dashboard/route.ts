import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalArticles =
      await prisma.article.count();

    const publishedArticles =
      await prisma.article.count({
        where: {
          status: "PUBLISHED",
        },
      });

    const draftArticles =
      await prisma.article.count({
        where: {
          status: "DRAFT",
        },
      });

    const totalUsers =
      await prisma.user.count();

    const articles =
      await prisma.article.findMany();

    const averageHealth =
      articles.length > 0
        ? Math.round(
            articles.reduce(
              (acc, article) =>
                acc +
                article.healthScore,
              0
            ) / articles.length
          )
        : 0;      

    const recentArticles =
      await prisma.article.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 5,

        include: {
          author: true,
          category: true,
        },
      });

    return Response.json({
      totalArticles,
      publishedArticles,
      draftArticles,
      totalUsers,
      averageHealth,
      recentArticles,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Dashboard failed" },
      { status: 500 }
    );
  }
}