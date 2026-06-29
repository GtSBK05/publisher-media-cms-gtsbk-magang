export const dynamic = "force-dynamic";

import { prisma }
from "@/lib/prisma";

import { getSidebarCategories } 
from "@/lib/wiki";

import {
  notFound,
} from "next/navigation";

import WikiLayout
from "@/components/wiki/WikiLayout";

import WikiSidebar
from "@/components/wiki/WikiSidebar";

import WikiInfoBox
from "@/components/wiki/WikiInfoBox";

import WikiArticlePage
from "@/components/wiki/WikiArticlePage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WikiArticle(
  {
    params,
  }: Props
) {
  const {
    slug,
  } = await params;

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

  await prisma.article.update({
    where: {
      id: article.id,
    },

    data: {
      views: {
        increment: 1,
      },
    },
  });

  const [
    categories,
    settings,
  ] = await Promise.all([
    getSidebarCategories(),

    prisma.wikiSettings.findFirst(),
  ]); 

  return (
    <WikiLayout
        backgroundUrl={
          settings?.backgroundUrl
        }
      sidebar={
        <WikiSidebar 
        categories={categories}/>
      }
      rightPanel={
        <WikiInfoBox
          article={article}
          floating={true}
        />
      }
    >
    <>
      <WikiArticlePage
        article={article}
      />

      <div
        className="
          xl:hidden
          mt-8
        "
      >
        <WikiInfoBox
          article={article}
        />
      </div>
    </>
    </WikiLayout>
  );
}