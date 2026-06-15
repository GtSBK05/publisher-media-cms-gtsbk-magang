import { prisma }
from "@/lib/prisma";

import WikiHomepageEditor 
from "@/components/wiki/WikiHomepageEditor";

import BackgroundEditor 
from "@/components/wiki/BackgroundEditor";

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
          mb-8
          flex
          flex-col
          gap-4
        "
      >
        <button
          className="
            px-5
            h-11

            w-fit

            rounded-xl

            bg-violet-500
          "
        >
          Save Changes
        </button>

        <BackgroundEditor
          currentBackground={
            settings?.backgroundUrl
          }
        />
      </div>

      <WikiHomepageEditor
        hero={hero}
        featured={featured}
        card1={card1}
        card2={card2}
        card3={card3}
      />
    </>
  );
}