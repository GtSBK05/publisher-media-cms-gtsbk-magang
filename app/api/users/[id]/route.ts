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

export async function PATCH(
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

    const params =
      await context.params;

    const id =
      params.id;

    const body =
      await req.json();

    const updated =
      await prisma.user.update({
        where: {
          id,
        },

        data: {
          name: body.name,
          email: body.email,
          role: body.role,
          isActive:
            body.isActive,
        },

        include: {
          _count: {
            select: {
              articles: true,
            },
          },
        },
      });

    return Response.json(
      updated
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}