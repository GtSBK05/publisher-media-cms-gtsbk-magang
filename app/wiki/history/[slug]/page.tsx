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

import WikiHistoryPage
from "@/components/wiki/WikiHistoryPage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function HistoryPage({
  params,
}: Props) {
  const {
    slug,
  } = await params;

  const article =
    await prisma.article.findFirst({
      where: {
        slug,
      },

      include: {
        author: true,
        category: true,
      },
    });

  if (!article) {
    notFound();
  }

  const revisions =
    await prisma.articleRevision.findMany({
      where: {
        articleId:
          article.id,
      },

      include: {
        author: true,
        approvedBy: true,
      },

      orderBy: {
        createdAt:
          "desc",
      },
    });

  const categories =
    await getSidebarCategories();    

  return (
    <WikiLayout
      sidebar={
        <WikiSidebar 
        categories={categories}/>
      }
      rightPanel={
        <WikiInfoBox
          article={article}
        />
      }
    >
      <WikiHistoryPage
        article={article}
        revisions={
          revisions
        }
      />
    </WikiLayout>
  );
}