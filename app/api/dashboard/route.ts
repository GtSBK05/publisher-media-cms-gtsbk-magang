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

    const recentActivities =
      await prisma.activityLog.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 10,

        include: {
          user: true,
          article: true,
        },
      });

    return Response.json({
      totalArticles,
      publishedArticles,
      draftArticles,
      totalUsers,
      recentActivities,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Dashboard failed" },
      { status: 500 }
    );
  }
}