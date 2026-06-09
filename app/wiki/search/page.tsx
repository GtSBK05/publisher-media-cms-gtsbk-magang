import { prisma }
from "@/lib/prisma";

import {
  getSidebarCategories,
} from "@/lib/wiki";

import {
  scoreArticles,
} from "@/lib/wiki-search";

import WikiLayout
from "@/components/wiki/WikiLayout";

import WikiSidebar
from "@/components/wiki/WikiSidebar";

import {
  notFound,
} from "next/navigation";

import WikiInfoBox
from "@/components/wiki/WikiInfoBox";

import SearchContent
from "@/components/wiki/SearchContent";

interface Props {
  searchParams: Promise<{
    q?: string;

    slug: string;
    category?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const {
    q,
    category,
  } = await searchParams;

  const {
    slug,
  } = await searchParams;  

  const [
    articles,
    sidebarCategories,
    settings,
  ] = await Promise.all([
    prisma.article.findMany({
      where: {
        status:
          "PUBLISHED",

        ...(q
          ? {
              OR: [
                {
                  title: {
                    contains:
                      q,
                    mode:
                      "insensitive",
                  },
                },
                {
                  content: {
                    contains:
                      q,
                    mode:
                      "insensitive",
                  },
                },
              ],
            }
          : {}),

        ...(category
          ? {
              category: {
                name:
                  category,
              },
            }
          : {}),
      },

      include: {
        category: true,
      },

      orderBy: {
        updatedAt:
          "desc",
      },
    }),

    getSidebarCategories(),

    prisma.wikiSettings.findFirst(),
  ]);

  const rankedArticles =
    q
      ? scoreArticles(
          articles,
          q
        )
      : articles;  

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
          categories={
            sidebarCategories
          }
        />
      }
      rightPanel={
        <WikiInfoBox
          article={article}
        />
      }      
    >
      <SearchContent
        query={q}
        category={category}
        articles={rankedArticles}
      />
    </WikiLayout>
  );
}