"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  const [stats, setStats] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchDashboard() {
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
          "/api/dashboard",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setStats(data);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return null;
  }

  const cards = [
    {
      title: "Total Articles",

      value:
        stats?.totalArticles || 0,

      change: "+12.5%",
    },

    {
      title: "Published",

      value:
        stats?.publishedArticles || 0,

      change: "+7",
    },

    {
      title: "Drafts",

      value:
        stats?.draftArticles || 0,

      change: "+3",
    },

    {
      title: "Users",

      value:
        stats?.totalUsers || 0,

      change: "+1",
    },
  ];

  const articles = [
    {
      title:
        "The Future of Digital Publishing",

      author: "Sarah Johnson",

      date: "Mar 8, 2026",

      views: "12.5k views",

      status: "Published",
    },

    {
      title:
        "Understanding Modern CMS Architecture",

      author: "Michael Chen",

      date: "Mar 7, 2026",

      views: "8.2k views",

      status: "In Review",
    },

    {
      title:
        "Content Strategy for 2026",

      author: "Emma Williams",

      date: "Mar 6, 2026",

      views: "-- views",

      status: "Draft",
    },
  ];

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
            Dashboard
          </h1>

          <p
            className="
              text-white/40
              mt-1
              text-sm
            "
          >
            Overview of your
            publishing activity
          </p>
        </div>

        <div className="flex gap-3">
          <button
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
            View All
          </button>

          <button
            className="
              px-5
              h-11
              bg-gradient-to-r
              from-violet-500
              to-orange-400
              text-sm
            "
          >
            + New Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="grid grid-cols-4 gap-4">
            {cards.map((item) => (
              <div
                key={item.title}
                className="
                  bg-[#12121a]
                  border
                  border-white/5
                  p-5
                  rounded-sm
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    mb-8
                  "
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-lg
                      bg-violet-500/10
                      border
                      border-violet-500/20
                      flex
                      items-center
                      justify-center
                      text-violet-300
                    "
                  >
                    ◇
                  </div>

                  <span
                    className="
                      text-xs
                      text-white/30
                    "
                  >
                    {item.change}
                  </span>
                </div>

                <h2
                  className="
                    text-4xl
                    font-light
                  "
                >
                  {item.value}
                </h2>

                <p
                  className="
                    text-sm
                    text-white/40
                    mt-2
                  "
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div
            className="
              mt-6
              bg-[#12121a]
              border
              border-white/5
              rounded-sm
              p-6
            "
          >
            <h2
              className="
                text-lg
                mb-8
              "
            >
              Recent Articles
            </h2>

            <div className="space-y-8">
              {articles.map((article) => (
                <div
                  key={article.title}
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <h3
                      className="
                        text-white/90
                      "
                    >
                      {article.title}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-white/30
                        mt-2
                      "
                    >
                      {article.author}
                      {" • "}
                      {article.date}
                      {" • "}
                      {article.views}
                    </p>
                  </div>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      border
                      ${
                        article.status ===
                        "Published"
                          ? `
                            bg-orange-500/10
                            border-orange-500/20
                            text-orange-300
                          `
                          : article.status ===
                            "In Review"
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
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              rounded-sm
              p-6
            "
          >
            <h2 className="mb-8">
              Top Performing
            </h2>

            <div className="space-y-6">
              <div>
                <p
                  className="
                    text-orange-300
                    text-sm
                    mb-2
                  "
                >
                  #1 The Future of Digital
                  Publishing
                </p>

                <div
                  className="
                    flex
                    justify-between
                    text-xs
                    text-white/40
                  "
                >
                  <span>
                    12.5k views
                  </span>

                  <span className="text-violet-300">
                    +24%
                  </span>
                </div>
              </div>

              <div>
                <p
                  className="
                    text-orange-300
                    text-sm
                    mb-2
                  "
                >
                  #2 Content Strategy for
                  2026
                </p>

                <div
                  className="
                    flex
                    justify-between
                    text-xs
                    text-white/40
                  "
                >
                  <span>
                    15.8k views
                  </span>

                  <span className="text-violet-300">
                    +18%
                  </span>
                </div>
              </div>

              <div>
                <p
                  className="
                    text-orange-300
                    text-sm
                    mb-2
                  "
                >
                  #3 Understanding Modern
                  CMS
                </p>

                <div
                  className="
                    flex
                    justify-between
                    text-xs
                    text-white/40
                  "
                >
                  <span>
                    8.2k views
                  </span>

                  <span className="text-violet-300">
                    +12%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              rounded-sm
              p-6
            "
          >
            <h2 className="mb-8">
              Engagement
            </h2>

            <div className="space-y-5">
              <div
                className="
                  flex
                  justify-between
                  text-white/60
                "
              >
                <span>Views</span>
                <span>145.2k</span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  text-white/60
                "
              >
                <span>Comments</span>
                <span>2.4k</span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  text-white/60
                "
              >
                <span>Likes</span>
                <span>8.7k</span>
              </div>
            </div>

            <div
              className="
                mt-8
                h-40
                rounded-sm
                bg-gradient-to-br
                from-violet-500/20
                to-orange-400/20
                border
                border-white/10
                flex
                flex-col
                items-center
                justify-center
              "
            >
              <h2
                className="
                  text-5xl
                  font-light
                "
              >
                +32%
              </h2>

              <p
                className="
                  text-sm
                  text-white/40
                  mt-2
                "
              >
                vs last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}