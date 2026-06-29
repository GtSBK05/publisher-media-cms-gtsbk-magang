export const dynamic = "force-dynamic";

import { prisma }
from "@/lib/prisma";

import WikiHomepageEditor
from "@/components/wiki/WikiHomepageEditor";

import BackgroundEditor
from "@/components/wiki/BackgroundEditor";

import FeaturedArticlesManager
from "@/components/wiki/FeaturedArticlesManager";

export default async function WikiSettingsPage() {
  const settings =
    await prisma.wikiSettings.findFirst();

  const blocks =
    await prisma.wikiBlock.findMany({
      orderBy: {
        position: "asc",
      },
    });

  const hero =
    blocks.find(
      (x) =>
        x.key ===
        "MAIN_HERO"
    );

  const featured =
    blocks.find(
      (x) =>
        x.key ===
        "FEATURED_SECTION"
    );

  const card1 =
    blocks.find(
      (x) =>
        x.key ===
        "SIDEBAR_CARD_1"
    );

  const card2 =
    blocks.find(
      (x) =>
        x.key ===
        "SIDEBAR_CARD_2"
    );

  const card3 =
    blocks.find(
      (x) =>
        x.key ===
        "SIDEBAR_CARD_3"
    );

  return (
    <>
      <div
        className="
          mb-10
          flex
          flex-col
          gap-6
        "
      >
        <button
          className="
            px-5
            h-11
            w-fit
            rounded-xl
            bg-violet-500
            text-white
          "
        >
          Save Changes
        </button>

        <div
          className="
            w-full
            flex
            justify-center
          "
        >
          <div
            className="
              w-full
              max-w-3xl
            "
          >
            <BackgroundEditor
              currentBackground={
                settings?.backgroundUrl
              }
            />
          </div>
        </div>
      </div>

      <WikiHomepageEditor
        hero={hero}
        featured={featured}
        card1={card1}
        card2={card2}
        card3={card3}
      />

      <FeaturedArticlesManager
        article1Id={
          settings?.featuredArticle1Id
        }
        article2Id={
          settings?.featuredArticle2Id
        }
        article3Id={
          settings?.featuredArticle3Id
        }
      />
    </>
  );
}