import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const articles =
      await prisma.article.findMany({
        where: {
          status: "DRAFT",

          scheduledAt: {
            lte: now,
          },
        },
      });

    for (const article of articles) {
      await prisma.article.update({
        where: {
          id: article.id,
        },

        data: {
          status: "PUBLISHED",
          publishedAt: now,

          lastContentUpdate:
            new Date(),           
        },
      });
    }

    return Response.json({
      success: true,
      publishedCount:
        articles.length,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Cron failed" },
      { status: 500 }
    );
  }
}