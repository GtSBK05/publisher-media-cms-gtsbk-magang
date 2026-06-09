import { PrismaClient }
from "@prisma/client";

const prisma =
  new PrismaClient();

async function main() {
  const blocks = [
    {
      key: "MAIN_HERO",
      title:
        "Welcome To Community Archive",

      content:
        "Customize this section from CMS.",

      position: 1,
    },

    {
      key: "FEATURED_SECTION",
      title:
        "Featured Content",

      content:
        "Highlight important content.",

      position: 2,
    },

    {
      key: "SIDEBAR_CARD_1",
      title:
        "Announcements",

      content:
        "Latest announcements.",

      position: 3,
    },

    {
      key: "SIDEBAR_CARD_2",
      title:
        "Community",

      content:
        "Community updates.",

      position: 4,
    },

    {
      key: "SIDEBAR_CARD_3",
      title:
        "Useful Links",

      content:
        "Useful links section.",

      position: 5,
    },
  ];

  for (
    const block
    of blocks
  ) {
    await prisma.wikiBlock.upsert({
      where: {
        key: block.key,
      },

      update: {},

      create: block,
    });
  }
}

main();