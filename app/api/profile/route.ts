import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

function getUserId(
  req: Request
) {
  try {
    const auth =
      req.headers.get(
        "authorization"
      );

    if (!auth) {
      return null;
    }

    const token =
      auth.replace(
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

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        id: string;
      };

    return decoded.id;

  } catch {
    return null;
  }
}

export async function GET(
  req: Request
) {
  try {
    const userId =
      getUserId(req);

    if (!userId) {
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

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },

        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          role: true,
        },
      });

    if (!user) {
      return Response.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      user
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: Request
) {
  try {
    const userId =
      getUserId(req);

    if (!userId) {
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

    const body =
      await req.json();

    const user =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          name: body.name,
          avatar:
            body.avatar,
        },
      });

    return Response.json(
      user
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