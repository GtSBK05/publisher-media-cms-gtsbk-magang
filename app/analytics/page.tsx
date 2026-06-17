"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      window.location.href =
        "/login";

      return;
    }

    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (
        !token ||
        token === "undefined" ||
        token === "null"
      ) {
        return;
      }

      const res = await fetch(
        "/api/analytics",
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

        window.location.href =
          "/login";

        return;
      }

      const result =
        await res.json();

      setData(result);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) {
    return null;
  }

  const cards = [
    {
      title:
        "Total Articles",

      value:
        data.totalArticles,
    },

    {
      title:
        "Total Views",

      value:
        data.totalViews,
    },

    {
      title:
        "Total Categories",

      value:
        data.totalCategories,
    },

    {
      title:
        "Active Contributors",

      value:
        data.activeContributors,
    },
  ];

  const chartColors = [
    "#8b5cf6",
    "#f97316",
    "#14b8a6",
    "#ec4899",
    "#facc15",
  ];

  return (
        <DashboardLayout
      title="Wiki Analytics"
      subtitle="Content Archive Publisher"
    >
      <div className="space-y-6">

        <div
          className="
            grid
            grid-cols-4
            gap-6
          "
        >
          {cards.map((card) => (
            <div
              key={card.title}
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
              <p
                className="
                  text-sm
                  text-white/40
                "
              >
                {card.title}
              </p>

              <h2
                className="
                  text-5xl
                  font-light
                  mt-5
                  text-white
                "
              >
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        <div
          className="
            grid
            grid-cols-12
            gap-6
          "
        >
          <div className="col-span-6">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                  mb-8
                "
              >
                Category Distribution
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={
                      data.categoryDistribution
                    }
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#777"
                    />

                    <YAxis
                      stroke="#777"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#8b5cf6"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                  mb-8
                "
              >
                Views by Category
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={
                      data.viewsByCategory
                    }
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#777"
                    />

                    <YAxis
                      stroke="#777"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="views"
                      fill="#f97316"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-12
            gap-6
          "
        >
          <div className="col-span-6">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                  mb-8
                "
              >
                Content Status
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={
                        data.statusDistribution
                      }
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                    >
                      {data.statusDistribution.map(
                        (
                          _: any,
                          index: number
                        ) => (
                          <Cell
                            key={index}
                            fill={
                              chartColors[
                                index %
                                  chartColors.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                  mb-8
                "
              >
                Contributor Roles
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={
                        data.roleDistribution
                      }
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                    >
                      {data.roleDistribution.map(
                        (
                          _: any,
                          index: number
                        ) => (
                          <Cell
                            key={index}
                            fill={
                              chartColors[
                                index %
                                  chartColors.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
                <div
          className="
            grid
            grid-cols-12
            gap-6
          "
        >
          <div className="col-span-6">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                  mb-8
                "
              >
                Top Contributors
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    layout="vertical"
                    data={
                      data.topContributors
                    }
                  >
                    <XAxis
                      type="number"
                      stroke="#777"
                    />

                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#777"
                      width={100}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="articles"
                      fill="#8b5cf6"
                      radius={[
                        0,
                        8,
                        8,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                  mb-8
                "
              >
                Most Viewed Articles
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    layout="vertical"
                    data={
                      data.mostViewedArticles
                    }
                  >
                    <XAxis
                      type="number"
                      stroke="#777"
                    />

                    <YAxis
                      type="category"
                      dataKey="title"
                      stroke="#777"
                      width={140}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="views"
                      fill="#f97316"
                      radius={[
                        0,
                        8,
                        8,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            bg-white/[0.04]
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[32px]
            p-6
            shadow-xl
            shadow-black/20
          "
        >
          <div className="mb-8">
            <h2
              className="
                text-xl
                font-light
                text-white
              "
            >
              View Distribution
            </h2>

            <p
              className="
                text-sm
                text-white/40
                mt-1
              "
            >
              Distribution of
              article views
            </p>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={
                  data.viewDistribution
                }
              >
                <XAxis
                  dataKey="range"
                  stroke="#777"
                />

                <YAxis
                  stroke="#777"
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#14b8a6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}