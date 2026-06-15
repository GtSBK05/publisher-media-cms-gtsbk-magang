import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      articles,
      users,
      categories,
    ] = await Promise.all([
      prisma.article.findMany({
        include: {
          category: true,
        },
      }),

      prisma.user.findMany({
        include: {
          _count: {
            select: {
              articles: true,
            },
          },
        },
      }),

      prisma.category.findMany(),
    ]);

    const totalArticles =
      articles.length;

    const totalViews =
      articles.reduce(
        (acc, article) =>
          acc + article.views,
        0
      );

    const totalCategories =
      categories.length;

    const activeContributors =
      users.filter(
        (user) =>
          user.isActive
      ).length;

    const categoryCountMap:
      Record<string, number> = {};

    const categoryViewsMap:
      Record<string, number> = {};

    articles.forEach(
      (article) => {
        const category =
          article.category?.name ||
          "Uncategorized";

        categoryCountMap[
          category
        ] =
          (
            categoryCountMap[
              category
            ] || 0
          ) + 1;

        categoryViewsMap[
          category
        ] =
          (
            categoryViewsMap[
              category
            ] || 0
          ) + article.views;
      }
    );

    const categoryDistribution =
      Object.entries(
        categoryCountMap
      ).map(
        ([name, count]) => ({
          name,
          count,
        })
      );

    const viewsByCategory =
      Object.entries(
        categoryViewsMap
      ).map(
        ([name, views]) => ({
          name,
          views,
        })
      );

    const statusDistribution = [
      {
        name: "Published",
        value:
          articles.filter(
            (article) =>
              article.status ===
              "PUBLISHED"
          ).length,
      },

      {
        name: "Draft",
        value:
          articles.filter(
            (article) =>
              article.status ===
              "DRAFT"
          ).length,
      },
    ];

    const roleDistribution = [
      {
        name: "Admin",
        value:
          users.filter(
            (user) =>
              user.role ===
              "ADMIN"
          ).length,
      },

      {
        name: "Editor",
        value:
          users.filter(
            (user) =>
              user.role ===
              "EDITOR"
          ).length,
      },

      {
        name: "Writer",
        value:
          users.filter(
            (user) =>
              user.role ===
              "WRITER"
          ).length,
      },
    ];

    const topContributors =
      users
        .sort(
          (a, b) =>
            b._count.articles -
            a._count.articles
        )
        .slice(0, 5)
        .map((user) => ({
          id: user.id,
          name: user.name,
          role: user.role,
          articles:
            user._count.articles,
        }));

    const mostViewedArticles =
      [...articles]
        .sort(
          (a, b) =>
            b.views -
            a.views
        )
        .slice(0, 5)
        .map((article) => ({
          id: article.id,
          title:
            article.title,
          views:
            article.views,
        }));

    const viewDistribution = [
      {
        range: "0-100",
        count:
          articles.filter(
            (article) =>
              article.views <=
              100
          ).length,
      },

      {
        range: "101-500",
        count:
          articles.filter(
            (article) =>
              article.views >
                100 &&
              article.views <=
                500
          ).length,
      },

      {
        range: "501-1000",
        count:
          articles.filter(
            (article) =>
              article.views >
                500 &&
              article.views <=
                1000
          ).length,
      },

      {
        range: "1000+",
        count:
          articles.filter(
            (article) =>
              article.views >
              1000
          ).length,
      },
    ];

    return Response.json({
      totalArticles,
      totalViews,
      totalCategories,
      activeContributors,

      categoryDistribution,
      viewsByCategory,

      statusDistribution,
      roleDistribution,

      topContributors,
      mostViewedArticles,

      knowledgeCoverage:
        categoryDistribution,

      viewDistribution,
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