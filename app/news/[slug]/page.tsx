import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({
  params,
}: Props) {
  const { slug } =
    await params;

  const article =
    await prisma.article.findFirst({
      where: {
        slug,

        status:
          "PUBLISHED",
      },

      include: {
        author: true,
        category: true,
      },
    });

  if (!article) {
    notFound();
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#0a0a10]
        text-white
      "
    >
      <div
        className="
          fixed
          top-6
          left-6
          z-50
        "
      >
        <Link
          href="/news"
          className="
            px-5
            h-11
            inline-flex
            items-center
            border
            border-white/10
            bg-black/30
            backdrop-blur-xl
            text-sm
            hover:border-violet-500/30
            transition
          "
        >
          ← Back
        </Link>
      </div>

      <div
        className="
          relative
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            top-0
            right-0
            w-[500px]
            h-[500px]
            bg-violet-500/10
            blur-3xl
            rounded-full
          "
        />

        <div
          className="
            max-w-5xl
            mx-auto
            px-6
            pt-32
            pb-20
            relative
            z-10
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-3
              px-4
              h-10
              border
              border-violet-500/20
              bg-violet-500/10
              text-violet-300
              text-sm
              mb-10
            "
          >
            <span>
              {
                article.category
                  ?.name ||
                "Uncategorized"
              }
            </span>
          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-light
              leading-[1.1]
              tracking-tight
              max-w-5xl
            "
          >
            {article.title}
          </h1>

          <p
            className="
              mt-10
              text-xl
              text-white/40
              leading-9
              max-w-3xl
            "
          >
            {
              article.seoDescription ||
              "Editorial article from Publisher Media platform."
            }
          </p>

          <div
            className="
              flex
              items-center
              justify-between
              mt-14
              pt-8
              border-t
              border-white/10
            "
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-gradient-to-br
                  from-violet-500
                  to-orange-400
                  flex
                  items-center
                  justify-center
                  text-lg
                "
              >
                {article.author?.name?.charAt(
                  0
                )}
              </div>

              <div>
                <p
                  className="
                    text-sm
                  "
                >
                  {
                    article.author
                      ?.name
                  }
                </p>

                <p
                  className="
                    text-xs
                    text-white/40
                    mt-1
                  "
                >
                  Published on{" "}
                  {new Date(
                    article.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div
              className="
                hidden
                md:block
                text-right
              "
            >
              <p
                className="
                  text-xs
                  text-white/30
                  uppercase
                  tracking-[0.2em]
                "
              >
                Publisher Media
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          max-w-4xl
          mx-auto
          px-6
          pb-32
        "
      >
        <div
          className="
            prose
            prose-invert
            max-w-none
            text-white/80
            leading-9
          "
          dangerouslySetInnerHTML={{
            __html:
              article.content,
          }}
        />
      </div>
    </main>
  );
}