import { prisma }
from "@/lib/prisma";

import Sidebar
from "@/components/layout/Sidebar";

import UserDropdown
from "@/components/layout/UserDropdown";

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
    <main
      className="
        min-h-screen
        bg-[#111318]
        text-white
        flex
      "
    >
      <Sidebar />

      <section
        className="
          flex-1
          overflow-y-auto
        "
      >
        <div
          className="
            border-b
            border-white/10

            px-8
            py-5

            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-violet-300
              "
            >
              Wiki Settings
            </p>

            <h1
              className="
                text-xl
              "
            >
              Homepage Editor
            </h1>
          </div>

          <UserDropdown />
        </div>

        <div
          className="
            p-8
          "
        >
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
        </div>
      </section>
    </main>
  );
}