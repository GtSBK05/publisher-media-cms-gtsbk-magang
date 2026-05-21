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

    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    const users =
      await prisma.user.findMany(
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

    return Response.json(users);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}