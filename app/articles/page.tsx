"use client";

import { useEffect, useState } from "react";
import { useRouter, } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ArticlesPage() {
  const router = useRouter();

  const [articles, setArticles] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [role, setRole] =
    useState("");    

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

        const data = await res.json();

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
            "
          >
            Article Management
          </h1>

          <p
            className="
              text-white/40
              mt-1
              text-sm
            "
          >
            Manage and organize your
            content library
          </p>
        </div>

        <div className="flex gap-3">
          {role === "ADMIN" && (
            <button
              onClick={() =>
                router.push(
                  "/categories"
                )
              }
              className="
                px-5
                h-11
                border
                border-white/10
                text-sm
                hover:border-violet-500
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
              bg-gradient-to-r
              from-violet-500
              to-orange-400
              text-sm
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
              gap-4
              mb-5
            "
          >
            <input
              type="text"
              placeholder="Search articles by title, author, or category..."
              className="
                flex-1
                h-12
                bg-[#12121a]
                border
                border-white/5
                px-4
                text-sm
                outline-none
                focus:border-violet-500
              "
            />

            <button
              className="
                px-5
                bg-[#12121a]
                border
                border-white/5
                text-sm
              "
            >
              Filters
            </button>
          </div>

          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              overflow-hidden
            "
          >
            <table className="w-full">
              <thead
                className="
                  border-b
                  border-white/5
                "
              >
                <tr
                  className="
                    text-left
                    text-white/40
                    text-sm
                  "
                >
                  <th className="p-5 font-normal">
                    Title
                  </th>

                  <th className="font-normal">
                    Author
                  </th>

                  <th className="font-normal">
                    Category
                  </th>

                  <th className="font-normal">
                    Status
                  </th>

                  <th className="font-normal">
                    Publish Date
                  </th>

                  <th className="font-normal">
                    Health
                  </th>

                  <th className="font-normal">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/[0.02]
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
                        {article.title}
                      </button>
                    </td>

                    <td
                      className="
                        text-sm
                        text-white/60
                      "
                    >
                      {article.author?.name}
                    </td>

                    <td>
                      <span
                        className="
                          px-3
                          py-1
                          text-xs
                          border
                          border-white/10
                          bg-white/[0.03]
                        "
                      >
                        {article.category
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
                        {article.status}
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
                      <span
                        className={`
                          text-xs
                          px-3
                          py-1
                          rounded-full
                          border
                          ${
                            article.healthScore >=
                            80
                              ? `
                                bg-green-500/10
                                border-green-500/20
                                text-green-300
                              `
                              : article.healthScore >=
                                50
                              ? `
                                bg-orange-500/10
                                border-orange-500/20
                                text-orange-300
                              `
                              : `
                                bg-red-500/10
                                border-red-500/20
                                text-red-300
                              `
                          }
                        `}
                      >
                        {
                          article.healthScore
                        }
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              p-6
            "
          >
            <h2 className="mb-6">
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
                  {articles.length}
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
              bg-[#12121a]
              border
              border-white/5
              p-6
            "
          >
            <h2 className="mb-6">
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
                    {articles[0].title}
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
                        .author?.name
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
          backdrop-blur-sm
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
            bg-[#12121a]
            border
            border-white/10
            p-8
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
              border-white/5
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
                bg-black/20
                border
                border-white/5
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
                bg-black/20
                border
                border-white/5
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
                HEALTH SCORE
              </p>

              <p className="text-sm">
                {
                  selectedArticle.healthScore
                }
              </p>
            </div>

            <div
              className="
                bg-black/20
                border
                border-white/5
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
                SEO TITLE
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
                border
                border-white/10
                text-sm
                hover:bg-white/5
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
                bg-gradient-to-r
                from-violet-500
                to-orange-400
                text-sm
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