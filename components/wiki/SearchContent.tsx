"use client";

import Link from "next/link";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

interface Article {
  id: string;
  slug: string;
  title: string;

  category: {
    name: string;
  } | null;
}

interface Props {
  query?: string;

  category?: string;

  articles: Article[];
}

export default function SearchContent({
  query,
  category,
  articles,
}: Props) {
  const {
    lightMode,
  } = useTheme();

  return (
    <div>
      <div className="mb-10">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.35em]

            text-violet-300

            mb-3
          "
        >
          Content Archive Publisher
        </p>

        <h1
          className={`
            text-5xl
            font-light
            mb-4

            ${
              lightMode
                ? "text-black"
                : "text-white"
            }
          `}
        >
          Search Results
        </h1>

        <p
          className={`
            ${
              lightMode
                ? "text-black/60"
                : "text-white/60"
            }
          `}
        >
          {query && (
            <>
              Results for "
              {query}"
            </>
          )}

          {!query &&
            category && (
              <>
                Category:
                {" "}
                {category}
              </>
            )}

          {!query &&
            !category &&
            "Browse published articles"}
        </p>
      </div>

      {articles.length === 0 ? (
        <div
          className={`
            rounded-3xl
            border
            p-8

            ${
              lightMode
                ? `
                  border-black/10
                  bg-black/[0.02]
                  text-black/60
                `
                : `
                  border-white/10
                  bg-white/[0.03]
                  text-white/60
                `
            }
          `}
        >
          No articles found.
        </div>
      ) : (
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
          "
        >
          {articles.map(
            (article) => (
              <Link
                key={
                  article.id
                }
                href={`/wiki/${article.slug}`}
                className={`
                  rounded-3xl
                  border
                  p-5

                  transition

                  hover:-translate-y-1

                  ${
                    lightMode
                      ? `
                        border-black/10
                        bg-black/[0.02]

                        hover:border-violet-400/30
                      `
                      : `
                        border-white/10
                        bg-white/[0.03]

                        hover:border-violet-400/30
                      `
                  }
                `}
              >
                <h2
                  className={`
                    text-lg
                    mb-2

                    ${
                      lightMode
                        ? "text-black"
                        : "text-white"
                    }
                  `}
                >
                  {
                    article.title
                  }
                </h2>

                <p
                  className={`
                    text-sm

                    ${
                      lightMode
                        ? "text-black/50"
                        : "text-white/50"
                    }
                  `}
                >
                  {
                    article
                      .category
                      ?.name ||
                    "Uncategorized"
                  }
                </p>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}