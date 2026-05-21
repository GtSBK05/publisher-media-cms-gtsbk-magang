import { prisma } from "@/lib/prisma";

import crypto from "crypto";

import { transporter } from "@/lib/mail";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

    if (!user) {
      return Response.json(
        {
          error:
            "Email is not registered",
        },
        {
          status: 404,
        }
      );
    }

    const token =
      crypto.randomBytes(32)
        .toString("hex");

    const expiresAt =
      new Date(
        Date.now() +
          1000 * 60 * 30
      );

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const resetUrl =
      `http://localhost:3000/reset-password?token=${token}`;

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: user.email,

      subject:
        "Reset Password",

      html: `
        <div
          style="
            background:#0b0b12;
            padding:40px;
            font-family:Arial,sans-serif;
            color:white;
          "
        >
          <div
            style="
              max-width:560px;
              margin:auto;
              background:#11111a;
              border:1px solid rgba(255,255,255,0.08);
              padding:40px;
            "
          >
            <div
              style="
                width:4px;
                height:50px;
                background:#8b5cf6;
                margin-bottom:24px;
              "
            ></div>

            <h1
              style="
                font-size:32px;
                font-weight:300;
                margin:0;
                margin-bottom:12px;
              "
            >
              Reset Password
            </h1>

            <p
              style="
                color:rgba(255,255,255,0.6);
                line-height:28px;
                margin-bottom:32px;
              "
            >
              We received a request to
              reset your Publisher CMS
              password. Click the button
              below to continue.
            </p>

            <a
              href="${resetUrl}"
              style="
                display:inline-block;
                background:white;
                color:black;
                text-decoration:none;
                padding:14px 28px;
                font-size:14px;
                margin-bottom:32px;
              "
            >
              Reset Password
            </a>

            <div
              style="
                height:1px;
                background:rgba(255,255,255,0.08);
                margin-bottom:24px;
              "
            ></div>

            <p
              style="
                color:rgba(255,255,255,0.4);
                font-size:13px;
                line-height:24px;
              "
            >
              This reset link will
              expire in 30 minutes.
              If you did not request
              a password reset, you
              can safely ignore this
              email.
            </p>

            <div
              style="
                display:flex;
                justify-content:space-between;
                margin-top:32px;
              "
            >
              <div
                style="
                  width:8px;
                  height:8px;
                  background:#8b5cf6;
                "
              ></div>

              <div
                style="
                  width:8px;
                  height:8px;
                  background:#f97316;
                "
              ></div>
            </div>
          </div>
        </div>
      `,
    });

    console.log(
      "EMAIL SENT"
    );

    return Response.json({
      message:
        "Reset link sent",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Forgot password failed",
      },
      {
        status: 500,
      }
    );
  }
}