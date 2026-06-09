import Link from "next/link";

import { prisma }
from "@/lib/prisma";

import { getSidebarCategories } 
from "@/lib/wiki";

import WikiLayout
from "@/components/wiki/WikiLayout";

import WikiSidebar
from "@/components/wiki/WikiSidebar";

import {
  notFound,
} from "next/navigation";

import WikiInfoBox
from "@/components/wiki/WikiInfoBox";

import RecentChangesContent
from "@/components/wiki/RecentChangesContent";

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

function groupLogs(
  logs: any[]
) {
  const grouped:
    Record<
      string,
      any[]
    > = {};

  logs.forEach(
    (log) => {
      const date =
        new Date(
          log.createdAt
        ).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );

      if (
        !grouped[date]
      ) {
        grouped[
          date
        ] = [];
      }

      grouped[
        date
      ].push(log);
    }
  );

  return grouped;
}

function getPagination(
  currentPage: number,
  totalPages: number
) {
  const pages:
    (number | string)[] = [];

  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  pages.push(1);

  const start =
    Math.max(
      2,
      currentPage - 1
    );

  const end =
    Math.min(
      totalPages - 1,
      currentPage + 1
    );

  if (start > 2) {
    pages.push("...");
  }

  for (
    let i = start;
    i <= end;
    i++
  ) {
    pages.push(i);
  }

  if (
    end <
    totalPages - 1
  ) {
    pages.push("...");
  }

  pages.push(
    totalPages
  );

  return pages;
}

interface Props {
  searchParams: Promise<{
    slug: string;
    page?: string;
    range?: string;
    date?: string;
  }>;
}

