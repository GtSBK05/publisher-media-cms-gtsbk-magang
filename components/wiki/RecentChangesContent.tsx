"use client";

import Link from "next/link";

import {
  useTheme,
} from "@/components/providers/ThemeProvider";

interface Props {
  grouped: Record<
    string,
    any[]
  >;
}

function getActionData(
  action: string
) {
  switch (action) {
    case "CREATE_ARTICLE":
      return {
        label:
          "created article",
        color:
          "text-orange-300",
      };

    case "UPDATE_ARTICLE":
      return {
        label:
          "updated article",
        color:
          "text-violet-300",
      };

    case "CREATE_REVISION":
      return {
        label:
          "submitted revision",
        color:
          "text-sky-300",
      };

    case "APPROVE_REVISION":
      return {
        label:
          "approved revision",
        color:
          "text-green-300",
      };

    case "DELETE_ARTICLE":
      return {
        label:
          "deleted article",
        color:
          "text-red-300",
      };

    default:
      return {
        label:
          action
            .toLowerCase()
            .replaceAll(
              "_",
              " "
            ),
        color:
          "text-white/60",
      };
  }
}

export default function RecentChangesContent({
  grouped,
}: Props) {
  const {
    lightMode,
  } = useTheme();

  return (
    <div
      className={`
        rounded-[32px]
        overflow-hidden
        border

        ${
          lightMode
            ? `
              border-black/10
              bg-black/[0.02]
            `
            : `
              border-white/10
              bg-white/[0.03]
            `
        }
      `}
    >
      {Object.entries(
        grouped
      ).map(
        ([date, items]) => (
          <div
            key={date}
            className={`
              border-b

              ${
                lightMode
                  ? "border-black/10"
                  : "border-white/10"
              }
            `}
          >
            <div
              className="
                px-8
                py-1

                bg-gradient-to-r
                from-violet-500/10
                to-orange-400/10
              "
            >
              <h2
                className="
                  text-lg
                  font-medium
                "
              >
                {date}
              </h2>
            </div>

            {items.map(
              (log) => {
                const action =
                  getActionData(
                    log.action
                  );

                return (
                  <div
                    key={log.id}
                    className={`
                      flex
                      items-center

                      gap-5

                      px-8
                      py-1

                      border-b

                      transition

                      ${
                        lightMode
                          ? `
                            border-black/5
                            hover:bg-black/[0.03]
                          `
                          : `
                            border-white/5
                            hover:bg-white/[0.02]
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        w-16

                        text-xs

                        ${
                          lightMode
                            ? "text-black/40"
                            : "text-white/40"
                        }
                      `}
                    >
                      {new Date(
                        log.createdAt
                      ).toLocaleTimeString(
                        [],
                        {
                          hour:
                            "2-digit",
                          minute:
                            "2-digit",
                        }
                      )}
                    </div>

                    <div
                      className={`
                        w-2
                        h-2

                        rounded-full

                        ${
                          lightMode
                            ? "bg-black/30"
                            : "bg-white/30"
                        }
                      `}
                    />

                    <div
                      className="
                        flex-1
                        text-sm
                      "
                    >
                      <span
                        className={
                          lightMode
                            ? "text-black"
                            : "text-white"
                        }
                      >
                        {
                          log.user
                            ?.name
                        }
                      </span>

                      {" "}

                      <span
                        className={
                          action.color
                        }
                      >
                        {
                          action.label
                        }
                      </span>

                      {" "}

                      {log.article && (
                        <Link
                          href={`/wiki/${log.article.slug}`}
                          className={
                            lightMode
                              ? `
                                text-black/80
                                hover:text-violet-600
                                transition
                              `
                              : `
                                text-white/80
                                hover:text-violet-300
                                transition
                              `
                          }
                        >
                          "
                          {
                            log.article
                              .title
                          }
                          "
                        </Link>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )
      )}
    </div>
  );
}