"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

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
  const editor = useEditor({
    extensions: [
      StarterKit,
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

  if (!editor) {
    return null;
  }

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
          onMouseDown={(e) => {
            e.preventDefault();

            editor.commands.focus();

            editor
              .chain()
              .toggleBold()
              .run();
          }}
          className={`
            px-3
            h-9
            text-sm
            border
            transition
            ${
              editor.isActive(
                "bold"
              )
                ? `
                  border-violet-500
                  bg-violet-500/10
                  text-violet-300
                `
                : `
                  border-white/10
                  text-white/60
                  hover:bg-white/5
                `
            }
          `}
        >
          Bold
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor.commands.focus();

            editor
              .chain()
              .toggleItalic()
              .run();
          }}
          className={`
            px-3
            h-9
            text-sm
            border
            transition
            ${
              editor.isActive(
                "italic"
              )
                ? `
                  border-violet-500
                  bg-violet-500/10
                  text-violet-300
                `
                : `
                  border-white/10
                  text-white/60
                  hover:bg-white/5
                `
            }
          `}
        >
          Italic
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor.commands.focus();

            editor
              .chain()
              .toggleHeading({
                level: 1,
              })
              .run();
          }}
          className={`
            px-3
            h-9
            text-sm
            border
            transition
            ${
              editor.isActive(
                "heading",
                {
                  level: 1,
                }
              )
                ? `
                  border-violet-500
                  bg-violet-500/10
                  text-violet-300
                `
                : `
                  border-white/10
                  text-white/60
                  hover:bg-white/5
                `
            }
          `}
        >
          H1
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor.commands.focus();

            editor
              .chain()
              .toggleBulletList()
              .run();
          }}
          className={`
            px-3
            h-9
            text-sm
            border
            transition
            ${
              editor.isActive(
                "bulletList"
              )
                ? `
                  border-violet-500
                  bg-violet-500/10
                  text-violet-300
                `
                : `
                  border-white/10
                  text-white/60
                  hover:bg-white/5
                `
            }
          `}
        >
          List
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor.commands.focus();

            editor
              .chain()
              .toggleBlockquote()
              .run();
          }}
          className={`
            px-3
            h-9
            text-sm
            border
            transition
            ${
              editor.isActive(
                "blockquote"
              )
                ? `
                  border-violet-500
                  bg-violet-500/10
                  text-violet-300
                `
                : `
                  border-white/10
                  text-white/60
                  hover:bg-white/5
                `
            }
          `}
        >
          Quote
        </button>
      </div>

      <div className="p-6">
        <EditorContent
          editor={editor}
        />
      </div>
    </div>
  );
}