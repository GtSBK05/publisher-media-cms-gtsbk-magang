"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import {
  useState,
} from "react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import imageCompression from "browser-image-compression";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import ResizeImage from "tiptap-extension-resize-image";

interface Props {
  content: string;

  onChange: (
    value: string
  ) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: Props) {
  const [showLinkInput, setShowLinkInput] =
    useState(false);

  const [showLinkModal, setShowLinkModal] =
    useState(false);

  const [
    showTablePicker,
    setShowTablePicker,
  ] = useState(false);

  const [
    hoverRows,
    setHoverRows,
  ] = useState(0);

  const [
    hoverCols,
    setHoverCols,
  ] = useState(0);    

  const [linkUrl, setLinkUrl] =
    useState("");  

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      TextAlign.configure({
        types: [
          "heading",
          "paragraph",
          "bulletList",
          "orderedList",
          "listItem",
        ],
        defaultAlignment: "left",
      }),

      ResizeImage,

      Table.configure({
        resizable: true,
        
        HTMLAttributes: {
          class: "table-auto",
        },
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],

    content,

    editorProps: {
      attributes: {
        class: 
          "min-h-[400px] outline-none text-white/90 leading-8",
      },
    },

    onUpdate: ({ editor }) => {
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

            maxWidthOrHeight:
              1600,

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
      console.error(error);

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
      text-violet-300
    `;

  const normalClass =
    `
      border-white/10
      text-white/60
      hover:bg-white/5
    `;  

  return (
    <div
      className="
        border
        border-white/10
        bg-black/20
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          border-b
          border-white/10
          p-3
          flex-wrap
        "
      >
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`
            px-3 h-9 border text-sm transition
            ${
              editor.isActive("bold")
                ? "border-violet-500 bg-violet-500/10 text-violet-300"
                : "border-white/10 text-white/60 hover:bg-white/5"
            }
          `}
        >
          B
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`
            px-3 h-9 border text-sm transition
            ${
              editor.isActive("italic")
                ? "border-violet-500 bg-violet-500/10 text-violet-300"
                : "border-white/10 text-white/60 hover:bg-white/5"
            }
          `}
        >
          I
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={`
            px-3 h-9 border text-sm transition
            ${
              editor.isActive("underline")
                ? "border-violet-500 bg-violet-500/10 text-violet-300"
                : "border-white/10 text-white/60 hover:bg-white/5"
            }
          `}
        >
          U
        </button>

        <select
          className="
            h-9
            px-3
            rounded-xl
            bg-[#1b1e24]
            border
            border-white/10
            text-sm
            text-white
          "
          value={
            editor.isActive("heading")
              ? "heading"
              : "paragraph"
          }
          onChange={(e) => {
            if (
              e.target.value ===
              "heading"
            ) {
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run();
            } else {
              editor
                .chain()
                .focus()
                .setParagraph()
                .run();
            }
          }}
        >
          <option value="paragraph">
            Paragraph
          </option>

          <option value="heading">
            Heading
          </option>
        </select>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          className={`
            px-3 h-9 border text-sm transition
            ${
              editor.isActive(
                "blockquote"
              )
                ? "border-violet-500 bg-violet-500/10 text-violet-300"
                : "border-white/10 text-white/60 hover:bg-white/5"
            }
          `}
        >
          Quote
        </button>

        <select
          className="
            h-9
            px-3
            rounded-xl
            bg-[#1b1e24]
            border
            border-white/10
            text-sm
            text-white
          "
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

        <select
          className="
            h-9
            px-3
            rounded-xl
            bg-[#1b1e24]
            border
            border-white/10
            text-sm
            text-white
          "
          defaultValue=""
          onChange={(e) => {
            if (
              e.target.value ===
              "bullet"
            ) {
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run();
            }

            if (
              e.target.value ===
              "ordered"
            ) {
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run();
            }
          }}
        >
          <option value="">
            
          </option>

          <option value="bullet">
            Bullet
          </option>

          <option value="ordered">
            Numbered
          </option>
        </select>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowLinkInput(
                !showLinkInput
              )
            }
            className={`
              px-3 h-9 border text-sm transition
              ${
                editor.isActive("link")
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

                w-80

                rounded-2xl

                border
                border-white/10

                bg-[#16181d]

                p-3

                shadow-2xl
                shadow-black/50

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
                placeholder="https://example.com"
                className="
                  w-full
                  h-10

                  rounded-xl

                  border
                  border-white/10

                  bg-white/[0.03]

                  px-3

                  text-sm
                  text-white

                  outline-none
                "
              />

              <div
                className="
                  flex
                  gap-2
                  mt-3
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    if (
                      !linkUrl.trim()
                    )
                      return;

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
                  className="
                    flex-1
                    h-9

                    rounded-xl

                    bg-violet-500

                    text-sm
                    text-white
                  "
                >
                  Insert
                </button>

                <button
                  type="button"
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .unsetLink()
                      .run();

                    setShowLinkInput(
                      false
                    );
                  }}
                  className="
                    px-3
                    h-9

                    rounded-xl

                    border
                    border-red-500/30

                    text-red-300
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <label
          className="
            px-3
            h-9
            border
            border-white/10
            text-white/60
            hover:bg-white/5
            transition
            flex
            items-center
            cursor-pointer
            text-sm
          "
        >
          +Image

          <input
            type="file"
            accept="image/*"
            hidden
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

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowTablePicker(
                !showTablePicker
              )
            }
            className={`
              px-3
              h-9
              border
              text-sm
              transition
              ${
                editor.isActive("table")
                  ? activeClass
                  : normalClass
              }
            `}
          >
            Table
          </button>

          {showTablePicker && (
            <div
              className="
                absolute
                top-11
                left-0

                w-[260px]

                rounded-2xl

                border
                border-white/10

                bg-[#16181d]

                p-4

                shadow-2xl
                shadow-black/50

                z-50
              "
            >
              <div
                className="
                  grid
                  grid-cols-10
                  gap-1
                "
              >
                {Array.from({
                  length: 100,
                }).map((_, index) => {
                  const row =
                    Math.floor(
                      index / 10
                    ) + 1;

                  const col =
                    (index % 10) + 1;

                  const active =
                    row <= hoverRows &&
                    col <= hoverCols;

                  return (
                    <button
                      key={index}
                      type="button"
                      onMouseEnter={() => {
                        setHoverRows(
                          row
                        );

                        setHoverCols(
                          col
                        );
                      }}
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .insertTable({
                            rows: row,
                            cols: col,
                            withHeaderRow:
                              true,
                          })
                          .run();

                        setShowTablePicker(
                          false
                        );
                      }}
                      className={`
                        w-5
                        h-5
                        border

                        ${
                          active
                            ? `
                              bg-violet-500
                              border-violet-400
                            `
                            : `
                              border-white/15
                            `
                        }
                      `}
                    />
                  );
                })}
              </div>

              <div
                className="
                  mt-3
                  text-center
                  text-sm
                  text-white/60
                "
              >
                {hoverRows > 0 &&
                hoverCols > 0
                  ? `${hoverRows} × ${hoverCols}`
                  : "Select size"}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          className="
            px-3
            h-9
            border
            border-white/10
            text-white/60
            hover:bg-white/5
            transition
            text-sm
          "
        >
          Undo
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          className="
            px-3
            h-9
            border
            border-white/10
            text-white/60
            hover:bg-white/5
            transition
            text-sm
          "
        >
          Redo
        </button>
      </div>

    {editor.isActive("table") && (
      <div
        className="
          flex
          items-center
          gap-2

          border-l
          border-white/10

          pl-3
          ml-1
        "
      >
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .addRowAfter()
              .run()
          }
          className="
            px-3 h-9 border
            border-white/10
            text-sm text-white/60
          "
        >
          +Row
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .deleteRow()
              .run()
          }
          className="
            px-3 h-9 border
            border-white/10
            text-sm text-white/60
          "
        >
          -Row
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .addColumnAfter()
              .run()
          }
          className="
            px-3 h-9 border
            border-white/10
            text-sm text-white/60
          "
        >
          +Col
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .deleteColumn()
              .run()
          }
          className="
            px-3 h-9 border
            border-white/10
            text-sm text-white/60
          "
        >
          -Col
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .mergeCells()
              .run()
          }
          className="
            px-3 h-9 border
            border-white/10
            text-sm text-white/60
          "
        >
          Merge
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .splitCell()
              .run()
          }
          className="
            px-3 h-9 border
            border-white/10
            text-sm text-white/60
          "
        >
          Split
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .deleteTable()
              .run()
          }
          className="
            px-3 h-9 border
            border-red-500/30
            text-red-300
            text-sm
          "
        >
          Delete
        </button>
      </div>
    )}

      <div
        className="
          p-6

          [&_.selectedCell]:bg-emerald-500/30
          [&_.selectedCell]:outline
          [&_.selectedCell]:outline-2
          [&_.selectedCell]:outline-emerald-400
          [&_.selectedCell]:shadow-lg
          [&_.selectedCell]:shadow-emerald-500/30          
          
          [&_table]:w-auto
          [&_table]:table-fixed
          [&_table]:border-collapse
          [&_table]:my-6
          [&_table]:mx-auto
          [&_table]:max-w-full

          [&_th]:border
          [&_th]:border-white/20
          [&_th]:p-3
          [&_th]:align-top
          [&_th]:font-normal
          [&_th]:break-words

          [&_td]:border
          [&_td]:border-white/20
          [&_td]:p-3
          [&_td]:align-top
          [&_td]:break-words

          [&_td]:overflow-hidden
          [&_td]:max-w-[300px]

          [&_th]:overflow-hidden
          [&_th]:max-w-[300px]          
          
          [&_tr:hover]:bg-white/[0.02]          

          [&_ul]:list-disc
          [&_ul]:pl-6

          [&_ol]:list-decimal
          [&_ol]:pl-6

          [&_li]:my-1

          [&_a]:text-sky-400
          [&_a]:underline
          [&_a]:underline-offset-4
          [&_a]:cursor-pointer
          [&_a]:hover:text-sky-300          
          
          [&_img]:max-w-full
          [&_img]:h-auto
        "
      >
      <div
        className="
          overflow-x-auto
          pb-2
        "
      >
        <EditorContent
          editor={editor}
        />
      </div>
    </div>

    {showLinkModal && (
      <div
        className="
          fixed
          inset-0
          z-[9999]

          bg-black/50

          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            w-[420px]

            rounded-3xl

            border
            border-white/10

            bg-[#16181d]

            p-6

            shadow-2xl
            shadow-black/50
          "
        >
          <h2
            className="
              text-xl
              text-white
              mb-5
            "
          >
            Insert Link
          </h2>

          <input
            value={linkUrl}
            onChange={(e) =>
              setLinkUrl(
                e.target.value
              )
            }
            placeholder="https://example.com"
            className="
              w-full
              h-12

              rounded-2xl

              border
              border-white/10

              bg-white/[0.03]

              px-4

              text-white

              outline-none

              focus:border-violet-500/40
            "
          />

          <div
            className="
              flex
              gap-3
              mt-6
            "
          >
            <button
              onClick={() =>
                setShowLinkModal(
                  false
                )
              }
              className="
                flex-1
                h-11

                rounded-2xl

                border
                border-white/10

                text-white/60
              "
            >
              Cancel
            </button>

            <button
              onClick={() => {
                if (
                  !linkUrl.trim()
                ) {
                  return;
                }

                editor
                  .chain()
                  .focus()
                  .setLink({
                    href: linkUrl,
                  })
                  .run();

                setShowLinkModal(
                  false
                );

                setLinkUrl("");
              }}
              className="
                flex-1
                h-11

                rounded-2xl

                bg-gradient-to-r
                from-violet-500
                to-orange-400

                text-white
              "
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    )}                        
    </div>
  );
}