export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

import WikiLayout
from "@/components/wiki/WikiLayout";

import WikiSidebar
from "@/components/wiki/WikiSidebar";

import {
  notFound,
} from "next/navigation";

import WikiInfoBox
from "@/components/wiki/WikiInfoBox";

import WikiHomepage
from "@/components/wiki/WikiHomepage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WikiPage({
  params,
}: Props) {
  const {
    slug,
  } = await params;

  const [
    latestArticles,
    categories,
    blocks,
    settings,
  ] = await Promise.all([
    prisma.article.findMany({
      where: {
        status:
          "PUBLISHED",
      },

      include: {
        author: true,
        category: true,
      },

      orderBy: {
        lastContentUpdate:
          "desc",
      },

      take: 10,
    }),

    prisma.category.findMany({
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    }),

    prisma.wikiBlock.findMany({
      where: {
        isVisible: true,
      },

      orderBy: {
        position: "asc",
      },
    }),

    prisma.wikiSettings.findFirst(),
  ]);

  const hero =
    blocks.find(
      (block) =>
        block.key ===
        "MAIN_HERO"
    );

  const featured =
    blocks.find(
      (block) =>
        block.key ===
        "FEATURED_SECTION"
    );

  const card1 =
    blocks.find(
      (block) =>
        block.key ===
        "SIDEBAR_CARD_1"
    );

  const card2 =
    blocks.find(
      (block) =>
        block.key ===
        "SIDEBAR_CARD_2"
    );

  const card3 =
    blocks.find(
      (block) =>
        block.key ===
        "SIDEBAR_CARD_3"
    );

  const pinnedIds = [
    settings?.featuredArticle1Id,
    settings?.featuredArticle2Id,
    settings?.featuredArticle3Id,
  ].filter(Boolean) as string[];

  const featuredArticles =
    pinnedIds.length > 0
      ? await prisma.article.findMany({
          where: {
            id: {
              in: pinnedIds,
            },

            status:
              "PUBLISHED",
          },

          include: {
            category: true,
          },
        })
      : [];

  const orderedFeaturedArticles =
    pinnedIds
      .map((id) =>
        featuredArticles.find(
          (article) =>
            article.id === id
        )
      )
      .filter(Boolean);

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
    <WikiLayout
      backgroundUrl={
        settings?.backgroundUrl
      }
      sidebar={
        <WikiSidebar
          categories={categories}
        />
      }
      rightPanel={
        <WikiInfoBox
          article={article}
        />
      }
    >
      <WikiHomepage
        hero={hero}
        featured={featured}
        card1={card1}
        card2={card2}
        card3={card3}
        latestArticles={
          latestArticles
        }
        featuredArticles={
          orderedFeaturedArticles
        }
      />
    </WikiLayout>
  );
}