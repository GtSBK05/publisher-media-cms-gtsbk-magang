import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles =
      await prisma.article.findMany({
        include: {
          category: true,
        },
      });

    const users =
      await prisma.user.findMany({
        include: {
          _count: {
            select: {
              articles: true,
            },
          },
        },

        orderBy: {
          articles: {
            _count: "desc",
          },
        },

        take: 5,
      });

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

    const published =
      articles.filter(
        (article) =>
          article.status ===
          "PUBLISHED"
      ).length;

    const publishRatio =
      articles.length > 0
        ? Math.round(
            (
              published /
              articles.length
            ) * 100
          )
        : 0;

    const categoryMap:
      Record<
        string,
        number
      > = {};

    articles.forEach(
      (article) => {
        const category =
          article.category
            ?.name ||
          "Uncategorized";

        categoryMap[
          category
        ] =
          (categoryMap[
            category
          ] || 0) + 1;
      }
    );

    const categoryData =
      Object.entries(
        categoryMap
      ).map(
        ([name, count]) => ({
          name,
          count,
        })
      );

    const topCategory =
      categoryData.sort(
        (a, b) =>
          b.count - a.count
      )[0]?.name ||
      "None";

    const trendMap:
      Record<
        string,
        number
      > = {};

    articles.forEach(
      (article) => {
        const date =
          new Date(
            article.createdAt
          ).toLocaleDateString();

        trendMap[date] =
          (trendMap[date] ||
            0) + 1;
      }
    );

    const trendData =
      Object.entries(
        trendMap
      ).map(
        ([date, articles]) => ({
          date,
          articles,
        })
      );

    const activeWriters =
      await prisma.user.count({
        where: {
          role: "WRITER",
          isActive: true,
        },
      });

    return Response.json({
      averageHealth,
      publishRatio,
      topCategory,
      activeWriters,
      trendData,
      categoryData,
      topWriters: users,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch analytics",
      },
      {
        status: 500,
      }
    );
  }
}