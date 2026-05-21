"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      label: "Dashboard",
      icon: "◫",
      href: "/dashboard",
    },

    {
      label: "Articles",
      icon: "≣",
      href: "/articles",
    },

    {
      label: "Editor",
      icon: "✎",
      href: "/articles/editor",
    },

    {
      label: "Analytics",
      icon: "⌁",
      href: "/analytics",
    },

    {
      label: "Users",
      icon: "☰",
      href: "/users",
    },
  ];

  return (
    <aside
      className="
        w-20
        border-r
        border-white/5
        flex
        flex-col
        justify-between
        items-center
        py-6
        bg-[#0a0a10]
      "
    >
      <div className="space-y-5">
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-br
            from-violet-500
            to-orange-400
            flex
            items-center
            justify-center
            text-sm
          "
        >
          P
        </div>

        {menus.map((menu) => {
          const active =
            pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                transition
                ${
                  active
                    ? `
                      bg-violet-500/15
                      border
                      border-violet-500/20
                      text-violet-300
                    `
                    : `
                      text-white/40
                      hover:bg-white/5
                    `
                }
              `}
            >
              {menu.icon}
            </Link>
          );
        })}
      </div>

      <button
        className="
          w-10
          h-10
          rounded-xl
          border
          border-white/10
          flex
          items-center
          justify-center
          text-white/40
          hover:bg-white/5
          transition
        "
      >
        ⚙
      </button>
    </aside>
  );
}