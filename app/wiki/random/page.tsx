export const dynamic = "force-dynamic";

import { prisma }
from "@/lib/prisma";

import {
  redirect,
} from "next/navigation";

export default async function RandomPage() {
  const count =
    await prisma.article.count({
      where: {
        status:
          "PUBLISHED",
      },
    });

  const skip =
    Math.floor(
      Math.random() *
      count
    );

  const article =
    await prisma.article.findFirst({
      where: {
        status:
          "PUBLISHED",
      },

      skip,

      orderBy: {
        createdAt:
          "asc",
      },
    });

  if (!article) {
    redirect("/wiki");
  }

  redirect(
    `/wiki/${article.slug}`
  );
}