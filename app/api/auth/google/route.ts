import { prisma } from "@/lib/prisma";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export async function POST(
  req: Request
) {
  try {
    const { credential } =
      await req.json();

    const ticket =
      await client.verifyIdToken({
        idToken: credential,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    if (!payload?.email) {
      return Response.json(
        {
          error:
            "Invalid Google account",
        },
        {
          status: 400,
        }
      );
    }

    let user =
      await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

    if (!user) {
      user =
        await prisma.user.create({
          data: {
            name:
              payload.name ||
              "Google User",

            email:
              payload.email,

            googleId:
              payload.sub,

            avatar:
              payload.picture,

            role: "WRITER",
          },
        });
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

    const token = jwt.sign(
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
      user,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Google login failed",
      },
      {
        status: 500,
      }
    );
  }
}