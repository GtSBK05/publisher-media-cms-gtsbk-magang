import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const resetToken =
      await prisma.passwordResetToken.findUnique({
        where: {
          token: body.token,
        },

        include: {
          user: true,
        },
      });

    if (!resetToken) {
      return Response.json(
        {
          error:
            "Invalid token",
        },
        {
          status: 400,
        }
      );
    }

    if (
      resetToken.expiresAt <
      new Date()
    ) {
      return Response.json(
        {
          error:
            "Token expired",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10
      );

    await prisma.user.update({
      where: {
        id: resetToken.user.id,
      },

      data: {
        password:
          hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return Response.json({
      message:
        "Password updated",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Reset password failed",
      },
      {
        status: 500,
      }
    );
  }
}