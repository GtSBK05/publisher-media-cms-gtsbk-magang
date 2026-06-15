"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

import RichTextEditor from "@/components/editor/RichTextEditor";

export default function ArticleEditorPage() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const articleId =
    searchParams.get("id");

  const isEditMode =
    !!articleId;

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [
    seoTitle,
    setSeoTitle,
  ] = useState("");

  const [
    seoDescription,
    setSeoDescription,
  ] = useState("");

  const [
    seoKeywords,
    setSeoKeywords,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [userId, setUserId] =
    useState("");

  const [userRole, setUserRole] =
    useState("");

  const [articleAuthorId, setArticleAuthorId] =
    useState("");    

  const [fetching, setFetching] =
    useState(false);

  const [
    categories,
    setCategories,
  ] = useState<any[]>([]);

  const [
    categoryId,
    setCategoryId,
  ] = useState("");

  const [
    editorLightMode,
    setEditorLightMode,
  ] = useState(false);  

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (
      !token ||
      token === "null" ||
      token === "undefined"
    ) {
      router.push("/login");
      return;
    }

    const payload =
      JSON.parse(
        atob(
          token.split(".")[1]
        )
      );

    setUserId(
      payload.id
    );

    setUserRole(
      payload.role
    );    

    const savedTheme =
      localStorage.getItem(
        "editor-theme"
      );

    if (savedTheme === "light") {
      setEditorLightMode(
        true
      );
    }    

    fetchCategories();

    if (articleId) {
      fetchArticle();
    }
  }, [articleId, router]);

  async function fetchArticle() {
    try {
      setFetching(true);

      const token =
        localStorage.getItem(
          "token"
        );

      if (
        !token ||
        token === "null" ||
        token === "undefined"
      ) {
        router.push("/login");
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

      if (res.status === 401) {
        localStorage.removeItem(
          "token"
        );

        router.push("/login");

        return;
      }

      const data =
        await res.json();

      const article =
        data.find(
          (item: any) =>
            item.id ===
            articleId
        );

      if (!article) {
        alert(
          "Article not found"
        );

        router.push(
          "/articles"
        );

        return;
      }

      setTitle(article.title);

      setContent(
        article.content
      );

      setSeoTitle(
        article.seoTitle ||
          ""
      );

      setSeoDescription(
        article.seoDescription ||
          ""
      );

      setSeoKeywords(
        article.seoKeywords ||
          ""
      );

      setCategoryId(
        article.categoryId ||
          ""
      );

      setArticleAuthorId(
        article.authorId
      );      

    } catch (error) {
      console.error(error);

    } finally {
      setFetching(false);
    }
  }

  async function fetchCategories() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (
        !token ||
        token === "null" ||
        token === "undefined"
      ) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        "/api/categories",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem(
          "token"
        );

        router.push("/login");

        return;
      }

      const data =
        await res.json();

      setCategories(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      console.error(error);
    }
  }

      function toggleEditorTheme() {
        const nextValue =
          !editorLightMode;

        setEditorLightMode(
          nextValue
        );

        localStorage.setItem(
          "editor-theme",
          nextValue
            ? "light"
            : "dark"
        );
      }  

      const canEditDirectly =
        articleAuthorId ===
          userId ||
        userRole ===
          "EDITOR" ||
        userRole ===
          "ADMIN";  

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const url =
        isEditMode
          ? `/api/articles/${articleId}`
          : "/api/articles/create";

      const method =
        isEditMode
          ? "PATCH"
          : "POST";

      const res = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            content,

            seoTitle,
            seoDescription,
            seoKeywords,

            categoryId,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);

        return;
      }

      if (!isEditMode) {
        alert(
          "Article created"
        );
      } else if (
        canEditDirectly
      ) {
        alert(
          "Article updated"
        );
      } else {
        alert(
          "Revision submitted"
        );
      }

      router.push(
        "/articles"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Operation failed"
      );

    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <main
        className="
          min-h-screen
          bg-[#111318]
          text-white
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </main>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-light
              text-white
            "
          >
            {isEditMode
              ? "Edit Article"
              : "Create Article"}
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={
              toggleEditorTheme
            }
            className="
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              rounded-2xl
              px-5
              h-11
              text-sm
              text-white/70
              hover:border-white/20
              hover:bg-white/[0.05]
              transition
            "
          >
            {editorLightMode
              ? "🌙"
              : "☀"}
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/articles"
              )
            }
            className="
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              rounded-2xl
              px-5
              h-11
              text-sm
              text-white/70
              hover:border-white/20
              hover:bg-white/[0.05]
              transition
            "
          >
            Back
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-12
          gap-6
        "
      >
        <div className="col-span-8 space-y-6">
          <div
            className={`
              rounded-[32px]
              p-8
              shadow-xl

              ${
                editorLightMode
                  ? `
                    bg-[#fafaf9]
                    border
                    border-black/10
                    text-black
                  `
                  : `
                    bg-white/[0.04]
                    backdrop-blur-2xl
                    border
                    border-white/10
                    shadow-black/20
                    text-white
                  `
              }
            `}
          >
            <div className="space-y-6">
              <div>
                <label
                  className={`
                    text-sm
                    block
                    mb-3
                    ${
                      editorLightMode
                        ? "text-black/60"
                        : "text-white/50"
                    }
                  `}
                >
                  Article Title
                </label>

                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Enter article title..."
                  className={`
                    w-full
                    h-14
                    rounded-2xl
                    px-4
                    outline-none
                    focus:border-violet-500/40

                    ${
                      editorLightMode
                        ? `
                          bg-black/[0.03]
                          text-black
                          border
                          border-black/10
                        `
                        : `
                          bg-white/[0.03]
                          text-white
                          border
                          border-white/10
                        `
                    }
                  `}
                />
              </div>

              <div>
                <label
                  className={`
                    text-sm
                    block
                    mb-3
                    ${
                      editorLightMode
                        ? "text-black/60"
                        : "text-white/50"
                    }
                  `}
                >
                  Content
                </label>

                <div
                  className={`
                    rounded-[28px]
                    overflow-hidden
                    border

                    ${
                      editorLightMode
                        ? `
                          border-black/10
                          bg-black/[0.02]
                        `
                        : `
                          border-white/10
                          bg-white/[0.03]
                          backdrop-blur-2xl
                        `
                    }
                  `}
                >
                  <RichTextEditor
                    content={content}
                    onChange={
                      setContent
                    }
                    lightMode={
                      editorLightMode
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div
            className={`
              rounded-[32px]
              p-6
              space-y-5
              shadow-xl

              ${
                editorLightMode
                  ? `
                    bg-[#fafaf9]
                    border
                    border-black/10
                    text-black
                  `
                  : `
                    bg-white/[0.04]
                    backdrop-blur-2xl
                    border
                    border-white/10
                    shadow-black/20
                    text-white
                  `
              }
            `}
          >
            <h2
              className={`
                text-sm
                block
                mb-3
                ${
                  editorLightMode
                    ? "text-black/60"
                    : "text-white/50"
                }
              `}
            >
              Article Metadata
            </h2>

            <div>
              <label
                className={`
                  text-xs
                  block
                  mb-2
                  ${
                    editorLightMode
                      ? "text-black/60"
                      : "text-white/50"
                  }
                `}
              >
                Category
              </label>

              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(
                      e.target.value
                    )
                  }
                  className={`
                    w-full
                    h-12
                    appearance-none
                    rounded-2xl
                    px-4
                    pr-12
                    text-sm
                    outline-none
                    transition

                    ${
                      editorLightMode
                        ? `
                          bg-[#f3f4f6]
                          text-black
                          border
                          border-black/10
                        `
                        : `
                          bg-[#1b1e24]
                          text-white
                          border
                          border-white/10
                        `
                    }
                  `}
                >
                  <option
                    value=""
                    style={{
                      backgroundColor:
                        editorLightMode
                          ? "#f3f4f6"
                          : "#1b1e24",
                      color:
                        editorLightMode
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    Uncategorized
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        style={{
                          backgroundColor:
                            editorLightMode
                              ? "#f3f4f6"
                              : "#1b1e24",
                          color:
                            editorLightMode
                              ? "#000"
                              : "#fff",
                        }}
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>

                <div
                  className={`
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    text-xs

                    ${
                      editorLightMode
                        ? "text-black/40"
                        : "text-white/40"
                    }
                  `}
                >
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label
                className={`
                  text-xs
                  block
                  mb-2
                  ${
                    editorLightMode
                      ? "text-black/60"
                      : "text-white/50"
                  }
                `}
              >
                Alternative
              </label>

              <input
                type="text"
                value={seoTitle}
                onChange={(e) =>
                  setSeoTitle(
                    e.target.value
                  )
                }
                placeholder="Alternative names separated by comma"
                className={`
                  w-full
                  h-11
                  rounded-2xl
                  px-4
                  outline-none

                  ${
                    editorLightMode
                      ? `
                        bg-black/[0.03]
                        text-black
                        border
                        border-black/10
                      `
                      : `
                        bg-white/[0.03]
                        text-white
                        border
                        border-white/10
                      `
                  }
                `}
              />
            </div>

            <div>
              <label
                className={`
                  text-xs
                  block
                  mb-2
                  ${
                    editorLightMode
                      ? "text-black/60"
                      : "text-white/50"
                  }
                `}
              >
                Summary
              </label>

              <textarea
                rows={5}
                value={seoDescription}
                onChange={(e) =>
                  setSeoDescription(
                    e.target.value
                  )
                }
                placeholder="Short summary"
                className={`
                  w-full
                  rounded-2xl
                  p-4
                  outline-none
                  resize-none

                  ${
                    editorLightMode
                      ? `
                        bg-black/[0.03]
                        text-black
                        border
                        border-black/10
                      `
                      : `
                        bg-white/[0.03]
                        text-white
                        border
                        border-white/10
                      `
                  }
                `}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-orange-400
              text-sm
              shadow-lg
              shadow-violet-500/20
            "
          >
            {loading
              ? "Processing..."
              : !isEditMode
              ? "Create Draft"
              : canEditDirectly
              ? "Update Article"
              : "Submit Revision"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}