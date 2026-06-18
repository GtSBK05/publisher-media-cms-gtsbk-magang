import DesktopOnlyGuard from "@/components/auth/DesktopOnlyGuard";
import Sidebar from "./Sidebar";
import UserDropdown from "./UserDropdown";

export default function DashboardLayout({
  children,
  title = "Editorial Workspace",
  subtitle = "Content Archive Publisher",
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
  <DesktopOnlyGuard>
    <main
      className="
        min-h-screen
        bg-[#111318]
        text-white
        flex
        overflow-hidden
        relative
      "
    >
      <div
        className="
          absolute
          top-[-200px]
          right-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-violet-500/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-200px]
          left-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-orange-400/10
          blur-3xl
          pointer-events-none
        "
      />

      <Sidebar />

      <section
        className="
          flex-1
          relative
          overflow-y-auto
        "
      >
        <div
          className="
            min-h-screen
            p-5
            md:p-7
          "
        >
          <div
            className="
              min-h-[calc(100vh-56px)]
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              overflow-visible
              relative
              shadow-2xl
              shadow-black/30
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-violet-500/[0.03]
                via-transparent
                to-orange-400/[0.03]
                pointer-events-none
              "
            />

            <div
              className="
                relative
                z-50
                border-b
                border-white/10
                px-8
                py-5

                grid
                grid-cols-3
                items-center

                backdrop-blur-xl
                bg-black/10
              "
            >
              <div>
                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.35em]
                    text-violet-300
                    mb-1
                  "
                >
                  {subtitle}
                </p>

                <h1
                  className="
                    text-lg
                    text-white/90
                  "
                >
                  {title}
                </h1>
              </div>

              <div
                className="
                  flex
                  justify-center
                "
              >
                <a
                  href="/wiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-5
                    h-11

                    flex
                    items-center

                    rounded-xl

                    border
                    border-violet-500/30

                    bg-violet-500/10

                    text-violet-300

                    hover:bg-violet-500/20
                    hover:border-violet-500/50

                    transition
                  "
                >
                  Wiki
                </a>
              </div>

              <div
                className="
                  flex
                  justify-end
                "
              >
                <UserDropdown />
              </div>
            </div>

            <div
              className="
                relative
                z-10
                p-8
              "
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  </DesktopOnlyGuard>
  );
}