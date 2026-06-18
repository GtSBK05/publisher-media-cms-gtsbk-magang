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

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          "/api/wiki-settings/background",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              backgroundUrl:
                preview,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
          "Failed to save background"
        );

        return;
      }

      alert(
        "Background updated"
      );

      location.reload();

    } catch (error) {
      console.error(error);

      alert(
        "Failed to save background"
      );
    }
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
            max-w-[640px]

            h-[360px]

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
            px-3
            h-7

            rounded-xl

            bg-[#fafaf9]

            disabled:opacity-50
          "
        >
          {uploading
            ? "Uploading..."
            : "🎞️"}
        </button>
      </div>
    </div>
  );
}