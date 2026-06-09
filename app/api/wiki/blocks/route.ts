import { prisma }
from "@/lib/prisma";

export async function GET() {
  const blocks =
    await prisma.wikiBlock.findMany({
      orderBy: {
        position:
          "asc",
      },
    });

  return Response.json(
    blocks
  );
}