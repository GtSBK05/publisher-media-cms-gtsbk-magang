import { prisma } from "@/lib/prisma";

import NewsPageClient from "@/components/news/NewsPageClient";

export default async function NewsPage() {
  const articles =
    await prisma.article.findMany({
      where: {
        status:
          "PUBLISHED",
      },

      include: {
        author: true,
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

  const categories: string[] =
    Array.from(
      new Set(
        articles
          .map(
            (article) =>
              article.category?.name
          )
          .filter(
            (
              name
            ): name is string =>
              name !== undefined
          )
      )
    );

  return (
    <NewsPageClient
      articles={articles}
      categories={categories}
    />
  );
}