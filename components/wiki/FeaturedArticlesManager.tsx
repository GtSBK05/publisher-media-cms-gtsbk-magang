"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

interface Props {
  article1Id?: string | null;
  article2Id?: string | null;
  article3Id?: string | null;
}

export default function FeaturedArticlesManager({
  article1Id,
  article2Id,
  article3Id,
}: Props) {
  const [
    articles,
    setArticles,
  ] = useState<any[]>([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    pinned,
    setPinned,
  ] = useState<string[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {
    fetchArticles();
    fetchFeatured();
  }, []);

  async function fetchArticles() {
    try {
      const res =
        await fetch(
          "/api/wiki-settings/articles"
        );

      const data =
        await res.json();

      setArticles(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFeatured() {
    try {
      const res =
        await fetch(
          "/api/wiki-settings/featured"
        );

      const data =
        await res.json();

      setPinned(
        [
          data.featuredArticle1Id,
          data.featuredArticle2Id,
          data.featuredArticle3Id,
        ].filter(Boolean)
      );

    } catch (error) {
      console.error(error);
    }
  }
    const filteredArticles =
      useMemo(() => {
        if (
          search.trim().length < 2
        ) {
          return [];
        }

        return articles.filter(
          (article) =>
            article.title
              .toLowerCase()
              .includes(
                search
                  .toLowerCase()
                  .trim()
              )
          );
      }, [
        articles,
        search,
      ]);

  function handlePin(
    id: string
  ) {
    if (
      pinned.includes(id)
    ) {
      return;
    }

    if (
      pinned.length >= 3
    ) {
      alert(
        "Maximum 3 featured articles"
      );

      return;
    }

    setPinned([
      ...pinned,
      id,
    ]);
  }

  function handleRemove(
    id: string
  ) {
    setPinned(
      pinned.filter(
        (item) =>
          item !== id
      )
    );
  }

  function handleUnpinAll() {
    const confirmed =
      confirm(
        "Remove all pinned articles?"
      );

    if (!confirmed) {
      return;
    }

    setPinned([]);
  }  

  async function handleSave() {
    try {
      setLoading(true);

      const res =
        await fetch(
          "/api/wiki-settings/featured",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              featuredArticle1Id:
                pinned[0],

              featuredArticle2Id:
                pinned[1],

              featuredArticle3Id:
                pinned[2],
            }),
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
        "Pinned articles saved"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to save"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        mt-8

        rounded-[32px]

        border
        border-violet-500/10

        bg-gradient-to-br
        from-violet-500/5
        to-orange-400/5

        backdrop-blur-xl

        p-8
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <h2
          className="
            text-xl
            text-white
          "
        >
          Pinned Articles
        </h2>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <button
            onClick={handleUnpinAll}
            disabled={
              pinned.length === 0
            }
            className="
              px-4
              h-10

              rounded-xl

              border
              border-red-500/20

              text-red-300

              hover:bg-red-500/10

              transition

              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            Unpin All
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="
              px-5
              h-10

              rounded-xl

              bg-violet-500

              text-white
            "
          >
            {loading
              ? "Saving..."
              : "Save"}
          </button>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="Search article..."
        className="
          w-full
          h-12
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/10
          px-4
          text-white
          outline-none
        "
      />

      <div
        className="
          mt-8
        "
      >
        <h3
          className="
            text-white
            mb-4
          "
        >
          Featured Slots
        </h3>

        <div
          className="
            space-y-3
          "
        >
          {pinned.map(
            (id) => {
              const article =
                articles.find(
                  (item) =>
                    item.id === id
                );

              if (
                !article
              ) {
                return null;
              }

              return (
                <div
                  key={id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-violet-500/10
                    bg-gradient-to-br
                    from-violet-500/5
                    to-orange-400/5
                    backdrop-blur-x1
                    p-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-white
                      "
                    >
                      {
                        article.title
                      }
                    </p>

                    <p
                      className="
                        text-xs
                        text-white/40
                        mt-1
                      "
                    >
                      {
                        article
                          .category
                          ?.name ||
                          "Uncategorized"
                      }
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleRemove(
                        id
                      )
                    }
                    className="
                      text-red-400
                      text-sm
                    "
                  >
                    Remove
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div
        className="
          mt-8
          space-y-3
        "
      >
        {search.trim().length < 2 && (
          <div
            className="
              text-center
              py-12
              text-white/40
            "
          >
            Type at least 2 characters
            to search articles
          </div>
        )}

        {filteredArticles.map(
          (article) => (
            <div
              key={article.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-violet-500/10
                bg-gradient-to-br
                from-violet-500/5
                to-orange-400/5
                backdrop-blur-x1
                p-4
              "
            >
              <div>
                <p
                  className="
                    text-white
                  "
                >
                  {article.title}
                </p>

                <p
                  className="
                    text-xs
                    text-white/40
                    mt-1
                  "
                >
                  {
                    article
                      .category
                      ?.name ||
                      "Uncategorized"
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  handlePin(
                    article.id
                  )
                }
                disabled={
                  pinned.includes(
                    article.id
                  )
                }
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-orange-500
                  text-white
                  disabled:opacity-50
                "
              >
                Pin
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}