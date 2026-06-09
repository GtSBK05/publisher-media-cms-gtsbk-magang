"use client";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

interface Props {
  article: any;
  floating?: boolean;
}

export default function WikiInfoBox({
  article,
  floating = false,
}: Props) {
  const {
    lightMode,
  } = useTheme();

  if (!floating) {
    return null;
  }

  return (
    <div
      className="
        group
        relative
      "
    >
      <div
        className={`
          w-[15px]
          h-[15px]

          rounded-2xl

          flex
          items-center
          justify-center

          cursor-pointer

          text-lg

          transition-all

          ${
            lightMode
              ? `
                bg-white
                border
                border-black/10

                shadow-md
              `
              : `
                bg-white/[0.04]
                border
                border-white/10

                shadow-lg
                shadow-black/30
              `
          }
        `}
      >
        ⓘ
      </div>

      <div
        className={`
          absolute

          top-0
          right-[65px]

          w-[260px]

          opacity-0
          invisible

          translate-x-2

          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-x-0

          transition-all
          duration-200

          rounded-3xl

          p-5

          backdrop-blur-2xl

          z-50

          ${
            lightMode
              ? `
                bg-white

                border
                border-black/10

                shadow-xl
              `
              : `
                bg-[#1b1d24]

                border
                border-white/10

                shadow-xl
                shadow-black/40
              `
          }
        `}
      >
        <h3
          className={`
            text-lg
            mb-4

            ${
              lightMode
                ? "text-black"
                : "text-white"
            }
          `}
        >
          Article Information
        </h3>

        <div
          className="
            space-y-4
            text-sm
          "
        >
          <div>
            <p
              className="
                opacity-50
                mb-1
              "
            >
              Category
            </p>

            <p>
              {
                article.category
                  ?.name ??
                "Uncategorized"
              }
            </p>
          </div>

          <div>
            <p
              className="
                opacity-50
                mb-1
              "
            >
              Author
            </p>

            <p>
              {
                article.author
                  ?.name ??
                "Unknown"
              }
            </p>
          </div>

          <div>
            <p
              className="
                opacity-50
                mb-1
              "
            >
              Views
            </p>

            <p>
              {article.views ?? 0}
            </p>
          </div>

          <div>
            <p
              className="
                opacity-50
                mb-1
              "
            >
              Updated
            </p>

            <p>
              {new Date(
                article.updatedAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}