"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CategoriesPage() {
  const [
    categories,
    setCategories,
  ] = useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCreate() {
    if (!name.trim()) {
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        "/api/categories",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setCategories((prev) => [
        data,
        ...prev,
      ]);

      setName("");

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      confirm(
        "Delete category?"
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
        `/api/categories/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data =
          await res.json();

        alert(data.error);

        return;
      }

      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.id !== id
        )
      );

    } catch (error) {
      console.error(error);
    }
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
          <p
            className="
              text-sm
              text-white/40
              mb-2
            "
          >
            CONTENT
          </p>

          <h1
            className="
              text-4xl
              font-light
            "
          >
            Categories
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <div
            className="
              bg-[#12121a]
              border
              border-white/5
              p-6
              space-y-5
            "
          >
            <h2
              className="
                text-lg
                font-light
              "
            >
              Create Category
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Category name..."
              className="
                w-full
                h-12
                bg-black/20
                border
                border-white/10
                px-4
                outline-none
                focus:border-violet-500
              "
            />

            <button
              onClick={
                handleCreate
              }
              disabled={loading}
              className="
                w-full
                h-12
                bg-gradient-to-r
                from-violet-500
                to-orange-400
                text-sm
              "
            >
              {loading
                ? "Creating..."
                : "Create Category"}
            </button>
          </div>
        </div>

        <div className="col-span-8">
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
                    Name
                  </th>

                  <th className="font-normal">
                    Total Articles
                  </th>

                  <th className="font-normal">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map(
                  (category) => (
                    <tr
                      key={
                        category.id
                      }
                      className="
                        border-b
                        border-white/5
                      "
                    >
                      <td className="p-5">
                        {
                          category.name
                        }
                      </td>

                      <td>
                        {
                          category
                            ._count
                            ?.articles ||
                            0
                        }
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            handleDelete(
                              category.id
                            )
                          }
                          className="
                            text-white/40
                            hover:text-red-400
                            transition
                          "
                        >
                          ⌫
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}