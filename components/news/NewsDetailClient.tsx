"use client";

import Link from "next/link";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

export default function NewsDetailClient({
  article,
}: any) {
  const {
    lightMode,
  } = useTheme();

  return (
    <main
      className={`
        min-h-screen
        transition-colors
        duration-300
        ${
          lightMode
            ? `
              bg-[#f3f4f6]
              text-black
            `
            : `
              bg-[#0a0a10]
              text-white
            `
        }
      `}
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
          className={`
            px-5
            h-11
            inline-flex
            items-center
            border
            backdrop-blur-xl
            text-sm
            transition
            hover:border-violet-500/30
            ${
              lightMode
                ? `
                  border-black/10
                  bg-white/70
                `
                : `
                  border-white/10
                  bg-black/30
                `
            }
          `}
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
              text-violet-400
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
            className={`
              mt-10
              text-xl
              leading-9
              max-w-3xl
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
              "Editorial article from Publisher Media platform."
            }
          </p>

          <div
            className={`
              flex
              items-center
              justify-between
              mt-14
              pt-8
              border-t
              ${
                lightMode
                  ? `
                    border-black/10
                  `
                  : `
                    border-white/10
                  `
              }
            `}
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
                  text-white
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
                  className={`
                    text-xs
                    mt-1
                    ${
                      lightMode
                        ? `
                          text-black/40
                        `
                        : `
                          text-white/40
                        `
                    }
                  `}
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
                className={`
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  ${
                    lightMode
                      ? `
                        text-black/30
                      `
                      : `
                        text-white/30
                      `
                  }
                `}
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
          className={`
            prose
            max-w-none
            leading-9

            [&_strong]:font-bold
            [&_strong]:text-inherit

            [&_em]:italic
            [&_em]:text-inherit

            [&_h1]:text-4xl
            [&_h1]:font-bold
            [&_h1]:text-inherit

            [&_h2]:text-3xl
            [&_h2]:font-semibold
            [&_h2]:text-inherit

            [&_h3]:text-2xl
            [&_h3]:font-semibold
            [&_h3]:text-inherit

            [&_blockquote]:border-l-4
            [&_blockquote]:border-violet-500
            [&_blockquote]:pl-4

            [&_blockquote]:text-inherit

            [&_blockquote_p]:text-inherit
            [&_blockquote_h1]:text-inherit
            [&_blockquote_h2]:text-inherit
            [&_blockquote_h3]:text-inherit

            [&_blockquote_strong]:font-bold
            [&_blockquote_strong]:text-inherit

            [&_blockquote_em]:italic
            [&_blockquote_em]:text-inherit

            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_ol]:list-decimal
            [&_ol]:pl-6

            [&_a]:text-sky-400
            [&_a]:underline
            [&_a]:underline-offset-4
            [&_a]:cursor-pointer
            [&_a]:hover:text-sky-300            

            [&_img]:w-full
            [&_img]:my-8

            ${
            lightMode
              ? `
                  prose-neutral
                  text-black

                  prose-headings:text-black
                  prose-strong:text-black
                  prose-em:text-black
                  prose-li:text-black
                  prose-p:text-black
                  prose-blockquote:text-black
                `
              : `
                  prose-invert
                  text-white

                  prose-headings:text-white
                  prose-strong:text-white
                  prose-em:text-white
                  prose-li:text-white
                  prose-p:text-white
                  prose-blockquote:text-white
                `
            }
          `}
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />
      </div>
    </main>
  );
}