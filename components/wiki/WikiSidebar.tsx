"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

interface Props {
  categories: {
    id: string;
    name: string;
    _count: {
      articles: number;
    };
  }[];
}

export default function WikiSidebar({
  categories,
}: Props) {
  const pathname =
    usePathname();

  const {
    lightMode,
  } = useTheme();

  function isActive(
    href: string
  ) {
    return pathname === href;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-10">

        <p
          className={`
            text-[11px]
            uppercase
            tracking-[0.35em]
            mb-2

            ${
              lightMode
                ? "text-orange-500"
                : "text-violet-300"
            }
          `}
        >
          Content Archive
        </p>

        <h1
          className="
            text-xl
            font-light
          "
        >
          Publisher Wiki
        </h1>
      </div>

      <div className="mb-8">
        <p
          className={`
            text-xs
            uppercase
            tracking-[0.25em]
            mb-4

            ${
              lightMode
                ? "text-black/40"
                : "text-white/40"
            }
          `}
        >
          Navigation
        </p>

        <div className="space-y-2">
          {[
            {
              href: "/wiki",
              label:
                "Main Page",
            },
            {
              href:
                "/wiki/recent",
              label:
                "Recent Changes",
            },
            {
              href:
                "/wiki/random",
              label:
                "Random Page",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center

                h-11
                px-4

                rounded-2xl

                text-sm

                border

                transition-all

                ${
                  isActive(
                    item.href
                  )
                    ? `
                      text-white

                      border-violet-500/30

                      bg-gradient-to-r
                      from-violet-500/20
                      to-orange-400/20
                    `
                    : lightMode
                    ? `
                      text-black/70

                      border-transparent

                      hover:text-black

                      hover:border-orange-400/20

                      hover:bg-gradient-to-r
                      hover:from-orange-400/15
                      hover:to-violet-500/15
                    `
                    : `
                      text-white/70

                      border-transparent

                      hover:text-white

                      hover:border-violet-500/20

                      hover:bg-gradient-to-r
                      hover:from-violet-500/20
                      hover:to-orange-400/20
                    `
                }
              `}
            >
              {item.label}
            </Link>
          ))}
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
        <p
          className={`
            text-xs
            uppercase
            tracking-[0.25em]
            mb-4

            ${
              lightMode
                ? "text-black/40"
                : "text-white/40"
            }
          `}
        >
          Categories
        </p>

        <div className="space-y-2">
          {categories
            .slice(0, 5)
            .map(
              (
                category
              ) => (
                <Link
                  key={
                    category.id
                  }
                  href={`/wiki/search?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className={`
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    rounded-2xl

                    text-sm

                    border

                    transition-all

                    ${
                      lightMode
                        ? `
                          text-black/70

                          border-transparent

                          hover:text-black

                          hover:border-orange-400/20

                          hover:bg-gradient-to-r
                          hover:from-orange-400/15
                          hover:to-violet-500/15
                        `
                        : `
                          text-white/60

                          border-transparent

                          hover:text-white

                          hover:border-violet-500/20

                          hover:bg-gradient-to-r
                          hover:from-violet-500/15
                          hover:to-orange-400/15
                        `
                    }
                  `}
                >
                  <span>
                    {
                      category.name
                    }
                  </span>

                  <span
                    className={`
                      text-xs

                      ${
                        lightMode
                          ? "text-black/40"
                          : "text-white/30"
                      }
                    `}
                  >
                    {
                      category
                        ._count
                        .articles
                    }
                  </span>
                </Link>
              )
            )}

          <Link
            href="/wiki/categories"
            className={`
              flex
              items-center

              px-4
              py-3

              rounded-2xl

              text-sm

              transition

              ${
                lightMode
                  ? `
                    text-orange-600

                    hover:text-violet-600
                  `
                  : `
                    text-violet-300

                    hover:text-orange-300
                  `
              }
            `}
          >
            View All Categories →
          </Link>
        </div>
      </div>

      <div
        className={`
          mt-8
          pt-8

          border-t

          ${
            lightMode
              ? "border-black/10"
              : "border-white/10"
          }
        `}
      >
        <p
          className={`
            text-xs
            uppercase
            tracking-[0.25em]
            mb-4

            ${
              lightMode
                ? "text-black/40"
                : "text-white/40"
            }
          `}
        >
        </p>

        <Link
          href="/wiki/"
          className={`
            flex
            items-center

            h-11
            px-4

            rounded-2xl

            text-sm

            border

            transition-all

            ${
              lightMode
                ? `
                  text-black/70

                  border-transparent

                  hover:text-black

                  hover:border-orange-400/20

                  hover:bg-gradient-to-r
                  hover:from-orange-400/15
                  hover:to-violet-500/15
                `
                : `
                  text-white/70

                  border-transparent

                  hover:text-white

                  hover:border-violet-500/20

                  hover:bg-gradient-to-r
                  hover:from-violet-500/20
                  hover:to-orange-400/20
                `
            }
          `}
        >
        </Link>
      </div>
    </div>
  );
}