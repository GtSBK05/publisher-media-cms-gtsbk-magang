"use client";

import {
  useState,
} from "react";

interface Props {
  block: any;
}

export default function WikiBlockEditor({
  block,
}: Props) {
  const [
    open,
    setOpen,
  ] = useState(false);

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
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          px-3
          py-2

          rounded-xl

          bg-violet-500

          text-sm
        "
      >
        Edit
      </button>

      {open && (
        <div
          className="
            fixed
            inset-0

            bg-black/70

            z-[999]
          "
        >
          <div
            className="
              absolute

              left-1/2
              top-1/2

              -translate-x-1/2
              -translate-y-1/2

              w-[900px]
              max-w-[95vw]

              rounded-3xl

              bg-[#181a20]

              border
              border-white/10

              p-6
            "
          >
            <h2
              className="
                text-2xl
                mb-6
              "
            >
              Edit Block
            </h2>

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
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
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              className="
                w-full
                h-[300px]

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

                mt-6
              "
            >
              <button
                onClick={() =>
                  setOpen(false)
                }
                className="
                  px-5
                  py-3

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
                  px-5
                  py-3

                  rounded-xl

                  bg-violet-500
                "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}