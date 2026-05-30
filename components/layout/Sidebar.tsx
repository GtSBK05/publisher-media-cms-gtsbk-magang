"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname =
    usePathname();

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
        w-[260px]
        border-r
        border-white/10
        bg-black/20
        backdrop-blur-2xl
        relative
        overflow-hidden
        flex
        flex-col
      "
    >
      <div
        className="
          absolute
          top-[-80px]
          left-[-80px]
          w-[220px]
          h-[220px]
          rounded-full
          bg-violet-500/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          relative
          z-10
          p-6
          flex-1
          overflow-y-auto
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
            mb-10
          "
        >
          <div
            className="
              w-14
              h-14
              rounded-[20px]
              bg-gradient-to-br
              from-violet-500
              to-orange-400
              flex
              items-center
              justify-center
              text-lg
              shadow-xl
              shadow-violet-500/20
            "
          >
            P
          </div>

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-white/30
                mb-1
              "
            >
              Community
            </p>

            <h1
              className="
                text-lg
                text-white/90
              "
            >
              Archive CMS
            </h1>
          </div>
        </div>

        <div
          className="
            space-y-2
          "
        >
          {menus.map((menu) => {
            const active =
              pathname ===
              menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-4
                  transition-all
                  duration-300
                  border
                  overflow-hidden
                  ${
                    active
                      ? `
                        border-violet-500/20
                        bg-gradient-to-r
                        from-violet-500/15
                        to-orange-400/10
                      `
                      : `
                        border-transparent
                        hover:border-white/10
                        hover:bg-white/[0.03]
                      `
                  }
                `}
              >
                <div
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-sm
                    transition
                    ${
                      active
                        ? `
                          bg-violet-500/20
                          text-violet-300
                        `
                        : `
                          bg-white/[0.03]
                          text-white/40
                          group-hover:text-orange-300
                        `
                    }
                  `}
                >
                  {menu.icon}
                </div>

                <div>
                  <p
                    className={`
                      text-sm
                      transition
                      ${
                        active
                          ? `
                            text-white
                          `
                          : `
                            text-white/60
                            group-hover:text-white
                          `
                      }
                    `}
                  >
                    {menu.label}
                  </p>
                </div>

                {active && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      bottom-0
                      w-[3px]
                      bg-gradient-to-b
                      from-violet-500
                      to-orange-400
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className="
          relative
          z-10
          p-6
          border-t
          border-white/10
          bg-black/10
        "
      >
        <button
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-4
            py-4
            flex
            items-center
            justify-between
            text-white/50
            hover:border-orange-400/20
            hover:text-orange-300
            transition
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span>
              ⚙
            </span>

            <span
              className="
                text-sm
              "
            >
              System Settings
            </span>
          </div>

          <span
            className="
              text-white/20
            "
          >
            →
          </span>
        </button>
      </div>
    </aside>
  );
}