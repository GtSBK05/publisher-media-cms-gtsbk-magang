"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
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

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1
          className="
            text-4xl
            font-light
            text-white
          "
        >
          Analytics
        </h1>
      </div>

      <div className="space-y-6">
        <div
          className="
            grid
            grid-cols-4
            gap-6
          "
        >
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
            <p
              className="
                text-sm
                text-white/40
              "
            >
              Average Health
            </p>

            <h2
              className="
                text-5xl
                font-light
                mt-5
                text-white
              "
            >
              {
                data.averageHealth
              }
            </h2>
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
            <p
              className="
                text-sm
                text-white/40
              "
            >
              Published Ratio
            </p>

            <h2
              className="
                text-5xl
                font-light
                mt-5
                text-orange-300
              "
            >
              {
                data.publishRatio
              }%
            </h2>
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
            <p
              className="
                text-sm
                text-white/40
              "
            >
              Top Category
            </p>

            <h2
              className="
                text-3xl
                font-light
                mt-6
                text-violet-300
              "
            >
              {
                data.topCategory
              }
            </h2>
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
            <p
              className="
                text-sm
                text-white/40
              "
            >
              Active Writers
            </p>

            <h2
              className="
                text-5xl
                font-light
                mt-5
                text-white
              "
            >
              {
                data.activeWriters
              }
            </h2>
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
          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-light
                  text-white
                "
              >
                Publishing Trend
              </h2>

              <p
                className="
                  text-sm
                  text-white/40
                  mt-1
                "
              >
                Articles created
                over time
              </p>
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={
                  data.trendData
                }
              >
                <XAxis
                  dataKey="date"
                  stroke="#777"
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "rgba(20,20,28,0.95)",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius:
                      "18px",
                    backdropFilter:
                      "blur(20px)",
                    color:
                      "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="articles"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-12
            gap-6
          "
        >
          <div className="col-span-7">
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
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-8
                "
              >
                <div>
                  <h2
                    className="
                      text-xl
                      font-light
                      text-white
                    "
                  >
                    Category
                    Distribution
                  </h2>

                  <p
                    className="
                      text-sm
                      text-white/40
                      mt-1
                    "
                  >
                    Most used content
                    categories
                  </p>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={
                      data.categoryData
                    }
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#777"
                    />

                    <Tooltip
                      contentStyle={{
                        background:
                          "rgba(20,20,28,0.95)",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        borderRadius:
                          "18px",
                        backdropFilter:
                          "blur(20px)",
                        color:
                          "#fff",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      fill="#f97316"
                      radius={[
                        10,
                        10,
                        0,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border
                border-white/10
                rounded-[32px]
                p-6
                h-full
                shadow-xl
                shadow-black/20
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  mb-8
                  text-white
                "
              >
                Top Writers
              </h2>

              <div className="space-y-6">
                {data.topWriters.map(
                  (
                    writer: any
                  ) => (
                    <div
                      key={
                        writer.id
                      }
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-gradient-to-br
                            from-violet-500
                            to-orange-400
                            flex
                            items-center
                            justify-center
                            text-xs
                            shadow-lg
                            shadow-violet-500/20
                          "
                        >
                          {writer.name?.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <p className="text-sm text-white">
                            {
                              writer.name
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
                              writer.role
                            }
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          text-sm
                          text-white/60
                        "
                      >
                        {
                          writer
                            ._count
                            .articles
                        }{" "}
                        articles
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}