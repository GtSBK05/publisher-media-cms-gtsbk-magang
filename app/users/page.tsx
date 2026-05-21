"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function UsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [logs, setLogs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [role, setRole] =
    useState("");    

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const payload =
        JSON.parse(
            atob(
            token!.split(".")[1]
            )
        );

    setRole(payload.role);        
        
      const [usersRes, logsRes] =
        await Promise.all([
          fetch("/api/users", {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }),

          fetch(
            "/api/activity-logs",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),
        ]);

      const usersData =
        await usersRes.json();

      const logsData =
        await logsRes.json();

      setUsers(
        Array.isArray(usersData)
          ? usersData
          : []
      );

      setLogs(
        Array.isArray(logsData)
          ? logsData
          : []
      );

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  async function handleEditUser(
    user: any
  ) {
    try {
      const choice = prompt(
        `
  1 = Name
  2 = Email
  3 = Role
        `
      );

      if (!choice) {
        return;
      }

      let body: any = {
        isActive:
          user.isActive,
      };

      if (choice === "1") {
        const name = prompt(
          "New name",
          user.name
        );

        if (!name) return;

        body = {
          ...body,
          name,
          email: user.email,
          role: user.role,
        };
      }

      else if (
        choice === "2"
      ) {
        const email = prompt(
          "New email",
          user.email
        );

        if (!email) return;

        body = {
          ...body,
          name: user.name,
          email,
          role: user.role,
        };
      }

      else if (
        choice === "3"
      ) {
        const roleChoice = prompt(
          `
  Select Role

  1 = ADMIN
  2 = EDITOR
  3 = WRITER
          `
        );

        if (!roleChoice) {
          return;
        }

        let selectedRole =
          user.role;

        if (
          roleChoice === "1"
        ) {
          selectedRole =
            "ADMIN";
        }

        else if (
          roleChoice === "2"
        ) {
          selectedRole =
            "EDITOR";
        }

        else if (
          roleChoice === "3"
        ) {
          selectedRole =
            "WRITER";
        }

        else {
          alert(
            "Invalid role"
          );

          return;
        }

        body = {
          ...body,
          name: user.name,
          email: user.email,
          role: selectedRole,
        };
      }

      else {
        alert(
          "Invalid option"
        );

        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        `/api/users/${user.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            body
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id
            ? data
            : item
        )
      );

      alert(
        "User updated"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Update failed"
      );
    }
  } 

  async function handleDeactivate(
    user: any
    ) {
    try {
        const token =
        localStorage.getItem(
            "token"
        );

        const res = await fetch(
        `/api/users/${user.id}`,
        {
            method: "PATCH",

            headers: {
            "Content-Type":
                "application/json",

            Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
            ...user,
            isActive:
                !user.isActive,
            }),
        }
        );

        const data =
        await res.json();

        if (!res.ok) {
        alert(data.error);
        return;
        }

        setUsers((prev) =>
        prev.map((item) =>
            item.id === user.id
            ? data
            : item
        )
        );

    } catch (error) {
        console.error(error);
    }
    }    

  function formatAction(
    action: string
  ) {
    switch (action) {
      case "CREATE_ARTICLE":
        return "created an article";

      case "UPDATE_ARTICLE":
        return "updated an article";

      case "DELETE_ARTICLE":
        return "deleted an article";

      case "PUBLISH_ARTICLE":
        return "published an article";

      default:
        return action;
    }
  }

  function formatTimeAgo(
    date: string
  ) {
    const seconds =
      Math.floor(
        (
          new Date().getTime() -
          new Date(date).getTime()
        ) / 1000
      );

    const minutes =
      Math.floor(
        seconds / 60
      );

    const hours =
      Math.floor(
        minutes / 60
      );

    const days =
      Math.floor(
        hours / 24
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${
        minutes > 1 ? "s" : ""
      } ago`;
    }

    if (hours < 24) {
      return `${hours} hour${
        hours > 1 ? "s" : ""
      } ago`;
    }

    return `${days} day${
      days > 1 ? "s" : ""
    } ago`;
  }    

  if (loading) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="mb-6">
            <h1
              className="
                text-3xl
                font-light
              "
            >
              User Management
            </h1>

            <p
              className="
                text-sm
                text-white/40
                mt-2
              "
            >
              Manage team members
              and permissions
            </p>
          </div>

          <div className="mb-5">
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              className="
                w-full
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
                    User
                  </th>

                {role === "ADMIN" && (
                <th className="font-normal">
                    Email
                </th>
                )}

                  <th className="font-normal">
                    Role
                  </th>

                  <th className="font-normal">
                    Articles
                  </th>

                {role === "ADMIN" && (
                <th className="font-normal">
                    Status
                </th>
                )}

                {role === "ADMIN" && (
                <th className="font-normal">
                    Actions
                </th>
                )}
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/[0.02]
                    "
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-9
                            h-9
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
                          {user.name
                            ?.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {role === "ADMIN" && (
                    <td
                        className="
                        text-sm
                        text-white/50
                        "
                    >
                        {user.email}
                    </td>
                    )}

                    <td>
                      <span
                        className={`
                          px-3
                          py-1
                          text-xs
                          rounded-full
                          border
                          ${
                            user.role ===
                            "ADMIN"
                              ? `
                                bg-orange-500/10
                                border-orange-500/20
                                text-orange-300
                              `
                              : user.role ===
                                "EDITOR"
                              ? `
                                bg-violet-500/10
                                border-violet-500/20
                                text-violet-300
                              `
                              : `
                                bg-yellow-500/10
                                border-yellow-500/20
                                text-yellow-300
                              `
                          }
                        `}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td
                      className="
                        text-sm
                        text-white/60
                      "
                    >
                      {
                        user._count
                          ?.articles
                      }
                    </td>

                    {role === "ADMIN" && (
                    <td>
                    <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        border
                        ${
                        user.isActive
                            ? `
                            bg-green-500/10
                            border-green-500/20
                            text-green-300
                            `
                            : `
                            bg-red-500/10
                            border-red-500/20
                            text-red-300
                            `
                        }
                    `}
                    >
                    {user.isActive
                        ? "Active"
                        : "Deactivated"}
                    </span>
                    </td>
                    )}

                    {role === "ADMIN" && (
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
                            handleEditUser(
                            user
                            )
                        }
                        className="
                            hover:text-violet-400
                        "
                        >
                        ✎
                        </button>

                        <button
                        onClick={() =>
                            handleDeactivate(
                            user
                            )
                        }
                        className="
                            hover:text-orange-400
                        "
                        >
                        ⋯
                        </button>
                        </div>
                    </td>
                    )}
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
              Team Overview
            </h2>

            <div className="space-y-4">
              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >
                <span>
                  Admin
                </span>

                <span>
                  {
                    users.filter(
                      (user) =>
                        user.role ===
                        "ADMIN"
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
                <span>
                  Editor
                </span>

                <span>
                  {
                    users.filter(
                      (user) =>
                        user.role ===
                        "EDITOR"
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
                <span>
                  Writer
                </span>

                <span>
                  {
                    users.filter(
                      (user) =>
                        user.role ===
                        "WRITER"
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>

        {role === "ADMIN" && (
          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              p-6
            "
          >
            <h2 className="mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {logs
                .slice(0, 5)
                .map((log) => (
                  <div
                    key={log.id}
                    className="
                      border-b
                      border-white/5
                      pb-4
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-white
                        leading-6
                      "
                    >
                      {log.user?.name}{" "}
                      {formatAction(
                        log.action
                      )}

                      {log.article && (
                        <>
                          {" "}
                          "
                          {
                            log.article.title
                          }
                          "
                        </>
                      )}
                    </p>

                    <p
                      className="
                        text-xs
                        text-white/40
                        mt-2
                      "
                    >
                      {formatTimeAgo(
                        log.createdAt
                      )}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
}