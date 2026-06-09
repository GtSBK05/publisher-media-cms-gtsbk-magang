"use client";

import {
  useState,
} from "react";

interface Props {
  block: any;

  editingKey:
    string | null;

  setEditingKey: (
    key:
      string | null
  ) => void;

  large?: boolean;
}

export default function WikiBlockInlineEditor({
  block,
  editingKey,
  setEditingKey,
  large = false,
}: Props) {
  const [
    title,
    setTitle,
  ] = useState(
    block.title
  );

  const [
    content,
    setContent,
  ] = useState(
    block.content
  );

  const editing =
    editingKey ===
    block.key;

  async function save() {
    await fetch(
      "/api/wiki-settings/update",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id: block.id,
          title,
          content,
        }),
      }
    );

    location.reload();
  }

  return (
    <div
      className="
        relative

        rounded-[32px]

        border
        border-violet-500/20

        bg-gradient-to-br
        from-violet-500/10
        to-orange-400/10

        backdrop-blur-xl

        p-8
      "
    >
      {!editing ? (
        <>
          <button
            onClick={() =>
              setEditingKey(
                block.key
              )
            }
            className="
              absolute
              top-4
              right-4

              px-4
              py-2

              rounded-xl

              bg-violet-500
            "
          >
            Edit
          </button>

          {large ? (
            <>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.35em]

                  text-violet-300

                  mb-4
                "
              >
                Community Archive
              </p>

              <h1
                className="
                  text-5xl
                  mb-6
                "
              >
                {title}
              </h1>
            </>
          ) : (
            <h3
              className="
                text-orange-400
                mb-3
              "
            >
              {title}
            </h3>
          )}

          <div
            dangerouslySetInnerHTML={{
              __html:
                content,
            }}
          />
        </>
      ) : (
        <>
          <input
            value={title}
            onChange={(
              e
            ) =>
              setTitle(
                e.target
                  .value
              )
            }
            className="
              w-full
              h-12

              rounded-xl

              bg-black/20

              border
              border-white/10

              px-4

              mb-4
            "
          />

          <textarea
            value={content}
            onChange={(
              e
            ) =>
              setContent(
                e.target
                  .value
              )
            }
            rows={10}
            className="
              w-full

              rounded-xl

              bg-black/20

              border
              border-white/10

              p-4
            "
          />

          <div
            className="
              flex
              justify-end

              gap-3

              mt-4
            "
          >
            <button
              onClick={() =>
                setEditingKey(
                  null
                )
              }
              className="
                px-4
                py-2

                rounded-xl

                border
                border-white/10
              "
            >
              Cancel
            </button>

            <button
              onClick={save}
              className="
                px-4
                py-2

                rounded-xl

                bg-violet-500
              "
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}