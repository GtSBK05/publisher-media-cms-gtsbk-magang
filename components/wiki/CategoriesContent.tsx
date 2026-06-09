"use client";

import Link from "next/link";
import { useState } from "react";

import { useTheme }
from "@/components/providers/ThemeProvider";

interface Props {
  grouped: Record<
    string,
    {
      id: string;
      name: string;
      _count: {
        articles: number;
      };
    }[]
  >;

  letters: string[];
}

export default function CategoriesContent({
  grouped,
  letters,
}: Props) {
  const {
    lightMode,
  } = useTheme();

  const [
    selectedLetter,
    setSelectedLetter,
  ] = useState<
    string | null
  >(null);

  const filteredLetters =
    selectedLetter
      ? [selectedLetter]
      : letters;

  return (
    <>
      <div
        className="
          flex
          flex-wrap

          gap-3

          mb-10

          text-lg
          font-medium
        "
      >
        <button
          onClick={() =>
            setSelectedLetter(
              null
            )
          }
          className={`
            transition

            ${
              selectedLetter ===
              null
                ? "text-orange-500"
                : "text-violet-500 hover:text-orange-500"
            }
          `}
        >
          All
        </button>

        {letters.map(
          (letter) => (
            <button
              key={letter}
              onClick={() =>
                setSelectedLetter(
                  letter
                )
              }
              className={`
                transition

                ${
                  selectedLetter ===
                  letter
                    ? "text-orange-500"
                    : "text-violet-500 hover:text-orange-500"
                }
              `}
            >
              {letter}
            </button>
          )
        )}
      </div>

      <div
        className="
          grid

          lg:grid-cols-2

          gap-x-12
          gap-y-10
        "
      >
        {filteredLetters.map(
          (letter) => (
            <section
              key={letter}
            >
              <h2
                className={`
                  text-3xl

                  mb-4

                  ${
                    lightMode
                      ? "text-black"
                      : "text-white"
                  }
                `}
              >
                {letter}
              </h2>

              <div
                className={`
                  border-t

                  pt-4

                  space-y-3

                  ${
                    lightMode
                      ? "border-black/10"
                      : "border-white/10"
                  }
                `}
              >
                {grouped[
                  letter
                ].map(
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

                        py-2

                        transition

                        ${
                          lightMode
                            ? `
                              text-black/80
                              hover:text-violet-600
                            `
                            : `
                              text-white/80
                              hover:text-violet-300
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
                          text-sm

                          ${
                            lightMode
                              ? "text-black/40"
                              : "text-white/40"
                          }
                        `}
                      >
                        (
                        {
                          category
                            ._count
                            .articles
                        }
                        )
                      </span>
                    </Link>
                  )
                )}
              </div>
            </section>
          )
        )}
      </div>
    </>
  );
}