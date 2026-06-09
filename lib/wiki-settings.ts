import { prisma } from "@/lib/prisma";

export async function getWikiSettings() {
  let settings =
    await prisma.wikiSettings.findFirst();

  if (!settings) {
    settings =
      await prisma.wikiSettings.create({
        data: {
          heroTitle:
            "Welcome To Community Archive",

          heroSubtitle:
            "Customize this section from CMS.",

          featuredTitle:
            "Featured Content",

          featuredContent:
            "Highlight important content.",

          announcementTitle:
            "Announcements",

          announcementContent:
            "Latest announcements.",

          communityTitle:
            "Community",

          communityContent:
            "Community updates.",

          linksTitle:
            "Useful Links",

          linksContent:
            "Useful links section.",
        },
      });
  }

  return settings;
}