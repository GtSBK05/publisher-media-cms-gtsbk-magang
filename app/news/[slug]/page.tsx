import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import NewsDetailClient from "@/components/news/NewsDetailClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({
  params,
}: Props) {
  const { slug } =
    await params;

  const article =
    await prisma.article.findFirst({
      where: {
        slug,

        status:
          "PUBLISHED",
      },

      include: {
        author: true,
        category: true,
      },
    });

  if (!article) {
    notFound();
  }

  return (
    <NewsDetailClient
      article={article}
    />
  );
}