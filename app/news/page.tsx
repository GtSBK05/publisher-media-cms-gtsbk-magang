import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  const articles =
    await prisma.article.findMany({
      where: {
        status:
          "PUBLISHED",
      },

      include: {
        author: true,
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const featuredArticle =
    articles[0];

  const latestArticles =
    articles.slice(1);

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
          max-w-7xl
          mx-auto
          px-6
          py-16
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            mb-20
          "
        >
          <div>
            <p
              className="
                text-sm
                tracking-[0.3em]
                text-violet-400
                uppercase
                mb-4
              "
            >
              Publisher Media
            </p>

            <h1
              className="
                text-6xl
                md:text-7xl
                font-light
                leading-none
              "
            >
              Editorial
              <br />
              Platform
            </h1>
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
                text-white/30
                text-sm
                leading-7
                max-w-sm
              "
            >
              &copy;GtSBK-09.
            </p>
          </div>
        </div>

        {featuredArticle && (
          <Link
            href={`/news/${featuredArticle.slug}`}
            className="
              block
              group
              mb-16
            "
          >
            <div
              className="
                relative
                overflow-hidden
                border
                border-white/5
                bg-gradient-to-br
                from-violet-500/10
                to-orange-400/10
                p-10
                md:p-16
                hover:border-violet-500/30
                transition
              "
            >
              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-72
                  h-72
                  bg-violet-500/10
                  blur-3xl
                  rounded-full
                "
              />

              <div
                className="
                  relative
                  z-10
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-white/40
                    mb-8
                  "
                >
                  <span
                    className="
                      text-orange-300
                    "
                  >
                    Featured
                  </span>

                  <span>•</span>

                  <span>
                    {
                      featuredArticle
                        .category
                        ?.name ||
                      "Uncategorized"
                    }
                  </span>

                  <span>•</span>

                  <span>
                    {new Date(
                      featuredArticle.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <h2
                  className="
                    text-5xl
                    md:text-6xl
                    font-light
                    leading-tight
                    max-w-5xl
                    group-hover:text-violet-300
                    transition
                  "
                >
                  {
                    featuredArticle.title
                  }
                </h2>

                <p
                  className="
                    mt-8
                    text-lg
                    leading-9
                    text-white/50
                    max-w-3xl
                  "
                >
                  {
                    featuredArticle.seoDescription ||
                    "No description available."
                  }
                </p>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mt-12
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
                        w-12
                        h-12
                        rounded-full
                        bg-gradient-to-br
                        from-violet-500
                        to-orange-400
                        flex
                        items-center
                        justify-center
                        text-sm
                      "
                    >
                      {featuredArticle.author?.name?.charAt(
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
                          featuredArticle
                            .author
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
                        Editorial Author
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      text-violet-300
                      text-sm
                    "
                  >
                    Read Article →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >
          <div>
            <h2
              className="
                text-3xl
                font-light
              "
            >
              Latest Articles
            </h2>

            <p
              className="
                text-white/40
                text-sm
                mt-2
              "
            >
              Latest editorial stories
              and publishing insights
            </p>
          </div>

          <div
            className="
              text-sm
              text-white/30
            "
          >
            {articles.length} Articles
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {latestArticles.map(
            (article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="
                  group
                  border
                  border-white/5
                  bg-[#12121a]
                  p-8
                  hover:border-violet-500/20
                  hover:-translate-y-1
                  transition
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-xs
                    text-white/40
                    mb-6
                  "
                >
                  <span>
                    {
                      article
                        .category
                        ?.name ||
                      "Uncategorized"
                    }
                  </span>

                  <span>
                    {new Date(
                      article.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <h2
                  className="
                    text-2xl
                    font-light
                    leading-tight
                    group-hover:text-violet-300
                    transition
                  "
                >
                  {article.title}
                </h2>

                <p
                  className="
                    text-white/40
                    mt-6
                    leading-8
                    line-clamp-4
                  "
                >
                  {
                    article.seoDescription ||
                    "No description available."
                  }
                </p>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mt-10
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-gradient-to-br
                        from-violet-500
                        to-orange-400
                        flex
                        items-center
                        justify-center
                        text-xs
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
                        Author
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      text-violet-300
                      text-sm
                    "
                  >
                    →
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </main>
  );
}