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

export async function DELETE(
  req: Request,
  context: any
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

    const params =
      await context.params;

    const id =
      params.id;

    const category =
      await prisma.category.findUnique({
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
      });

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

    await prisma.category.delete({
      where: {
        id,
      },
    });

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