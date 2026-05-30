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

export async function GET(
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

    const users =
      await prisma.user.findMany({
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

    if (
      decoded.role ===
      "ADMIN"
    ) {
      return Response.json(
        users
      );
    }

    const filteredUsers =
      users.map(
        ({
          email,
          isActive,
          ...user
        }) => user
      );

    return Response.json(
      filteredUsers
    );

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