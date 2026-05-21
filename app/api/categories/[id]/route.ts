import { prisma } from "@/lib/prisma";

import jwt from "jsonwebtoken";

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const params =
      await context.params;

    const id = params.id;

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

    const category =
      await prisma.category.findUnique(
        {
          where: {
            id,
          },

          include: {
            _count: {
              select: {
                articles: true,
              },
            },
          },
        }
      );

    if (!category) {
      return Response.json(
        {
          error:
            "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      category._count
        .articles > 0
    ) {
      return Response.json(
        {
          error:
            "Category still used by articles",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.category.delete(
      {
        where: {
          id,
        },
      }
    );

    return Response.json({
      message:
        "Category deleted",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Delete category failed",
      },
      {
        status: 500,
      }
    );
  }
}