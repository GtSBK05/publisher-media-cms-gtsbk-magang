"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ArticlesPage() {
  const router =
    useRouter();

  const [
    articles,
    setArticles,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [role, setRole] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [searchType,setSearchType] = 
    useState("GLOBAL");    

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [showFilters, setShowFilters] =
    useState(false);

  const [sortField, setSortField] =
    useState("createdAt");

  const [sortDirection, setSortDirection] =
    useState("desc");   

  const [
    selectedArticle,
    setSelectedArticle,
  ] = useState<any>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          window.location.href =
            "/login";

          return;
        }

        const res = await fetch(
          "/api/articles",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        const tokenPayload =
          JSON.parse(
            atob(
              token.split(".")[1]
            )
          );

        setRole(
          tokenPayload.role
        );

        setArticles(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      confirm(
        "Delete this article?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        `/api/articles/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);

        return;
      }

      setArticles((prev) =>
        prev.filter(
          (article) =>
            article.id !== id
        )
      );

      alert(
        "Article deleted"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Delete failed"
      );
    }
  }

  async function handlePublish(
    id: string
  ) {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        `/api/articles/${id}/publish`,
        {
          method: "PATCH",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);

        return;
      }

      setArticles((prev) =>
        prev.map((article) =>
          article.id === id
            ? {
                ...article,
                status:
                  "PUBLISHED",

                publishedAt:
                  new Date(),
              }
            : article
        )
      );

      alert(
        "Article published"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Publish failed"
      );
    }
  }

  const filteredArticles =
    articles
      .filter((article) => {
        const keyword =
          search.toLowerCase();

        let matchSearch = true;

        if (keyword) {
          switch (searchType) {
            case "TITLE":
              matchSearch =
                article.title
                  ?.toLowerCase()
                  .includes(
                    keyword
                  );
              break;

            case "AUTHOR":
              matchSearch =
                article.author?.name
                  ?.toLowerCase()
                  .includes(
                    keyword
                  );
              break;

            case "CATEGORY":
              matchSearch =
                article.category?.name
                  ?.toLowerCase()
                  .includes(
                    keyword
                  );
              break;

            default:
              matchSearch =
                article.title
                  ?.toLowerCase()
                  .includes(
                    keyword
                  ) ||

                article.author?.name
                  ?.toLowerCase()
                  .includes(
                    keyword
                  ) ||

                article.category?.name
                  ?.toLowerCase()
                  .includes(
                    keyword
                  );
          }
        }

        const matchStatus =
          statusFilter === "ALL"
            ? true
            : article.status ===
              statusFilter;

        const matchCategory =
          categoryFilter === "ALL"
            ? true
            : article.category?.name ===
              categoryFilter;

        return (
          matchSearch &&
          matchStatus &&
          matchCategory
        );
      })
      .sort((a, b) => {
        let result = 0;

        if (
          sortField === "title"
        ) {
          result =
            a.title.localeCompare(
              b.title
            );
        }

        if (
          sortField === "author"
        ) {
          result =
            (
              a.author?.name || ""
            ).localeCompare(
              b.author?.name || ""
            );
        }

        if (
          sortField ===
          "category"
        ) {
          result =
            (
              a.category?.name ||
              ""
            ).localeCompare(
              b.category?.name ||
              ""
            );
        }

        if (
          sortField ===
          "createdAt"
        ) {
          result =
            new Date(
              a.createdAt
            ).getTime() -
            new Date(
              b.createdAt
            ).getTime();
        }

        return sortDirection ===
          "asc"
          ? result
          : -result;
      }); 

  if (loading) {
    return null;
  }

  return (
    <DashboardLayout>
      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-light
              text-white
            "
          >
            Article Management
          </h1>
        </div>

        <div className="flex gap-3">
          {role ===
            "ADMIN" && (
            <button
              onClick={() =>
                router.push(
                  "/categories"
                )
              }
              className="
                px-5
                h-11
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                text-sm
                text-white/70
                hover:border-violet-500/30
                hover:bg-white/[0.05]
                transition
              "
            >
              Manage Categories
            </button>
          )}

          <button
            onClick={() =>
              router.push(
                "/articles/editor"
              )
            }
            className="
              px-5
              h-11
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-orange-400
              text-sm
              shadow-lg
              shadow-violet-500/20
            "
          >
            + Create Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div
            className="
              flex
              flex-col
              gap-4
              mb-5
            "
          >
            <div
              className="
                flex
                gap-3
              "
            >
              <select
                value={searchType}
                onChange={(e) =>
                  setSearchType(
                    e.target.value
                  )
                }
                className="
                  h-12
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  backdrop-blur-xl
                  px-4
                  text-white
                  text-sm
                  outline-none
                  focus:border-violet-500/40
                "
              >
                <option
                  value="GLOBAL"
                  className="
                    bg-[#171a20]
                  "
                >
                  All
                </option>

                <option
                  value="TITLE"
                  className="
                    bg-[#171a20]
                  "
                >
                  Title
                </option>

                <option
                  value="AUTHOR"
                  className="
                    bg-[#171a20]
                  "
                >
                  Author
                </option>

                <option
                  value="CATEGORY"
                  className="
                    bg-[#171a20]
                  "
                >
                  Category
                </option>
              </select>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search..."
                className="
                  flex-1
                  h-12

                  bg-white/[0.04]
                  backdrop-blur-xl

                  border
                  border-white/10

                  rounded-2xl

                  px-4

                  text-white

                  outline-none

                  focus:border-violet-500/40
                "
              />

              <button
                onClick={() =>
                  setShowFilters(
                    !showFilters
                  )
                }
                className="
                  h-12
                  px-5

                  rounded-2xl

                  border
                  border-white/10

                  bg-white/[0.03]

                  text-white/70

                  hover:bg-white/[0.05]

                  transition
                "
              >
                Filter
              </button>
            </div>

            {showFilters && (
              <div
                className="
                  flex
                  gap-2
                  flex-wrap
                "
              >
                {[
                  "ALL",
                  "DRAFT",
                  "REVIEW",
                  "PUBLISHED",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setStatusFilter(
                        status
                      )
                    }
                    className={`
                      px-4
                      h-11

                      rounded-2xl

                      border

                      transition

                      ${
                        statusFilter ===
                        status
                          ? `
                            border-violet-500/40
                            bg-violet-500/10
                            text-violet-300
                          `
                          : `
                            border-white/10
                            bg-white/[0.03]
                            text-white/60
                          `
                      }
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="
              bg-white/[0.04]
              backdrop-blur-2xl
              border
              border-white/10
              rounded-3xl
              overflow-hidden
              shadow-xl
              shadow-black/20
            "
          >
            <table className="w-full">
              <thead
                className="
                  border-b
                  border-white/10
                  bg-black/10
                "
              >
                <tr
                  className="
                    text-left
                    text-white/40
                    text-sm
                  "
                >
                  <th
                    className="
                      p-5
                      font-normal
                      cursor-pointer
                      hover:text-violet-300
                    "
                    onClick={() => {
                      setSortField(
                        "title"
                      );

                      setSortDirection(
                        sortDirection ===
                        "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    Title ↕
                  </th>

                  <th
                    className="
                      font-normal
                      cursor-pointer
                      hover:text-violet-300
                    "
                    onClick={() => {
                      setSortField(
                        "author"
                      );

                      setSortDirection(
                        sortDirection ===
                        "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    Author ↕
                  </th>

                  <th
                    className="
                      font-normal
                      cursor-pointer
                      hover:text-violet-300
                    "
                    onClick={() => {
                      setSortField(
                        "category"
                      );

                      setSortDirection(
                        sortDirection ===
                        "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    Category ↕
                  </th>

                  <th className="font-normal">
                    Status
                  </th>

                  <th
                    className="
                      font-normal
                      cursor-pointer
                      hover:text-violet-300
                    "
                    onClick={() => {
                      setSortField(
                        "createdAt"
                      );

                      setSortDirection(
                        sortDirection ===
                        "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    Date ↕
                  </th>

                  <th className="font-normal">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredArticles.map(
                  (article) => (
                    <tr
                      key={
                        article.id
                      }
                      className="
                        border-b
                        border-white/10
                        hover:bg-white/[0.03]
                        transition
                      "
                    >
                      <td className="p-5">
                        <button
                          onClick={() =>
                            setSelectedArticle(
                              article
                            )
                          }
                          className="
                            text-sm
                            leading-6
                            text-white/90
                            hover:text-violet-300
                            transition
                            text-left
                          "
                        >
                          {
                            article.title
                          }
                        </button>
                      </td>

                      <td
                        className="
                          text-sm
                          text-white/60
                        "
                      >
                        {
                          article
                            .author
                            ?.name
                        }
                      </td>

                      <td>
                        <span
                          className="
                            px-3
                            py-1
                            text-xs
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.03]
                          "
                        >
                          {article
                            .category
                            ?.name ||
                            "Uncategorized"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            border
                            ${
                              article.status ===
                              "PUBLISHED"
                                ? `
                                  bg-orange-500/10
                                  border-orange-500/20
                                  text-orange-300
                                `
                                : article.status ===
                                  "REVIEW"
                                ? `
                                  bg-violet-500/10
                                  border-violet-500/20
                                  text-violet-300
                                `
                                : `
                                  bg-white/5
                                  border-white/10
                                  text-white/50
                                `
                            }
                          `}
                        >
                          {
                            article.status
                          }
                        </span>
                      </td>

                      <td
                        className="
                          text-sm
                          text-white/50
                        "
                      >
                        {article.publishedAt
                          ? new Date(
                              article.publishedAt
                            ).toLocaleDateString()
                          : "--"}
                      </td>

                      <td>
                        <div
                          className="
                            flex
                            gap-4
                            text-white/40
                          "
                        >
                          <button
                            onClick={() =>
                              router.push(
                                `/articles/editor?id=${article.id}`
                              )
                            }
                            className="
                              hover:text-violet-400
                              transition
                            "
                          >
                            ✎
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                article.id
                              )
                            }
                            className="
                              hover:text-red-400
                              transition
                            "
                          >
                            ⌫
                          </button>

                          <button
                            onClick={() =>
                              handlePublish(
                                article.id
                              )
                            }
                            disabled={
                              article.status ===
                              "PUBLISHED"
                            }
                            className={`
                              transition
                              ${
                                article.status ===
                                "PUBLISHED"
                                  ? `
                                    text-green-400
                                    cursor-not-allowed
                                  `
                                  : `
                                    hover:text-orange-400
                                  `
                              }
                            `}
                          >
                            ⋯
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div
            className="
              bg-white/[0.04]
              backdrop-blur-2xl
              border
              border-white/10
              rounded-3xl
              p-6
              shadow-xl
              shadow-black/20
            "
          >
            <h2
              className="
                mb-6
                text-white
              "
            >
              Filter by Status
            </h2>

            <div className="space-y-5">
              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >
                <span className="text-white/70">
                  Total Articles
                </span>

                <span className="text-white/40">
                  {
                    articles.length
                  }
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >
                <span className="text-orange-300">
                  Published
                </span>

                <span className="text-orange-300">
                  {
                    articles.filter(
                      (
                        article
                      ) =>
                        article.status ===
                        "PUBLISHED"
                    ).length
                  }
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >
                <span className="text-violet-300">
                  Review
                </span>

                <span className="text-violet-300">
                  {
                    articles.filter(
                      (
                        article
                      ) =>
                        article.status ===
                        "REVIEW"
                    ).length
                  }
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >
                <span className="text-white/50">
                  Draft
                </span>

                <span className="text-white/50">
                  {
                    articles.filter(
                      (
                        article
                      ) =>
                        article.status ===
                        "DRAFT"
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>

          <div
            className="
              bg-white/[0.04]
              backdrop-blur-2xl
              border
              border-white/10
              rounded-3xl
              p-6
              shadow-xl
              shadow-black/20
            "
          >
            <h2
              className="
                mb-6
                text-white
              "
            >
              Latest Article
            </h2>

            {articles[0] ? (
              <div className="space-y-4">
                <div>
                  <p
                    className="
                      text-white
                      text-sm
                      leading-6
                    "
                  >
                    {
                      articles[0]
                        .title
                    }
                  </p>

                  <p
                    className="
                      text-xs
                      text-white/40
                      mt-2
                    "
                  >
                    by{" "}
                    {
                      articles[0]
                        .author
                        ?.name
                    }
                  </p>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-xs
                    text-white/40
                  "
                >
                  <span>
                    {
                      articles[0]
                        .status
                    }
                  </span>

                  <span>
                    {new Date(
                      articles[0]
                        .createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : (
              <p
                className="
                  text-sm
                  text-white/40
                "
              >
                No article found
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedArticle && (
        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-md
            z-50
            flex
            items-center
            justify-center
            p-6
          "
        >
          <div
            className="
              w-full
              max-w-4xl
              max-h-[90vh]
              overflow-y-auto
              bg-[#171a20]/90
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[32px]
              p-8
              shadow-2xl
              shadow-black/40
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                mb-8
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    text-white/40
                    mb-3
                  "
                >
                  ARTICLE PREVIEW
                </p>

                <h2
                  className="
                    text-3xl
                    font-light
                    leading-tight
                    text-white
                  "
                >
                  {
                    selectedArticle.title
                  }
                </h2>

                <div
                  className="
                    flex
                    gap-3
                    mt-5
                    text-sm
                    text-white/40
                  "
                >
                  <span>
                    {
                      selectedArticle
                        .author?.name
                    }
                  </span>

                  <span>•</span>

                  <span>
                    {
                      selectedArticle
                        .category
                        ?.name ||
                      "Uncategorized"
                    }
                  </span>

                  <span>•</span>

                  <span>
                    {new Date(
                      selectedArticle.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedArticle(
                    null
                  )
                }
                className="
                  text-white/40
                  hover:text-white
                  transition
                "
              >
                ✕
              </button>
            </div>

            <div
              className="
                border-y
                border-white/10
                py-8
                text-white/80
                leading-8
                prose
                prose-invert
                max-w-none
              "
              dangerouslySetInnerHTML={{
                __html:
                  selectedArticle.content,
              }}
            />

            <div
              className="
                grid
                grid-cols-3
                gap-5
                mt-8
              "
            >
              <div
                className="
                  bg-white/[0.03]
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                "
              >
                <p
                  className="
                    text-xs
                    text-white/40
                    mb-3
                  "
                >
                  STATUS
                </p>

                <p className="text-sm">
                  {
                    selectedArticle.status
                  }
                </p>
              </div>

              <div
                className="
                  bg-white/[0.03]
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                "
              >
                <p
                  className="
                    text-xs
                    text-white/40
                    mb-3
                  "
                >
                  
                </p>

                <p className="text-sm">

                </p>
              </div>

              <div
                className="
                  bg-white/[0.03]
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                "
              >
                <p
                  className="
                    text-xs
                    text-white/40
                    mb-3
                  "
                >
                  Alternative Titla
                </p>

                <p
                  className="
                    text-sm
                    line-clamp-2
                  "
                >
                  {
                    selectedArticle.seoTitle ||
                    "--"
                  }
                </p>
              </div>
            </div>

            <div
              className="
                flex
                justify-end
                gap-4
                mt-8
              "
            >
              <button
                onClick={() =>
                  setSelectedArticle(
                    null
                  )
                }
                className="
                  px-5
                  h-11
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  hover:bg-white/[0.05]
                  transition
                "
              >
                Close
              </button>

              <button
                onClick={() =>
                  router.push(
                    `/articles/editor?id=${selectedArticle.id}`
                  )
                }
                className="
                  px-5
                  h-11
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-500
                  to-orange-400
                  text-sm
                  shadow-lg
                  shadow-violet-500/20
                "
              >
                Edit Article
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}