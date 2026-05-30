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

  useEffect(() => {
    fetchCategories();

    if (articleId) {
      fetchArticle();
    }
  }, []);

  async function fetchArticle() {
    try {
      setFetching(true);

      const token =
        localStorage.getItem(
          "token"
        );

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

      const res = await fetch(
        "/api/categories",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

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

      alert(
        isEditMode
          ? "Article updated"
          : "Article created"
      );

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

        <button
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
            className="
              bg-white/[0.04]
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[32px]
              p-8
              shadow-xl
              shadow-black/20
            "
          >
            <div className="space-y-6">
              <div>
                <label
                  className="
                    text-sm
                    text-white/50
                    block
                    mb-3
                  "
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
                  className="
                    w-full
                    h-14
                    bg-white/[0.03]
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
              </div>

              <div>
                <label
                  className="
                    text-sm
                    text-white/50
                    block
                    mb-3
                  "
                >
                  Content
                </label>

                <div
                  className="
                    rounded-[28px]
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-2xl
                  "
                >
                  <RichTextEditor
                    content={content}
                    onChange={
                      setContent
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div
            className="
              bg-white/[0.04]
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[32px]
              p-6
              space-y-5
              shadow-xl
              shadow-black/20
            "
          >
            <h2
              className="
                text-lg
                font-light
                text-white
              "
            >
              SEO Settings
            </h2>

            <div>
              <label
                className="
                  text-xs
                  text-white/50
                  block
                  mb-2
                "
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
                  className="
                    w-full
                    h-12
                    appearance-none
                    bg-white/[0.03]
                    backdrop-blur-xl
                    border
                    border-white/10
                    rounded-2xl
                    px-4
                    pr-12
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-violet-500/40
                    hover:border-white/20
                  "
                >
                  <option value="">
                    Uncategorized
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className="
                          bg-[#1b1e24]
                          text-white
                        "
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>

                <div
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    text-white/40
                    text-xs
                  "
                >
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label
                className="
                  text-xs
                  text-white/50
                  block
                  mb-2
                "
              >
                Alternative Title
              </label>

              <input
                type="text"
                value={seoTitle}
                onChange={(e) =>
                  setSeoTitle(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-11
                  bg-white/[0.03]
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
            </div>

            <div>
              <label
                className="
                  text-xs
                  text-white/50
                  block
                  mb-2
                "
              >
                Description
              </label>

              <textarea
                rows={5}
                value={
                  seoDescription
                }
                onChange={(e) =>
                  setSeoDescription(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white/[0.03]
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                  text-white
                  outline-none
                  focus:border-violet-500/40
                  resize-none
                "
              />
            </div>

            <div>
              <label
                className="
                  text-xs
                  text-white/50
                  block
                  mb-2
                "
              >
                Keywords
              </label>

              <input
                type="text"
                value={
                  seoKeywords
                }
                onChange={(e) =>
                  setSeoKeywords(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-11
                  bg-white/[0.03]
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
              : isEditMode
              ? "Update Article"
              : "Publish Draft"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}