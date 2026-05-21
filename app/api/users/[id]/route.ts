import { prisma } from "@/lib/prisma";

import jwt from "jsonwebtoken";

export async function PATCH(
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