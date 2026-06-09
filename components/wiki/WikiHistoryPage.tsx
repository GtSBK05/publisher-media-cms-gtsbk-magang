export default function WikiHistoryPage({
  article,
  revisions,
}: any) {
  return (
    <div>
      <div className="mb-10">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-violet-300
            mb-3
          "
        >
          Revision History
        </p>

        <h1
          className="
            text-5xl
            font-light
          "
        >
          {article.title}
        </h1>
      </div>

      <div className="space-y-4">
        {revisions.map(
          (revision: any) => (
            <div
              key={revision.id}
              className="
                rounded-3xl

                border
                border-white/10

                bg-white/[0.03]

                p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
                "
              >
                <div>
                  <h3 className="text-lg">
                    Version {
                      revision.baseVersion
                    }
                  </h3>

                  <p
                    className="
                      text-sm
                      text-white/40
                    "
                  >
                    {
                      revision.author
                        ?.name
                    }
                  </p>
                </div>

                <span
                  className={`
                    px-4
                    py-2

                    rounded-full

                    text-xs

                    ${
                      revision.status ===
                      "APPROVED"
                        ? `
                          bg-green-500/10
                          text-green-300
                        `
                        : revision.status ===
                          "REJECTED"
                        ? `
                          bg-red-500/10
                          text-red-300
                        `
                        : revision.status ===
                          "OUTDATED"
                        ? `
                          bg-orange-500/10
                          text-orange-300
                        `
                        : `
                          bg-violet-500/10
                          text-violet-300
                        `
                    }
                  `}
                >
                  {revision.status}
                </span>
              </div>

              {revision.summary && (
                <p
                  className="
                    text-white/60
                    mb-4
                  "
                >
                  {
                    revision.summary
                  }
                </p>
              )}

              <div
                className="
                  flex
                  justify-between

                  text-xs
                  text-white/40
                "
              >
                <span>
                  {new Date(
                    revision.createdAt
                  ).toLocaleString()}
                </span>

                {revision.approvedAt && (
                  <span>
                    Approved{" "}
                    {new Date(
                      revision.approvedAt
                    ).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}