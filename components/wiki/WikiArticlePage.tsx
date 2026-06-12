"use client";

import Link from "next/link";

import { useTheme }
from "@/components/providers/ThemeProvider";

export default function WikiArticlePage({
  article,
}: any) {
  const {
    lightMode,
  } = useTheme();

  return (
    <div
      className="
        space-y-8
      "
    >
      <div>
        <div
          className="
            inline-flex
            items-center

            px-4
            h-9

            rounded-full

            bg-violet-500/10
            text-violet-400

            text-xs

            mb-5
          "
        >
          {article.category?.name ||
            "Uncategorized"}
        </div>

        <h1
          className={`
            text-5xl
            font-light
            leading-tight

            ${
              lightMode
                ? "text-black"
                : "text-white"
            }
          `}
        >
          {article.title}
        </h1>

        <div
          className={`
            flex
            items-center
            gap-3

            mt-5

            text-sm

            ${
              lightMode
                ? "text-black/50"
                : "text-white/40"
            }
          `}
        >
          <span>
            {article.author?.name}
          </span>

          <span>•</span>

          <span>
            {new Date(
              article.lastContentUpdate
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div
        className={`
          pt-8
          border-t

          ${
            lightMode
              ? "border-black/10"
              : "border-white/10"
          }
        `}
      >
        <article
          className={`
            prose
            max-w-none

            ${
              lightMode
                ? `
                  prose-headings:text-black
                  prose-p:text-black/80
                  prose-strong:text-black
                  prose-em:text-black
                  prose-li:text-black/80
                  prose-blockquote:text-black/80
                  prose-blockquote:border-violet-500
                  prose-code:text-black
                  prose-pre:bg-black/5
                  prose-th:text-black
                  prose-td:text-black/80
                `
                : `
                  prose-invert

                  prose-headings:text-white
                  prose-p:text-white/80
                  prose-strong:text-white
                  prose-em:text-white
                  prose-li:text-white/80
                  prose-blockquote:text-white/80
                  prose-blockquote:border-violet-400
                  prose-code:text-white
                  prose-pre:bg-white/5
                  prose-th:text-white
                  prose-td:text-white/80
                `
            }

            [&_img]:rounded-2xl
            [&_img]:my-8
            [&_img]:h-auto
            [&_img]:max-w-full

            [&_table]:w-full
            [&_table]:border-collapse

            [&_th]:border
            [&_td]:border

            [&_th]:px-4
            [&_td]:px-4

            [&_th]:py-2
            [&_td]:py-2

            ${
              lightMode
                ? `
                  [&_th]:border-black/10
                  [&_td]:border-black/10
                `
                : `
                  [&_th]:border-white/10
                  [&_td]:border-white/10
                `
            }
          `}
          dangerouslySetInnerHTML={{
            __html:
              article.content,
          }}
        />
      </div>
    </div>
  );
}