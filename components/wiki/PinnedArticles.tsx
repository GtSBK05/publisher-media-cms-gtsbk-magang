"use client";

import Link from "next/link";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

interface Props {
  articles: any[];
}

export default function PinnedArticles({
  articles,
}: Props) {

  const {
    lightMode,
  } = useTheme();

  if (
    articles.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="
        mt-8

        grid
        grid-cols-1
        md:grid-cols-3

        gap-4
      "
    >
      {articles.map(
        (article) => (
          <Link
            key={article.id}
            href={`/wiki/${article.slug}`}
            className={`
              group

              rounded-3xl

              border

              ${
                lightMode
                  ? `
                    border-black/10
                    bg-black/[0.03]
                  `
                  : `
                    border-white/10
                    bg-white/[0.03]
                  `
              }

              backdrop-blur-xl

              p-5

              hover:border-violet-500/30
              hover:-translate-y-1

              transition-all
            `}
          >
            <p
              className={`
                text-xs
                uppercase

                tracking-[0.2em]

                ${
                  lightMode
                    ? "text-violet-600"
                    : "text-violet-300"
                }

                mb-3
              `}
            >
              {article.category?.name ||
                "Uncategorized"}
            </p>

            <h3
              className={`
                text-lg

                ${
                  lightMode
                    ? "text-black"
                    : "text-white"
                }

                line-clamp-2

                mb-3
              `}
            >
              {article.title}
            </h3>

            <p
              className={`
                text-sm

                ${
                  lightMode
                    ? "text-black/70"
                    : "text-white/60"
                }

                line-clamp-3

                mb-4
              `}
            >
              {article.seoDescription ||
                "No summary available."}
            </p>

            <div
              className={`
                text-sm

                ${
                  lightMode
                    ? `
                      text-orange-600
                      group-hover:text-violet-600
                    `
                    : `
                      text-orange-300
                      group-hover:text-violet-300
                    `
                }

                transition
              `}
            >
              Read Article →
            </div>
          </Link>
        )
      )}
    </div>
  );
}