"use client";

import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";

interface Props {
  articles: any[];
  categories: string[];
}

export default function NewsPageClient({
  articles,
  categories,
}: Props) {
  const {
    lightMode,
    toggleTheme,
  } = useTheme();

  const featuredArticle =
    articles[0];

  const archiveArticles =
    articles.slice(1);

  return (
    <main
      className={`
        min-h-screen
        overflow-hidden
        transition-colors
        duration-300
        ${
          lightMode
            ? `
              bg-[#f3f4f6]
              text-black
            `
            : `
              bg-[#0b0d12]
              text-white
            `
        }
      `}
    >
      <div
        className={`
          sticky
          top-0
          z-50
          backdrop-blur-xl
          border-b
          transition-colors
          duration-300
          ${
            lightMode
              ? `
                bg-white/80
                border-black/5
              `
              : `
                bg-[#10141b]/80
                border-white/5
              `
          }
        `}
      >
        <div
          className="
            max-w-[1800px]
            mx-auto
            h-14
            px-6
            flex
            items-center
            justify-between
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
                w-8
                h-8
                rounded-md
                bg-gradient-to-br
                from-violet-500
                to-orange-400
                flex
                items-center
                justify-center
                text-xs
                text-white
              "
            >
              P
            </div>

            <div>
              <h1
                className="
                  text-sm
                  tracking-wide
                "
              >
                Publisher Media
              </h1>

              <p
                className={`
                  text-[10px]
                  ${
                    lightMode
                      ? `
                        text-black/35
                      `
                      : `
                        text-white/35
                      `
                  }
                `}
              >
                Codex Archive
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <button
              onClick={toggleTheme}
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                transition
                border
                hover:scale-105
                ${
                  lightMode
                    ? `
                      bg-violet-500/10
                      border-violet-500/20
                    `
                    : `
                      bg-orange-400/10
                      border-orange-400/20
                    `
                }
              `}
            >
              {lightMode ? (
                <span
                  className="
                    text-violet-400
                    text-lg
                  "
                >
                  ☾
                </span>
              ) : (
                <span
                  className="
                    text-orange-400
                    text-lg
                  "
                >
                  ☀
                </span>
              )}
            </button>

            <Link
              href="/login"
              className={`
                text-xs
                transition
                hover:text-violet-400
                ${
                  lightMode
                    ? `
                      text-black/50
                    `
                    : `
                      text-white/40
                    `
                }
              `}
            >
              CMS Login
            </Link>
          </div>
        </div>
      </div>

      <div
        className="
          max-w-[1800px]
          mx-auto
          px-6
          py-6
        "
      >
        <div
          className="
            grid
            grid-cols-12
            gap-6
          "
        >
          <aside
            className="
              hidden
              xl:block
              col-span-2
            "
          >
            <div
              className="
                sticky
                top-20
                space-y-6
              "
            >
              <div
                className={`
                  border
                  p-5
                  transition-colors
                  duration-300
                  ${
                    lightMode
                      ? `
                        bg-white
                        border-black/5
                      `
                      : `
                        bg-[#121720]
                        border-white/5
                      `
                  }
                `}
              >
                <p
                  className={`
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    mb-5
                    ${
                      lightMode
                        ? `
                          text-black/35
                        `
                        : `
                          text-white/30
                        `
                    }
                  `}
                >
                  Categories
                </p>

                <div className="space-y-1">
                  {categories.map(
                    (category) => (
                      <button
                        key={
                          category
                        }
                        className={`
                          w-full
                          text-left
                          px-3
                          py-2
                          text-sm
                          transition
                          hover:text-violet-400
                          ${
                            lightMode
                              ? `
                                text-black/55
                                hover:bg-black/[0.03]
                              `
                              : `
                                text-white/45
                                hover:bg-white/[0.03]
                              `
                          }
                        `}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div
                className={`
                  border
                  p-5
                  transition-colors
                  duration-300
                  ${
                    lightMode
                      ? `
                        bg-white
                        border-black/5
                      `
                      : `
                        bg-[#121720]
                        border-white/5
                      `
                  }
                `}
              >
                <p
                  className={`
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    mb-5
                    ${
                      lightMode
                        ? `
                          text-black/35
                        `
                        : `
                          text-white/30
                        `
                    }
                  `}
                >
                  System Status
                </p>

                <div className="space-y-4">
                  <div
                    className="
                      flex
                      justify-between
                      text-sm
                    "
                  >
                    <span
                      className={
                        lightMode
                          ? `
                            text-black/55
                          `
                          : `
                            text-white/45
                          `
                      }
                    >
                      Entries
                    </span>

                    <span>
                      {articles.length}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      text-sm
                    "
                  >
                    <span
                      className={
                        lightMode
                          ? `
                            text-black/55
                          `
                          : `
                            text-white/45
                          `
                      }
                    >
                      Categories
                    </span>

                    <span>
                      {
                        categories.length
                      }
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      text-sm
                    "
                  >
                    <span
                      className={
                        lightMode
                          ? `
                            text-black/55
                          `
                          : `
                            text-white/45
                          `
                      }
                    >
                      Status
                    </span>

                    <span
                      className="
                        text-green-400
                      "
                    >
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section
            className="
              col-span-12
              xl:col-span-7
            "
          >
            {featuredArticle && (
              <Link
                href={`/news/${featuredArticle.slug}`}
                className="
                  block
                  group
                  mb-6
                "
              >
                <div
                  className={`
                    relative
                    overflow-hidden
                    border
                    p-8
                    min-h-[420px]
                    flex
                    flex-col
                    justify-between
                    transition-all
                    duration-300
                    hover:border-violet-500/30
                    ${
                      lightMode
                        ? `
                          bg-white
                          border-black/5
                        `
                        : `
                          bg-[#121720]
                          border-white/5
                        `
                    }
                  `}
                >
                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-[350px]
                      h-[350px]
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
                      className={`
                        flex
                        items-center
                        gap-3
                        text-[11px]
                        mb-6
                        ${
                          lightMode
                            ? `
                              text-black/35
                            `
                            : `
                              text-white/35
                            `
                        }
                      `}
                    >
                      <span
                        className="
                          text-violet-400
                        "
                      >
                        {
                          featuredArticle
                            .category
                            ?.name ||
                          "General"
                        }
                      </span>

                      <span>
                        •
                      </span>

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
                        leading-[1]
                        tracking-tight
                        max-w-4xl
                        font-light
                        transition
                        group-hover:text-violet-400
                      "
                    >
                      {
                        featuredArticle.title
                      }
                    </h2>

                    <p
                      className={`
                        mt-8
                        max-w-3xl
                        leading-9
                        ${
                          lightMode
                            ? `
                              text-black/55
                            `
                            : `
                              text-white/45
                            `
                        }
                      `}
                    >
                      {
                        featuredArticle.seoDescription ||
                        "No description available."
                      }
                    </p>
                  </div>
                </div>
              </Link>
            )}

            <div
              className="
                grid
                grid-cols-12
                gap-6
              "
            >
              <div
                className="
                  col-span-12
                  lg:col-span-4
                "
              >
                <div
                  className={`
                    border
                    p-5
                    h-full
                    transition-colors
                    duration-300
                    ${
                      lightMode
                        ? `
                          bg-white
                          border-black/5
                        `
                        : `
                          bg-[#121720]
                          border-white/5
                        `
                    }
                  `}
                >
                  <p
                    className={`
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      mb-5
                      ${
                        lightMode
                          ? `
                            text-black/35
                          `
                          : `
                            text-white/30
                          `
                      }
                    `}
                  >
                    Archive Information
                  </p>

                  <p
                    className={`
                      text-sm
                      leading-7
                      ${
                        lightMode
                          ? `
                            text-black/55
                          `
                          : `
                            text-white/45
                          `
                      }
                    `}
                  >
                    Publisher Media is a
                    structured digital
                    archive focused on
                    editorial knowledge,
                    categorized entries,
                    and organized
                    information systems.
                  </p>
                </div>
              </div>

              <div
                className="
                  col-span-12
                  lg:col-span-8
                "
              >
                <div
                  className={`
                    border
                    transition-colors
                    duration-300
                    ${
                      lightMode
                        ? `
                          bg-white
                          border-black/5
                        `
                        : `
                          bg-[#121720]
                          border-white/5
                        `
                    }
                  `}
                >
                  {archiveArticles.map(
                    (
                      article,
                      index
                    ) => (
                      <Link
                        key={article.id}
                        href={`/news/${article.slug}`}
                        className={`
                          block
                          px-5
                          py-5
                          transition
                          ${
                            lightMode
                              ? `
                                hover:bg-black/[0.03]
                              `
                              : `
                                hover:bg-white/[0.03]
                              `
                          }
                          ${
                            index !==
                            archiveArticles.length -
                              1
                              ? `
                                border-b
                                ${
                                  lightMode
                                    ? `
                                      border-black/5
                                    `
                                    : `
                                      border-white/5
                                    `
                                }
                              `
                              : ""
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            gap-5
                          "
                        >
                          <div
                            className={`
                              hidden
                              md:block
                              min-w-[70px]
                              text-[10px]
                              pt-1
                              ${
                                lightMode
                                  ? `
                                    text-black/20
                                  `
                                  : `
                                    text-white/20
                                  `
                              }
                            `}
                          >
                            #
                            {String(
                              index + 1
                            ).padStart(
                              3,
                              "0"
                            )}
                          </div>

                          <div className="flex-1">
                            <div
                              className={`
                                flex
                                items-center
                                gap-3
                                text-[11px]
                                mb-3
                                ${
                                  lightMode
                                    ? `
                                      text-black/35
                                    `
                                    : `
                                      text-white/30
                                    `
                                }
                              `}
                            >
                              <span
                                className="
                                  text-violet-400
                                "
                              >
                                {
                                  article
                                    .category
                                    ?.name ||
                                  "General"
                                }
                              </span>

                              <span>
                                •
                              </span>

                              <span>
                                {
                                  article
                                    .author
                                    ?.name
                                }
                              </span>
                            </div>

                            <h3
                              className="
                                text-2xl
                                leading-tight
                                transition
                                hover:text-violet-400
                              "
                            >
                              {
                                article.title
                              }
                            </h3>

                            <p
                              className={`
                                mt-4
                                text-sm
                                leading-7
                                ${
                                  lightMode
                                    ? `
                                      text-black/50
                                    `
                                    : `
                                      text-white/40
                                    `
                                }
                              `}
                            >
                              {
                                article.seoDescription ||
                                "No description available."
                              }
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside
            className="
              hidden
              xl:block
              col-span-3
            "
          >
            <div
              className="
                sticky
                top-20
                space-y-6
              "
            >
                <div
                className={`
                  border
                  p-5
                  transition-colors
                  duration-300
                  ${
                    lightMode
                      ? `
                        bg-white
                        border-black/5
                      `
                      : `
                        bg-[#121720]
                        border-white/5
                      `
                  }
                `}
              >
                <p
                  className={`
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    mb-5
                    ${
                      lightMode
                        ? `
                          text-black/35
                        `
                        : `
                          text-white/30
                        `
                    }
                  `}
                >
                  System Overview
                </p>

                <div className="space-y-5">
                  <div>
                    <p
                      className="
                        text-3xl
                        font-light
                      "
                    >
                      {
                        articles.length
                      }
                    </p>

                    <p
                      className={`
                        text-xs
                        mt-1
                        ${
                          lightMode
                            ? `
                              text-black/35
                            `
                            : `
                              text-white/35
                            `
                        }
                      `}
                    >
                      Archived Entries
                    </p>
                  </div>

                  <div>
                    <p
                      className="
                        text-3xl
                        font-light
                      "
                    >
                      {
                        categories.length
                      }
                    </p>

                    <p
                      className={`
                        text-xs
                        mt-1
                        ${
                          lightMode
                            ? `
                              text-black/35
                            `
                            : `
                              text-white/35
                            `
                        }
                      `}
                    >
                      Indexed Categories
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`
                  border
                  p-5
                  transition-colors
                  duration-300
                  ${
                    lightMode
                      ? `
                        bg-white
                        border-black/5
                      `
                      : `
                        bg-[#121720]
                        border-white/5
                      `
                  }
                `}
              >
                <p
                  className={`
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    mb-5
                    ${
                      lightMode
                        ? `
                          text-black/35
                        `
                        : `
                          text-white/30
                        `
                    }
                  `}
                >
                  Archive Notice
                </p>

                <p
                  className={`
                    text-sm
                    leading-7
                    ${
                      lightMode
                        ? `
                          text-black/50
                        `
                        : `
                          text-white/40
                        `
                    }
                  `}
                >
                  This archive contains
                  structured editorial
                  information intended
                  for organized reading
                  and documentation
                  purposes.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}