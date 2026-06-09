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

import RecentChangesContent
from "@/components/wiki/RecentChangesContent";

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
        categories={categories}/>
      }
      rightPanel={
        <WikiInfoBox
          article={article}
        />
      }      
    >
      <div className="space-y-10">
        <section
          className="
            grid
            lg:grid-cols-[2fr_1fr]
            gap-6
          "
        >
          <div
            className="
              rounded-[32px]

              border
              border-violet-500/20

              bg-gradient-to-br
              from-violet-500/15
              via-white/5
              to-orange-400/15

              backdrop-blur-xl

              p-8
              lg:p-12
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]

                bg-gradient-to-r
                from-violet-400
                to-orange-400

                bg-clip-text
                text-transparent

                mb-4
              "
            >
              Community Archive
            </p>

            <h1
              className="
                text-4xl
                md:text-5xl
                xl:text-6xl

                font-light

                leading-tight

                mb-6
              "
            >
              {hero?.title}
            </h1>

            <div
              className="
                leading-8
                opacity-80
              "
              dangerouslySetInnerHTML={{
                __html:
                  hero?.content || "",
              }}
            />
          </div>

          <div className="space-y-4">
            {[card1, card2, card3].map(
              (card, index) => (
                <div
                  key={index}
                  className="
                    rounded-3xl

                    border
                    border-violet-500/10

                    bg-gradient-to-br
                    from-violet-500/5
                    to-orange-400/5

                    backdrop-blur-xl

                    p-5
                  "
                >
                  <h3
                    className={`
                      mb-3

                      ${
                        index === 1
                          ? "text-violet-400"
                          : "text-orange-400"
                      }
                    `}
                  >
                    {card?.title}
                  </h3>

                  <div
                    className="
                      text-sm
                      leading-7
                      opacity-80
                    "
                    dangerouslySetInnerHTML={{
                      __html:
                        card?.content || "",
                    }}
                  />
                </div>
              )
            )}
          </div>
        </section>

        <section
          className="
            rounded-[32px]

            border
            border-violet-500/10

            bg-gradient-to-br
            from-violet-500/5
            to-orange-400/5

            backdrop-blur-xl

            p-8
          "
        >
          <h2
            className="
              text-3xl

              mb-5
            "
          >
            {featured?.title}
          </h2>

          <div
            className="
              text-white/70

              leading-8
            "
            dangerouslySetInnerHTML={{
              __html:
                featured?.content ||
                "",
            }}
          />
        </section>

        <section>
          <h2
            className="
              text-2xl
              mb-5
            "
          >
            Recently Updated
          </h2>

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-5

              gap-4
            "
          >
            {latestArticles.map(
              (article) => (
                <a
                  key={article.id}
                  href={`/wiki/${article.slug}`}
                  className="
                    block

                    rounded-2xl

                    border
                    border-white/10

                    bg-gradient-to-br
                    from-violet-500/5
                    to-orange-400/5

                    backdrop-blur-xl

                    p-4

                    hover:border-violet-500/30
                    hover:-translate-y-1

                    transition
                  "
                >
                  <p
                    className="
                      text-base
                      line-clamp-2

                      mb-2
                    "
                  >
                    {article.title}
                  </p>

                  <p
                    className="
                      text-xs
                      opacity-60
                    "
                  >
                    {article.category?.name ||
                      "Uncategorized"}
                  </p>
                </a>
              )
            )}
          </div>
        </section>
      </div>
    </WikiLayout>
  );
}