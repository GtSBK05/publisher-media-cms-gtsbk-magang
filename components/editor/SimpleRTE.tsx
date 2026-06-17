"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit
from "@tiptap/starter-kit";

import Underline
from "@tiptap/extension-underline";

import Link
from "@tiptap/extension-link";

import Image
from "@tiptap/extension-image";

import TextAlign
from "@tiptap/extension-text-align";

import {
  useState,
} from "react";

import imageCompression
from "browser-image-compression";

interface Props {
  content: string;

  onChange: (
    value: string
  ) => void;
}

export default function SimpleRTE({
  content,
  onChange,
}: Props) {

  const [
    showLinkInput,
    setShowLinkInput,
  ] = useState(false);

  const [
    linkUrl,
    setLinkUrl,
  ] = useState("");

  const editor =
    useEditor({
      extensions: [
        StarterKit.configure({
          heading: false,
          blockquote: false,
          bulletList: false,
          orderedList: false,
          listItem: false,
        }),

        Underline,

        Image,

        Link.configure({
          openOnClick: false,
        }),

        TextAlign.configure({
          types: [
            "paragraph",
          ],
        }),
      ],

      content,

      editorProps: {
        attributes: {
          class:
          "min-h-[300px] outline-none text-white leading-8",
        },
      },

      onUpdate: ({
        editor,
      }) => {
        onChange(
          editor.getHTML()
        );
      },
    });

  async function handleImageUpload(
    file: File
  ) {
    try {

      const compressed =
        await imageCompression(
          file,
          {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
            fileType:
              "image/webp",
          }
        );

      const formData =
        new FormData();

      formData.append(
        "file",
        compressed
      );

      const res =
        await fetch(
          "/api/upload-avatar",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.error ||
          "Upload failed"
        );

        return;
      }

      editor
        ?.chain()
        .focus()
        .setImage({
          src: data.url,
        })
        .run();

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Upload failed"
      );
    }
  }

  if (!editor) {
    return null;
  }

  const activeClass =
    `
      border-violet-500
      bg-violet-500/10
      text-white
    `;

  const normalClass =
    `
      border-white/30
      text-white
      hover:bg-orange-400/5
    `;

  return (
    <div
      className="
        border
        border-white/30
        bg-black/20
        rounded-2xl
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          flex-wrap

          p-3

          border-b
          border-white/30
        "
      >
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`
            px-3
            h-9
            border
            text-sm

            ${
              editor.isActive(
                "bold"
              )
                ? activeClass
                : normalClass
            }
          `}
        >
          B
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`
            px-3
            h-9
            border
            text-sm

            ${
              editor.isActive(
                "italic"
              )
                ? activeClass
                : normalClass
            }
          `}
        >
          I
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={`
            px-3
            h-9
            border
            text-sm

            ${
              editor.isActive(
                "underline"
              )
                ? activeClass
                : normalClass
            }
          `}
        >
          U
        </button>

        <select
          defaultValue="left"
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .setTextAlign(
                e.target.value
              )
              .run()
          }
          className="
            h-9
            px-3

            rounded-xl

            border
            border-white/30

            bg-black/20

            text-white
          "
        >
          <option value="left">
            Left
          </option>

          <option value="center">
            Center
          </option>

          <option value="right">
            Right
          </option>

          <option value="justify">
            Justify
          </option>
        </select>

        <div
          className="
            relative
          "
        >
          <button
            type="button"
            onClick={() =>
              setShowLinkInput(
                !showLinkInput
              )
            }
            className={`
              px-3
              h-9
              border

              ${
                editor.isActive(
                  "link"
                )
                  ? activeClass
                  : normalClass
              }
            `}
          >
            🔗
          </button>

          {showLinkInput && (
            <div
              className="
                absolute
                top-11
                left-0

                w-72

                rounded-2xl

                bg-black/20

                border
                border-white/30

                p-3

                z-50
              "
            >
              <input
                value={linkUrl}
                onChange={(e) =>
                  setLinkUrl(
                    e.target.value
                  )
                }
                placeholder="https://"
                className="
                  w-full
                  h-10

                  border
                  border-white/30

                  rounded-xl

                  px-3
                "
              />

              <button
                className="
                  mt-3

                  w-full
                  h-10

                  rounded-xl

                  bg-violet-500

                  text-white
                "
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setLink({
                      href:
                        linkUrl,
                    })
                    .run();

                  setShowLinkInput(
                    false
                  );

                  setLinkUrl("");
                }}
              >
                Insert Link
              </button>
            </div>
          )}
        </div>

        <label
          className="
            px-3
            h-9

            border
            border-white/30

            flex
            items-center

            cursor-pointer

            text-sm
          "
        >
          +Image

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file =
                e.target.files?.[0];

              if (!file)
                return;

              handleImageUpload(
                file
              );
            }}
          />
        </label>
      </div>

      <div
        className="
          p-6

          text-white

          [&_img]:block
          [&_img]:mx-auto

          [&_img]:max-w-[300px]
          [&_img]:max-h-[300px]

          [&_img]:w-auto
          [&_img]:h-auto

          [&_a]:text-sky-600
          [&_a]:underline
        "
      >
        <EditorContent
          editor={editor}
        />
      </div>
    </div>
  );
}