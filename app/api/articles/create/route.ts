import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { logActivity } from "@/lib/logger";
import { calculateHealthScore } from "@/lib/healthScore";

export async function POST(req: Request) {
  try {
    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token =
      authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const body = await req.json();

    const healthScore =
      calculateHealthScore({
        title: body.title,
        content: body.content,

        seoTitle:
          body.seoTitle,

        seoDescription:
          body.seoDescription,

        seoKeywords:
          body.seoKeywords,
      });

    const article =
      await prisma.article.create({
        data: {
          title: body.title,
          content: body.content,

          seoTitle:
            body.seoTitle ||
            body.title,

          seoDescription:
            body.seoDescription ||
            body.content.slice(0, 160),

          seoKeywords:
            body.seoKeywords,

          healthScore,

          slug: slugify(body.title, {
            lower: true,
            strict: true,
          }),

          scheduledAt: body.scheduledAt
            ? new Date(body.scheduledAt)
            : null,

          authorId: decoded.id,
        },
      });

    await logActivity(
      decoded.id,
      "CREATE_ARTICLE",
      article.id
    );

    return Response.json(article);

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Create article failed" },
      { status: 500 }
    );
  }
}