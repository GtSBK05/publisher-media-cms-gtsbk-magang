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

import {
  transformImageHtml,
} from "@/lib/transformImageHTML";

import {
  paginate,
} from "@/lib/pagination";

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

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const articlesPerPage =
    10;

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

  const [
    selectedRevisionArticle,
    setSelectedRevisionArticle,
  ] = useState<any>(null);

  const [
    revisions,
    setRevisions,
  ] = useState<any[]>([]);  

  const [
    selectedRevision,
    setSelectedRevision,
  ] = useState<any>(null);  

  const [
    revisionPage,
    setRevisionPage,
  ] = useState(1);

  const revisionsPerPage = 3;  

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

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    searchType,
    statusFilter,
    categoryFilter,
  ]);  

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

  async function openRevisions(
    article: any
  ) {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          `/api/revisions?articleId=${article.id}&status`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await res.json();

      setRevisions(
        Array.isArray(data)
          ? data
          : []
      );

      setSelectedRevisionArticle(
        article
      );

    } catch (error) {
      console.error(error);
    }
  }  

  async function approveRevision(
    revisionId: string
  ) {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          `/api/revisions/${revisionId}/approve`,
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
        alert(
          data.error
        );

        return;
      }

      alert(
        "Revision approved"
      );

      setRevisions((prev) =>
        prev.map((revision) =>
          revision.id === revisionId
            ? {
                ...revision,
                status:
                  "APPROVED",
              }
            : revision
        )
      );

      setArticles((prev) =>
        prev.map((article) =>
          article.id ===
          selectedRevisionArticle?.id
            ? {
                ...article,
                pendingCount:
                  Math.max(
                    0,
                    (article.pendingCount ||
                      0) - 1
                  ),
              }
            : article
        )
      );

    } catch (error) {
      console.error(error);
    }
  }  

  async function rejectRevision(
    revisionId: string
  ) {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          `/api/revisions/${revisionId}/reject`,
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
        alert(
          data.error
        );

        return;
      }

      alert(
        "Revision rejected"
      );

      setRevisions((prev) =>
        prev.map((revision) =>
          revision.id === revisionId
            ? {
                ...revision,
                status:
                  "REJECTED",
              }
            : revision
        )
      );

      setArticles((prev) =>
        prev.map((article) =>
          article.id ===
          selectedRevisionArticle?.id
            ? {
                ...article,
                pendingCount:
                  Math.max(
                    0,
                    (article.pendingCount ||
                      0) - 1
                  ),
              }
            : article
        )
      );

    } catch (error) {
      console.error(error);
    }
  }  

  function timeAgo(
    date: string
  ) {
    const diff =
      Date.now() -
      new Date(
        date
      ).getTime();

    const minutes =
      Math.floor(
        diff / 60000
      );

    const hours =
      Math.floor(
        minutes / 60
      );

    const days =
      Math.floor(
        hours / 24
      );

    if (minutes < 1)
      return "Just now";

    if (minutes < 60)
      return `${minutes}m ago`;

    if (hours < 24)
      return `${hours}h ago`;

    return `${days}d ago`;
  }  

  const processedArticles =
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

  const {
    data: filteredArticles,
    totalPages:
      articleTotalPages,
  } = paginate(
    processedArticles,
    currentPage,
    articlesPerPage
  );      

  const paginatedRevisions =
    revisions.slice(
      (revisionPage - 1) *
        revisionsPerPage,

      revisionPage *
        revisionsPerPage
    );

  const totalPages =
    Math.ceil(
      revisions.length /
        revisionsPerPage
    );      

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
          {(
            role === "ADMIN" ||
            role === "EDITOR"
          ) && (
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
                  
                  <th className="font-normal">
                    Pending
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
                                  "Revisions"
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

                      <td>
                        <button
                          onClick={() =>
                            openRevisions(
                              article
                            )
                          }
                          className="
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            text-violet-300
                            hover:bg-violet-500/20
                            transition
                          "
                        >
                          {article.pendingCount || 0}
                        </button>
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

          <div
            className="
              flex
              justify-center
              gap-2
              mt-6
            "
          >
            {Array.from(
              {
                length:
                  articleTotalPages,
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setCurrentPage(
                      i + 1
                    )
                  }
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    transition

                    ${
                      currentPage ===
                      i + 1
                        ? `
                          bg-violet-500/20
                          border
                          border-violet-500/30
                          text-violet-300
                        `
                        : `
                          bg-white/[0.03]
                          border
                          border-white/10
                          text-white/50
                        `
                    }
                  `}
                >
                  {i + 1}
                </button>
              )
            )}
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
                  Revisions
                </span>

                <span className="text-violet-300">
                  {
                    articles.reduce(
                      (
                        total,
                        article
                      ) =>
                        total +
                        (
                          article.pendingCount ||
                          0
                        ),
                      0
                    )
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
                  transformImageHtml(
                    selectedArticle.content
                  ),
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
      
      {selectedRevisionArticle && (
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
              max-w-3xl
              max-h-[75vh]
              overflow-y-auto
              bg-[#171a20]/90
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[32px]
              p-8
            "
          >
            <div
              className="
                flex
                justify-between
                mb-8
              "
            >
              <div>
                <p className="text-xs text-white/40">
                  ARTICLE REVISIONS
                </p>

                <h2
                  className="
                    text-3xl
                    font-light
                    text-white
                  "
                >
                  {
                    selectedRevisionArticle.title
                  }
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedRevisionArticle(
                    null
                  )
                }
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {paginatedRevisions.map(
                (revision) => (
                  <div
                    key={revision.id}
                    className="
                      bg-white/[0.03]
                      border
                      border-white/10
                      rounded-2xl
                      p-5
                    "
                  >
                    <div
                      className="
                        flex
                        justify-between
                        items-center
                      "
                    >
                      <div>
                        <h3
                          className="
                            text-white
                          "
                        >
                          {
                            revision.author
                              ?.name
                          }
                        </h3>

                        <div>
                          <p
                            className="
                              text-xs
                              text-white/40
                            "
                          >
                            Base Version:
                            {
                              revision.baseVersion
                            }
                          </p>

                          <p
                            className="
                              text-xs
                              text-white/30
                              mt-1
                            "
                          >
                            {timeAgo(
                              revision.createdAt
                            )}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                        "
                      >
                        {
                        }
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        gap-3
                        mt-4
                      "
                    >
                      <div
                        className="
                          flex
                          gap-3
                          mt-4
                        "
                      >
                        <button
                          onClick={() =>
                            setSelectedRevision(
                              revision
                            )
                          }
                          className="
                            px-4
                            h-10
                            rounded-xl
                            border
                            border-white/10
                          "
                        >
                          Preview
                        </button>

                        {revision.status ===
                          "APPROVED" && (
                          <div
                            className="
                              px-4
                              h-10

                              rounded-xl

                              bg-green-500/15
                              border
                              border-green-500/30

                              flex
                              items-center
                              justify-center

                              text-green-300
                            "
                          >
                            Approved
                          </div>
                        )}

                        {revision.status ===
                          "REJECTED" && (
                          <div
                            className="
                              px-4
                              h-10

                              rounded-xl

                              bg-red-500/15
                              border
                              border-red-500/30

                              flex
                              items-center
                              justify-center

                              text-red-300
                            "
                          >
                            Rejected
                          </div>
                        )}

                        {revision.status ===
                          "OUTDATED" && (
                          <>
                            <div
                              className="
                                px-4
                                h-10

                                rounded-xl

                                bg-orange-500/10
                                border
                                border-orange-500/20

                                flex
                                items-center
                                justify-center

                                text-orange-300
                              "
                            >
                              OUTDATED
                            </div>

                            <button
                              onClick={() =>
                                router.push(
                                  `/articles/editor?id=${selectedRevisionArticle.id}`
                                )
                              }
                              className="
                                px-4
                                h-10

                                rounded-xl

                                bg-violet-500/15
                                border
                                border-violet-500/20

                                text-violet-300
                              "
                            >
                              New Revision
                            </button>
                          </>
                        )}

                        {revision.status ===
                          "PENDING" &&
                          (role ===
                            "EDITOR" ||
                            role ===
                            "ADMIN") && (
                            <>
                              <button
                                onClick={() =>
                                  approveRevision(
                                    revision.id
                                  )
                                }
                                className="
                                  px-4
                                  h-10

                                  rounded-xl

                                  bg-green-500/20
                                  text-green-300
                                "
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  rejectRevision(
                                    revision.id
                                  )
                                }
                                className="
                                  px-4
                                  h-10

                                  rounded-xl

                                  bg-red-500/20
                                  text-red-300
                                "
                              >
                                Reject
                              </button>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              className="
                flex
                justify-center
                gap-2
                mt-6
              "
            >
              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setRevisionPage(
                        i + 1
                      )
                    }
                    className={`
                      w-10
                      h-10

                      rounded-xl

                      ${
                        revisionPage ===
                        i + 1
                          ? `
                            bg-violet-500/20
                            border
                            border-violet-500/30
                            text-violet-300
                          `
                          : `
                            bg-white/[0.03]
                            border
                            border-white/10
                            text-white/50
                          `
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>            
          </div>
        </div>
      )}      
      
      {selectedRevision && (
        <div
          className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-md
            z-[60]
            flex
            items-center
            justify-center
            p-6
          "
        >
          <div
            className="
              w-full
              max-w-7xl
              max-h-[90vh]
              overflow-y-auto

              bg-[#171a20]/95
              backdrop-blur-2xl

              border
              border-white/10

              rounded-[32px]

              p-8
            "
          >
            <div
              className="
                flex
                justify-between
                items-center
                mb-8
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-violet-300
                  "
                >
                  Revision Diff
                </p>

                <h2
                  className="
                    text-3xl
                    font-light
                  "
                >
                  Compare Changes
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedRevision(
                    null
                  )
                }
                className="
                  text-white/40
                  hover:text-white
                "
              >
                ✕
              </button>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-6
              "
            >
              <div
                className="
                  rounded-3xl
                  border
                  border-white/10

                  bg-white/[0.03]

                  p-6
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    mb-6
                  "
                >
                  <h3
                    className="
                      text-white/60
                      text-sm
                    "
                  >
                    CURRENT ARTICLE
                  </h3>

                  <span
                    className="
                      text-xs
                      text-white/40
                    "
                  >
                    v
                    {
                      selectedRevision
                        .article
                        ?.version
                    }
                  </span>
                </div>

                <h2
                  className="
                    text-2xl
                    mb-6
                  "
                >
                  {
                    selectedRevision
                      .article
                      ?.title
                  }
                </h2>

                <div
                  className="
                    prose
                    prose-invert
                    max-w-none
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                    transformImageHtml(
                      selectedRevision
                        .article
                        ?.content || ""
                    ),
                  }}
                />
              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-violet-500/20

                  bg-violet-500/[0.04]

                  p-6
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    mb-6
                  "
                >
                  <h3
                    className="
                      text-violet-300
                      text-sm
                    "
                  >
                    PROPOSED REVISION
                  </h3>

                  <span
                    className="
                      text-xs
                      text-violet-300
                    "
                  >
                    base v
                    {
                      selectedRevision
                        .baseVersion
                    }
                  </span>
                </div>

                <h2
                  className="
                    text-2xl
                    mb-6
                  "
                >
                  {
                    selectedRevision
                      .title
                  }
                </h2>

                <div
                  className="
                    prose
                    prose-invert
                    max-w-none
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                    transformImageHtml(
                      selectedRevision
                        .content
                    ),
                  }}
                />
              </div>
            </div>

            {(role === "EDITOR" ||
              role === "ADMIN") && (
              <div
                className="
                  flex
                  justify-end
                  gap-3
                  mt-8
                "
              >
                <button
                  onClick={() =>
                    rejectRevision(
                      selectedRevision.id
                    )
                  }
                  className="
                    px-5
                    h-11

                    rounded-2xl

                    bg-red-500/15
                    text-red-300
                  "
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    approveRevision(
                      selectedRevision.id
                    )
                  }
                  className="
                    px-5
                    h-11

                    rounded-2xl

                    bg-green-500/15
                    text-green-300
                  "
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}     
    </DashboardLayout>
  );
}