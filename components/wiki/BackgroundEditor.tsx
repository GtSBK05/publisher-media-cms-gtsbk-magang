"use client";

import {
  useState,
} from "react";

interface Props {
  currentBackground?:
    string | null;
}

export default function BackgroundEditor({
  currentBackground,
}: Props) {
  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    preview,
    setPreview,
  ] = useState(
    currentBackground || ""
  );

  async function upload(
    file: File
  ) {
    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/upload-avatar",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      setPreview(
        data.url
      );

    } finally {
      setUploading(
        false
      );
    }
  }

  async function save() {
    if (!preview)
      return;

    await fetch(
      "/api/wiki-settings/background",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          backgroundUrl:
            preview,
        }),
      }
    );

    location.reload();
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-4
      "
    >
      {preview && (
        <img
          src={preview}
          alt="Background Preview"
          className="
            w-full
            max-w-[900px]

            h-[220px]

            object-cover

            rounded-3xl

            border
            border-white/10
          "
        />
      )}

      <div
        className="
          flex
          gap-3
          items-center
        "
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target
                .files?.[0];

            if (file) {
              upload(
                file
              );
            }
          }}
          className="
            block
            text-sm
          "
        />

        <button
          disabled={
            uploading ||
            !preview
          }
          onClick={save}
          className="
            px-5
            h-11

            rounded-xl

            bg-violet-500

            disabled:opacity-50
          "
        >
          {uploading
            ? "Uploading..."
            : "Save Background"}
        </button>
      </div>
    </div>
  );
}