import { prisma } from "@/lib/prisma";

export async function getSidebarCategories() {
  return prisma.category.findMany({
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

    take: 5,
  });
}