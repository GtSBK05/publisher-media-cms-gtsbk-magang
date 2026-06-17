import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings =
      await prisma.wikiSettings.findFirst();

    return NextResponse.json({
      featuredArticle1Id:
        settings?.featuredArticle1Id || "",

      featuredArticle2Id:
        settings?.featuredArticle2Id || "",

      featuredArticle3Id:
        settings?.featuredArticle3Id || "",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch featured articles",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const settings =
      await prisma.wikiSettings.findFirst();

    if (!settings) {
      return NextResponse.json(
        {
          error:
            "Wiki settings not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.wikiSettings.update({
      where: {
        id: settings.id,
      },

      data: {
        featuredArticle1Id:
          body.featuredArticle1Id || null,

        featuredArticle2Id:
          body.featuredArticle2Id || null,

        featuredArticle3Id:
          body.featuredArticle3Id || null,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to save featured articles",
      },
      {
        status: 500,
      }
    );
  }
}