import { prisma } from "@/lib/prisma";

import jwt from "jsonwebtoken";

export async function GET(
  req: Request
) {
  try {
    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {
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

    const token =
      authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const categories =
      await prisma.category.findMany(
        {
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
        }
      );

    return Response.json(
      categories
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch categories",
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
    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {
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

    const token =
      authHeader.split(" ")[1];

    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    if (
      decoded.role !==
      "ADMIN"
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
      await prisma.category.findFirst(
        {
          where: {
            name: body.name,
          },
        }
      );

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
      await prisma.category.create(
        {
          data: {
            name: body.name,
          },
        }
      );

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