export default async function RecentChangesPage({
  searchParams,
}: Props) {
  const {
    page,
    range,
    date,
  } = await searchParams;

  const {
    slug,
  } = await searchParams;  

  const currentPage =
    Number(page || 1);

  const pageSize = 15;

  let dateFilter:
    any = undefined;

  if (
    range === "today"
  ) {
    const start =
      new Date();

    start.setHours(
      0,
      0,
      0,
      0
    );

    dateFilter = {
      gte: start,
    };
  }

  else if (
    range ===
    "yesterday"
  ) {
    const start =
      new Date();

    start.setDate(
      start.getDate() - 1
    );

    start.setHours(
      0,
      0,
      0,
      0
    );

    const end =
      new Date(start);

    end.setDate(
      end.getDate() + 1
    );

    dateFilter = {
      gte: start,
      lt: end,
    };
  }

  else if (
    range ===
    "7days"
  ) {
    const start =
      new Date();

    start.setDate(
      start.getDate() - 7
    );

    dateFilter = {
      gte: start,
    };
  }

  else if (
    range ===
    "30days"
  ) {
    const start =
      new Date();

    start.setDate(
      start.getDate() - 30
    );

    dateFilter = {
      gte: start,
    };
  }

  else if (
    range ===
      "custom" &&
    date
  ) {
    const start =
      new Date(date);

    const end =
      new Date(date);

    end.setDate(
      end.getDate() + 1
    );

    dateFilter = {
      gte: start,
      lt: end,
    };
  }

  const total =
    await prisma.activityLog.count({
        where: {
        createdAt:
            dateFilter,
        },
    });

  const logs =
    await prisma.activityLog.findMany({
        where: {
        createdAt:
            dateFilter,
        },

        include: {
        user: true,
        article: true,
        },

        orderBy: {
        createdAt:
            "desc",
        },

        skip:
        (currentPage - 1) *
        pageSize,

        take:
        pageSize,
    });

  const totalPages =
    Math.ceil(
        total / pageSize
    );

  const grouped =
    groupLogs(logs);

  const pagination =
    getPagination(
        currentPage,
        totalPages
    );

  const filterQuery =
    range
        ? `&range=${range}`
        : "";

  const dateQuery =
    date
        ? `&date=${date}`
        : "";   

  const categories =
    await getSidebarCategories();    

  const article =
    await prisma.article.findFirst({
      where: {
        slug,

        status:
          "PUBLISHED",
      },

      include: {
        author: true,
        category: true,
      },
    });

  if (!article) {
    notFound();
  }    

  return (
    <WikiLayout
      sidebar={
        <WikiSidebar 
        categories={categories}/>
      }
      rightPanel={
        <WikiInfoBox
          article={article}
        />
      }      
    >
      <div
        className="
          max-w-3xl
        "
      >
        <div
          className="
            mb-10
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]

              text-violet-300

              mb-3
            "
          >
            Community Activity
          </p>

          <h1
            className="
              text-5xl
              font-light
              mb-4
            "
          >
            Recent Changes
          </h1>

          <p
            className="
              text-white/50
            "
          >
          </p>
        </div>

        <div
        className="
            flex
            flex-wrap
            gap-2

            mt-6
            mb-8
        "
        >
        {[
            {
            label:
                "All Changes",
            value: "",
            },
            {
            label:
                "Today",
            value:
                "today",
            },
            {
            label:
                "Yesterday",
            value:
                "yesterday",
            },
            {
            label:
                "Last 7 Days",
            value:
                "7days",
            },
            {
            label:
                "Last 30 Days",
            value:
                "30days",
            },
        ].map(
            (item) => (
            <Link
                key={item.label}
                href={
                item.value
                    ? `/wiki/recent?range=${item.value}`
                    : "/wiki/recent"
                }
                className={`
                px-4
                h-10

                rounded-xl

                flex
                items-center

                transition

                ${
                    (range ||
                    "") ===
                    item.value ||
                    (!range &&
                    !item.value)
                    ? `
                        bg-gradient-to-r
                        from-violet-500
                        to-orange-400
                    `
                    : `
                        border
                        border-white/10

                        hover:border-violet-500/30
                    `
                }
                `}
            >
                {item.label}
            </Link>
            )
        )}

        <form
            className="
            flex
            gap-2
            "
        >
            <input
            type="hidden"
            name="range"
            value="custom"
            />

            <input
            type="date"
            name="date"
            defaultValue={
                date || ""
            }
            className="
                h-10
                px-3

                rounded-xl

                border
                border-white/10

                bg-white/[0.03]

                outline-none
            "
            />

            <button
            type="submit"
            className="
                h-10
                px-4

                rounded-xl

                bg-gradient-to-r
                from-violet-500
                to-orange-400
            "
            >
            Go
            </button>
        </form>
        </div>

        <RecentChangesContent
          grouped={grouped}
        />
      </div>

      <div
        className="
            flex
            justify-center
            items-center

            gap-2

            mt-8
        "
        >
        {currentPage > 1 && (
            <Link
            href={`/wiki/recent?page=${
                currentPage - 1
            }${filterQuery}${dateQuery}`}
            className="
                px-4
                h-10

                rounded-xl

                border
                border-black/10
                border-white/10

                flex
                items-center
            "
            >
            Previous
            </Link>
        )}

        {pagination.map(
        (
            item,
            index
        ) =>
            item ===
            "..." ? (
            <span
                key={index}
                className="
                px-2
                text-black/40
                text-white/40
                "
            >
                ...
            </span>
            ) : (
            <Link
                key={`${item}-${index}`}
                href={`/wiki/recent?page=${item}${filterQuery}${dateQuery}`}
                className={`
                w-10
                h-10

                rounded-xl

                flex
                items-center
                justify-center

                ${
                    item ===
                    currentPage
                    ? `
                        bg-gradient-to-r
                        from-violet-500
                        to-orange-400
                    `
                    : `
                        border
                        border-black/10
                        border-white/10

                        hover:border-violet-500/30
                    `
                }
                `}
            >
                {item}
            </Link>
            )
        )}

        {currentPage <
            totalPages && (
            <Link
            href={`/wiki/recent?page=${
                currentPage + 1
            }${filterQuery}${dateQuery}`}
            className="
                px-4
                h-10

                rounded-xl

                border
                border-black/10
                border-white/10

                flex
                items-center
            "
            >
            Next
            </Link>
        )}
      </div>
    </WikiLayout>
  );
}