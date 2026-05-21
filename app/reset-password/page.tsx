"use client";

import { useState } from "react";

import {
  useSearchParams,
} from "next/navigation";

export default function ResetPasswordPage() {
  const params =
    useSearchParams();

  const token =
    params.get("token");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleReset(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert(data.message);

      window.location.href =
        "/login";

    } catch (error) {
      console.error(error);

      alert(
        "Reset password failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-[#0f0f17]
          border
          border-white/10
          p-10
        "
      >
        <div
          className="
            w-[4px]
            h-14
            bg-violet-500
            mb-8
          "
        />

        <h1
          className="
            text-3xl
            text-white
            font-light
            mb-3
          "
        >
          Reset Password
        </h1>

        <p
          className="
            text-white/40
            text-sm
            mb-10
          "
        >
          Enter your new password
        </p>

        <form
          onSubmit={handleReset}
          className="space-y-6"
        >
          <div>
            <label
              className="
                text-xs
                text-white/60
                block
                mb-3
              "
            >
              New Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="New password"
              className="
                w-full
                bg-transparent
                border
                border-white/10
                h-12
                px-4
                text-white
                outline-none
                focus:border-violet-500
                transition
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-12
              bg-white
              text-black
              text-sm
              hover:bg-white/90
              transition
            "
          >
            {loading
              ? "Saving..."
              : "Reset Password"}
          </button>
        </form>

        <div
          className="
            flex
            justify-between
            mt-10
          "
        >
          <div
            className="
              w-2
              h-2
              bg-violet-500
            "
          />

          <div
            className="
              w-2
              h-2
              bg-orange-500
            "
          />
        </div>
      </div>
    </main>
  );
}