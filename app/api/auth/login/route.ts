import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            body.email,
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

    if (!user.password) {
      return Response.json(
        {
          error:
            "This account uses Google Sign-In",
        },
        {
          status: 400,
        }
      );
    }

    const validPassword =
      await bcrypt.compare(
        body.password,
        user.password
      );

    if (!validPassword) {
      return Response.json(
        {
          error:
            "Wrong password",
        },
        {
          status: 401,
        }
      );
    }

    if (!user.isActive) {
      return Response.json(
        {
          error:
            "Account deactivated",
        },
        {
          status: 403,
        }
      );
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

    return Response.json({
      token,

      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}