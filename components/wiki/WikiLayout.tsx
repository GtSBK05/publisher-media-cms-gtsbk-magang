"use client";

import {
  ReactNode,
  useState,
} from "react";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

import WikiHeader from "./WikiHeader";

interface WikiLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  rightPanel?: ReactNode;
}

export default function WikiLayout({
  children,
  sidebar,
  rightPanel,
}: WikiLayoutProps) {
  const [
    mobileSidebar,
    setMobileSidebar,
  ] = useState(false);

  const {
    lightMode,
  } = useTheme();

  return (
    <main
      className={`
        min-h-screen
        relative
        overflow-hidden

        transition-colors
        duration-300

        ${
          lightMode
            ? `
              bg-[#f5f6f8]
              text-black
            `
            : `
              bg-[#111318]
              text-white
            `
        }
      `}
    >
      <div
        className="
          absolute
          inset-0

          bg-cover
          bg-center
          bg-fixed

          opacity-20
        "
        style={{
          backgroundImage:
            "url('/wiki-background.jpg')",
        }}
      />

      <div
        className={`
          absolute
          inset-0

          bg-gradient-to-br

          ${
            lightMode
              ? `
                from-orange-100/80
                via-white/90
                to-violet-100/80
              `
              : `
                from-violet-950/70
                via-[#111318]/90
                to-orange-950/60
              `
          }
        `}
      />

      <div
        className={`
          absolute
          top-[-200px]
          right-[-100px]

          w-[500px]
          h-[500px]

          rounded-full

          blur-3xl

          ${
            lightMode
              ? `
                bg-orange-400/20
              `
              : `
                bg-violet-500/20
              `
          }
        `}
      />

      <div
        className={`
          absolute
          bottom-[-250px]
          left-[-150px]

          w-[600px]
          h-[600px]

          rounded-full

          blur-3xl

          ${
            lightMode
              ? `
                bg-violet-500/15
              `
              : `
                bg-orange-400/15
              `
          }
        `}
      />

      {mobileSidebar && (
        <>
          <div
            onClick={() =>
              setMobileSidebar(
                false
              )
            }
            className="
              fixed
              inset-0

              bg-black/70

              z-[90]
            "
          />

          <aside
            className={`
              fixed

              top-0
              left-0

              h-screen
              w-[280px]

              z-[100]

              p-6

              overflow-y-auto

              backdrop-blur-2xl

              ${
                lightMode
                  ? `
                    bg-white
                    text-black

                    border-r
                    border-black/10
                  `
                  : `
                    bg-[#111318]
                    text-white

                    border-r
                    border-white/10
                  `
              }
            `}
          >
            <div
              className="
                flex
                justify-between
                items-center

                mb-6
              "
            >
              <h2
                className="
                  text-lg
                  font-medium
                "
              >
                Menu
              </h2>

              <button
                onClick={() =>
                  setMobileSidebar(
                    false
                  )
                }
                className="
                  text-lg
                "
              >
                ✕
              </button>
            </div>

            {sidebar}
          </aside>
        </>
      )}

      <div
        className="
          relative
          z-10

          min-h-screen

          grid
          xl:grid-cols-[260px_minmax(0,1fr)_65px]
        "
      >
        <aside
          className={`
            hidden
            xl:flex

            flex-col

            backdrop-blur-2xl

            p-6

            ${
              lightMode
                ? `
                  bg-white/40

                  border-r
                  border-black/10
                `
                : `
                  bg-black/25

                  border-r
                  border-white/10
                `
            }
          `}
        >
          {sidebar}
        </aside>

        <section
          className="
            min-w-0

            flex
            flex-col

            min-h-screen
          "
        >
          <WikiHeader />

          <div
            className="
              xl:hidden

              px-4
              pt-4
            "
          >
            <button
              onClick={() =>
                setMobileSidebar(
                  true
                )
              }
              className={`
                h-11

                px-4

                rounded-2xl

                border

                transition

                ${
                  lightMode
                    ? `
                      bg-white

                      border-black/10

                      hover:border-orange-400/30
                    `
                    : `
                      bg-white/[0.04]

                      border-white/10

                      hover:border-violet-500/30
                    `
                }
              `}
            >
              ☰ Navigation
            </button>
          </div>

          <div
            className="
              flex-1

              p-4
              md:p-6
              xl:p-8
            "
          >
            <div
              className={`
                rounded-[32px]

                backdrop-blur-2xl

                shadow-2xl

                p-4
                md:p-6
                xl:p-8

                transition-colors
                duration-300

                ${
                  lightMode
                    ? `
                      border
                      border-black/10

                      bg-white/50

                      shadow-black/10
                    `
                    : `
                      border
                      border-white/10

                      bg-black/20

                      shadow-black/40
                    `
                }
              `}
            >
              {children}
            </div>
          </div>
        </section>

        {rightPanel && (
          <aside
            className={`
              hidden
              xl:block

              p-6

              backdrop-blur-2xl

              ${
                lightMode
                  ? `
                    bg-white/30

                    border-l
                    border-black/10
                  `
                  : `
                    bg-black/20

                    border-l
                    border-white/10
                  `
              }
            `}
          >
            <div
              className="
                sticky
                top-24
              "
            >
              {rightPanel}
            </div>
          </aside>
        )}        
      </div>
    </main>
  );
}