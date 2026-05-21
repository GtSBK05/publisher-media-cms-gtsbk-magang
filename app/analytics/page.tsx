"use client";

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
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        "/api/analytics",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

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
          "
        >
          Analytics
        </h1>

        <p
          className="
            text-sm
            text-white/40
            mt-2
          "
        >
          Editorial insights and
          publishing performance
        </p>
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
              bg-[#12121a]
              border
              border-white/5
              p-6
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
              "
            >
              {
                data.averageHealth
              }
            </h2>
          </div>

          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              p-6
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
              bg-[#12121a]
              border
              border-white/5
              p-6
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
              bg-[#12121a]
              border
              border-white/5
              p-6
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
            bg-[#12121a]
            border
            border-white/5
            p-6
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
                  stroke="#666"
                />

                <Tooltip />

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
                bg-[#12121a]
                border
                border-white/5
                p-6
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
                      stroke="#666"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#f97316"
                      radius={[
                        6,
                        6,
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
                bg-[#12121a]
                border
                border-white/5
                p-6
                h-full
              "
            >
              <h2
                className="
                  text-xl
                  font-light
                  mb-8
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
                      key={writer.id}
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
                          "
                        >
                          {writer.name?.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <p className="text-sm">
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
                          writer._count
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