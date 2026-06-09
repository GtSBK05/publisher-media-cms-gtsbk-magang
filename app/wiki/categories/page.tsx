import { prisma } from "@/lib/prisma";

import { getSidebarCategories }
from "@/lib/wiki";

import WikiLayout
from "@/components/wiki/WikiLayout";

import WikiSidebar
from "@/components/wiki/WikiSidebar";

import {
  notFound,
} from "next/navigation";

import WikiInfoBox
from "@/components/wiki/WikiInfoBox";

import CategoriesContent
from "@/components/wiki/CategoriesContent";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoriesPage({
  params,
}: Props) {
  const {
    slug,
  } = await params;

  const categories =
    await prisma.category.findMany({
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
    });

  const sidebarCategories =
    await getSidebarCategories();

  const grouped =
    categories.reduce(
      (acc, category) => {
        const letter =
          category.name
            .charAt(0)
            .toUpperCase();

        if (
          !acc[letter]
        ) {
          acc[letter] =
            [];
        }

        acc[letter].push(
          category
        );

        return acc;
      },
      {} as Record<
        string,
        typeof categories
      >
    );

  const letters =
    Object.keys(
      grouped
    ).sort();

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
      <div
        className="
          max-w-6xl
        "
      >
        <div
          className="
            mb-10
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]

              text-violet-300

              mb-3
            "
          >
            Community Archive
          </p>

          <h1
            className="
              text-5xl
              font-light

              mb-4
            "
          >
            Categories
          </h1>

          <p
            className="
              text-1x1
            "
          >
            Browse all categories
            available in the wiki.
          </p>
        </div>

        <CategoriesContent
          grouped={grouped}
          letters={letters}
        />
      </div>
    </WikiLayout>
  );
}