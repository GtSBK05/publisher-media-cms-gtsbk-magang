import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
              overflow-hidden
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
                z-10
                border-b
                border-white/10
                px-8
                py-5
                flex
                items-center
                justify-between
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
                  Community Archive
                </p>

                <h1
                  className="
                    text-lg
                    text-white/90
                  "
                >
                  Editorial Workspace
                </h1>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    px-4
                    h-10
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-sm
                    text-white/50
                  "
                >
                  <span
                    className="
                      text-orange-300
                    "
                  >
                    ●
                  </span>

                  Archive Online
                </div>

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
                    text-sm
                    shadow-lg
                    shadow-violet-500/20
                  "
                >
                  A
                </div>
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
  );
}