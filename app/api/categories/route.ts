import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

function verifyToken(
  req: Request
) {
  try {
    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {
      return null;
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      return null;
    }

    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as any;

  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const categories =
      await prisma.category.findMany({
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
      });

    return Response.json(categories);

  } catch {
    return Response.json(
      {
        error: "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    const decoded =
      verifyToken(req);

    if (!decoded) {
      return Response.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      decoded.role !==
      "ADMIN" &&
      decoded.role !==
      "EDITOR"
    ) {
      return Response.json(
        {
          error:
            "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await req.json();

    if (!body.name) {
      return Response.json(
        {
          error:
            "Name required",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.category.findFirst({
        where: {
          name: body.name,
        },
      });

    if (existing) {
      return Response.json(
        {
          error:
            "Category already exists",
        },
        {
          status: 400,
        }
      );
    }

    const category =
      await prisma.category.create({
        data: {
          name: body.name,
        },
      });

    return Response.json(
      category
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Create category failed",
      },
      {
        status: 500,
      }
    );
  }
}