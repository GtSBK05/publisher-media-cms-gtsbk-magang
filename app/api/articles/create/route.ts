import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { logActivity } from "@/lib/logger";

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

    const article =
      await prisma.article.create({
        data: {
          title: body.title,
          content: body.content,

          slug: slugify(body.title, {
            lower: true,
            strict: true,
          }),

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