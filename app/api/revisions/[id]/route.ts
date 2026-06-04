import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: any
) {
  try {
    const params =
      await context.params;

    const revision =
      await prisma.articleRevision.findUnique({
        where: {
          id: params.id,
        },

        include: {
          author: true,
          article: true,
        },
      });

    if (!revision) {
      return Response.json(
        {
          error:
            "Revision not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      revision
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