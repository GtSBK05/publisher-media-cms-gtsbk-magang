import { prisma } from "@/lib/prisma";

export async function logActivity(
  userId: string,
  action: string,
  articleId?: string
) {
  await prisma.activityLog.create({
    data: {
      userId,
      action,
      articleId,
    },
  });
}