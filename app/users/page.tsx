"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  paginate,
} from "@/lib/pagination";

export default function UsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [logs, setLogs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const usersPerPage =
    10;    

  const [role, setRole] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("ALL");

  const [sortField, setSortField] =
    useState("name");

  const [sortDirection, setSortDirection] =
    useState("asc");    

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<any>(null);

  const [
    editName,
    setEditName,
  ] = useState("");

  const [
    editEmail,
    setEditEmail,
  ] = useState("");

  const [
    editRole,
    setEditRole,
  ] = useState("");

  const [
    editActive,
    setEditActive,
  ] = useState(true);

  const [
    savingUser,
    setSavingUser,
  ] = useState(false);    

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    roleFilter,
  ]);  

  async function fetchData() {
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
        window.location.href =
          "/login";

        return;
      }

      const payload =
        JSON.parse(
          atob(
            token.split(".")[1]
          )
        );

      setRole(
        payload.role
      );

      const [
        usersRes,
        logsRes,
      ] = await Promise.all([
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

      if (
        usersRes.status === 401 ||
        logsRes.status === 401
      ) {
        localStorage.removeItem(
          "token"
        );

        window.location.href =
          "/login";

        return;
      }

      const usersData =
        await usersRes.json();

      const logsData =
        await logsRes.json();

      setUsers(
        Array.isArray(
          usersData
        )
          ? usersData
          : []
      );

      setLogs(
        Array.isArray(
          logsData
        )
          ? logsData
          : []
      );

    } catch (error) {
      console.error(error);

      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/login";

    } finally {
      setLoading(false);
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
          item.id ===
          user.id
            ? data
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }
  }

  function openEditModal(
    user: any
  ) {
    setSelectedUser(user);

    setEditName(user.name);

    setEditEmail(
      user.email
    );

    setEditRole(
      user.role
    );

    setEditActive(
      user.isActive
    );
  }

  async function saveUserEdit() {
    try {
      setSavingUser(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        `/api/users/${selectedUser.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: editName,
            email: editEmail,
            role: editRole,
            isActive:
              editActive,
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
          item.id ===
          selectedUser.id
            ? data
            : item
        )
      );

      setSelectedUser(null);

    } catch (error) {
      console.error(error);

    } finally {
      setSavingUser(false);
    }
  }  

  function formatAction(
    action: string
  ) {
    switch (action) {
      case "CREATE_ARTICLE":
        return "created an article";

      case "CREATE_REVISION":
        return "submitted a revision";        

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
          new Date(
            date
          ).getTime()
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
        minutes > 1
          ? "s"
          : ""
      } ago`;
    }

    if (hours < 24) {
      return `${hours} hour${
        hours > 1
          ? "s"
          : ""
      } ago`;
    }

    return `${days} day${
      days > 1
        ? "s"
        : ""
    } ago`;
  }

  const processedUsers =
    users
      .filter((user) => {
        const keyword =
          search.toLowerCase();

        const matchSearch =
          user.name
            ?.toLowerCase()
            .includes(keyword) ||

          user.email
            ?.toLowerCase()
            .includes(keyword) ||

          user.role
            ?.toLowerCase()
            .includes(keyword);

        const matchRole =
          roleFilter === "ALL"
            ? true
            : user.role ===
              roleFilter;

        return (
          matchSearch &&
          matchRole
        );
      })
      .sort((a, b) => {
        let result = 0;

        if (sortField === "name") {
          result =
            a.name.localeCompare(
              b.name
            );
        }

        if (sortField === "email") {
          result =
            a.email.localeCompare(
              b.email
            );
        }

        if (sortField === "role") {
          result =
            a.role.localeCompare(
              b.role
            );
        }

        if (
          sortField ===
          "articles"
        ) {
          result =
            (a._count?.articles ||
              0) -
            (b._count?.articles ||
              0);
        }

        return sortDirection ===
          "asc"
          ? result
          : -result;
      });  

  const {
    data: filteredUsers,
    totalPages:
      userTotalPages,
  } = paginate(
    processedUsers,
    currentPage,
    usersPerPage
  );      

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
                text-white
              "
            >
              User Management
            </h1>
          </div>

          <div
            className="
              flex
              gap-3
              mb-5
            "
          >
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search users..."
              className="
                flex-1
                h-12
                bg-white/[0.04]
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                px-4
                text-sm
                text-white
                outline-none
                focus:border-violet-500/40
              "
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
              className="
                h-12
                px-4
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                text-white
                text-sm
                outline-none
              "
            >
              <option
                value="ALL"
                className="bg-[#171a20]"
              >
                All Roles
              </option>

              <option
                value="ADMIN"
                className="bg-[#171a20]"
              >
                Admin
              </option>

              <option
                value="EDITOR"
                className="bg-[#171a20]"
              >
                Editor
              </option>

              <option
                value="WRITER"
                className="bg-[#171a20]"
              >
                Writer
              </option>
            </select>
          </div>

          <div
            className="
              bg-white/[0.04]
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[32px]
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
                          "name"
                        );

                        setSortDirection(
                          sortDirection ===
                          "asc"
                            ? "desc"
                            : "asc"
                        );
                      }}
                    >
                      User ↕
                    </th>

                  {role ===
                    "ADMIN" && (
                    <th
                      className="
                        font-normal
                        cursor-pointer
                        hover:text-violet-300
                      "
                      onClick={() => {
                        setSortField(
                          "email"
                        );

                        setSortDirection(
                          sortDirection ===
                          "asc"
                            ? "desc"
                            : "asc"
                        );
                      }}
                    >
                      Email ↕
                    </th>
                  )}

                  <th className="font-normal">
                    Role
                  </th>

                    <th
                      className="
                        font-normal
                        cursor-pointer
                        hover:text-violet-300
                      "
                      onClick={() => {
                        setSortField(
                          "articles"
                        );

                        setSortDirection(
                          sortDirection ===
                          "asc"
                            ? "desc"
                            : "asc"
                        );
                      }}
                    >
                      Articles ↕
                    </th>

                  {role ===
                    "ADMIN" && (
                    <th className="font-normal">
                      Status
                    </th>
                  )}

                  {role ===
                    "ADMIN" && (
                    <th className="font-normal">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(
                  (user) => (
                    <tr
                      key={
                        user.id
                      }
                      className="
                        border-b
                        border-white/10
                        hover:bg-white/[0.03]
                        transition
                      "
                    >
                      <td className="p-5">
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <div>
                            <p className="text-sm text-white">
                              {
                                user.name
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      {role ===
                        "ADMIN" && (
                        <td
                          className="
                            text-sm
                            text-white/50
                          "
                        >
                          {
                            user.email
                          }
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
                          {
                            user.role
                          }
                        </span>
                      </td>

                      <td
                        className="
                          text-sm
                          text-white/60
                        "
                      >
                        {
                          user
                            ._count
                            ?.articles
                        }
                      </td>

                      {role ===
                        "ADMIN" && (
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

                      {role ===
                        "ADMIN" && (
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
                                openEditModal(
                                  user
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
                                handleDeactivate(
                                  user
                                )
                              }
                              className="
                                hover:text-orange-400
                                transition
                              "
                            >
                              ⋯
                            </button>
                          </div>
                        </td>
                      )}
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
                  userTotalPages,
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
              rounded-[32px]
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
                <span className="text-white/70">
                  Admin
                </span>

                <span className="text-white/40">
                  {
                    users.filter(
                      (
                        user
                      ) =>
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
                <span className="text-violet-300">
                  Editor
                </span>

                <span className="text-violet-300">
                  {
                    users.filter(
                      (
                        user
                      ) =>
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
                <span className="text-orange-300">
                  Writer
                </span>

                <span className="text-orange-300">
                  {
                    users.filter(
                      (
                        user
                      ) =>
                        user.role ===
                        "WRITER"
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>

          {role ===
            "ADMIN" && (
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
                  mb-6
                  text-white
                "
              >
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
                        border-white/10
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
                        {
                          log.user
                            ?.name
                        }{" "}
                        {formatAction(
                          log.action
                        )}

                        {log.article && (
                          <>
                            {" "}
                            "
                            {
                              log
                                .article
                                .title
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
    {selectedUser && (
      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/70
          backdrop-blur-md
          flex
          items-center
          justify-center
          p-6
        "
      >
        <div
          className="
            w-full
            max-w-xl
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
                USER EDITOR
              </p>

              <h2
                className="
                  text-3xl
                  font-light
                  text-white
                "
              >
                Edit User
              </h2>
            </div>

            <button
              onClick={() =>
                setSelectedUser(
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

          <div className="space-y-5">
            <div>
              <label
                className="
                  text-xs
                  text-white/50
                  block
                  mb-2
                "
              >
                Name
              </label>

              <input
                type="text"
                value={editName}
                onChange={(e) =>
                  setEditName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12
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
                Email
              </label>

              <input
                type="email"
                value={editEmail}
                onChange={(e) =>
                  setEditEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12
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
                Role
              </label>

              <select
                value={editRole}
                onChange={(e) =>
                  setEditRole(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12
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
              >
                <option value="ADMIN">
                  ADMIN
                </option>

                <option value="EDITOR">
                  EDITOR
                </option>

                <option value="WRITER">
                  WRITER
                </option>
              </select>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                bg-white/[0.03]
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    text-white
                  "
                >
                  Account Status
                </p>

                <p
                  className="
                    text-xs
                    text-white/40
                    mt-1
                  "
                >
                  Enable or disable
                  account access
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditActive(
                    !editActive
                  )
                }
                className={`
                  w-16
                  h-9
                  rounded-full
                  transition
                  relative
                  ${
                    editActive
                      ? `
                        bg-gradient-to-r
                        from-violet-500
                        to-orange-400
                      `
                      : `
                        bg-white/10
                      `
                  }
                `}
              >
                <div
                  className={`
                    absolute
                    top-1
                    w-7
                    h-7
                    rounded-full
                    bg-white
                    transition
                    ${
                      editActive
                        ? `
                          right-1
                        `
                        : `
                          left-1
                        `
                    }
                  `}
                />
              </button>
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
                setSelectedUser(
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
              Cancel
            </button>

            <button
              onClick={
                saveUserEdit
              }
              disabled={
                savingUser
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
              {savingUser
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    )}      
    </DashboardLayout>
  );
}