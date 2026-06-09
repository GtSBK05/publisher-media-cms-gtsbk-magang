"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

export default function WikiHeader() {
  const router =
    useRouter();

  const {
    lightMode,
    toggleTheme,
  } = useTheme();

  const [query, setQuery] =
    useState("");

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      return;
    }

    try {
      const payload =
        JSON.parse(
          atob(
            token.split(".")[1]
          )
        );

      setUser(payload);

    } catch {
      setUser(null);
    }
  }, []);

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    router.push(
      `/wiki/search?q=${encodeURIComponent(
        query
      )}`
    );
  }

  return (
    <header
      className={`
        sticky
        top-0
        z-50

        border-b

        backdrop-blur-2xl

        ${
          lightMode
            ? `
              bg-white/80
              border-black/10
              text-black
            `
            : `
              bg-black/40
              border-white/10
              text-white
            `
        }
      `}
    >
      <div
        className="
          px-4
          md:px-6

          h-16

          flex
          items-center
          justify-between

          gap-3
          md:gap-5
        "
      >
        <Link
          href="/wiki"
          className="
            flex
            items-center
            gap-3

            shrink-0
          "
        >
          <div
            className="
              w-10
              h-10

              rounded-xl

              bg-gradient-to-br
              from-violet-500
              to-orange-400

              flex
              items-center
              justify-center

              text-white
              font-semibold
            "
          >
            W
          </div>

          <div className="hidden sm:block">
            <p
              className={`
                text-[10px]
                uppercase

                tracking-[0.35em]

                ${
                  lightMode
                    ? "text-orange-500"
                    : "text-violet-300"
                }
              `}
            >
              Community Archive
            </p>

            <h1
              className="
                text-sm
                font-medium
              "
            >
              Publisher Wiki
            </h1>
          </div>
        </Link>

        <form
          onSubmit={
            handleSearch
          }
          className="
            hidden
            md:block

            flex-1
            max-w-3xl
          "
        >
          <div
            className={`
              h-11

              rounded-2xl

              border

              flex
              items-center

              px-4

              transition

              ${
                lightMode
                  ? `
                    bg-white
                    border-black/10
                  `
                  : `
                    bg-white/[0.04]
                    border-white/10
                  `
              }
            `}
          >
            <span
              className="
                mr-3
                opacity-50
              "
            >
              ⌕
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Search articles, categories, topics..."
              className="
                flex-1

                bg-transparent

                outline-none

                text-sm
              "
            />
          </div>
        </form>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <button
            onClick={
              toggleTheme
            }
            className="
              h-11
              w-11

              rounded-2xl

              border

              border-violet-500/20

              bg-gradient-to-r
              from-violet-500/10
              to-orange-400/10

              hover:from-violet-500/20
              hover:to-orange-400/20

              transition

              flex
              items-center
              justify-center
            "
          >
            {lightMode
              ? "☀"
              : "☾"}
          </button>

          {user ? (
            <Link
              href="/dashboard"
              className="
                flex
                items-center
                gap-3

                pl-2
                pr-4

                h-11

                rounded-2xl

                border
                border-white/10

                bg-white/[0.04]

                hover:border-violet-500/30

                transition
              "
            >
              <div
                className="
                  w-8
                  h-8

                  rounded-full

                  bg-gradient-to-br
                  from-violet-500
                  to-orange-400

                  flex
                  items-center
                  justify-center

                  text-xs
                  text-white
                  font-medium
                "
              >
                {user.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "U"}
              </div>

              <span
                className="
                  hidden
                  md:block

                  text-sm
                "
              >
                Dashboard
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="
                flex
                items-center
                gap-3

                pl-2
                pr-4

                h-11

                rounded-2xl

                bg-gradient-to-r
                from-violet-500
                to-orange-400

                shadow-lg
                shadow-violet-500/20
              "
            >
              <div
                className="
                  w-8
                  h-8

                  rounded-full

                  bg-white/20

                  flex
                  items-center
                  justify-center
                "
              >
                👤
              </div>

              <span
                className="
                  hidden
                  md:block

                  text-sm
                "
              >
                Login
              </span>
            </Link>
          )}
        </div>
      </div>

      <div
        className="
          md:hidden

          px-4
          pb-4
        "
      >
        <form
          onSubmit={
            handleSearch
          }
        >
          <div
            className={`
              h-11

              rounded-2xl

              border

              flex
              items-center

              px-4

              ${
                lightMode
                  ? `
                    bg-white
                    border-black/10
                  `
                  : `
                    bg-white/[0.04]
                    border-white/10
                  `
              }
            `}
          >
            <span
              className="
                mr-3
                opacity-50
              "
            >
              ⌕
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Search wiki..."
              className="
                flex-1

                bg-transparent

                outline-none

                text-sm
              "
            />
          </div>
        </form>
      </div>
    </header>
  );
}