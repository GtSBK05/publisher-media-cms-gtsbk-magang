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

    const logs =
      await prisma.activityLog.findMany(
        {
          include: {
            user: true,
            article: true,
          },

          orderBy: {
            createdAt:
              "desc",
          },
        }
      );

    return Response.json(logs);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch logs",
      },
      {
        status: 500,
      }
    );
  }
}