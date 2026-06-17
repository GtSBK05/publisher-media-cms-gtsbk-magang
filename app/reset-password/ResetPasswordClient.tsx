"use client";

export const dynamic =
  "force-dynamic";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function ResetPasswordClient() {
  const router =
    useRouter();

  const params =
    useSearchParams();

  const token =
    params.get("token");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleReset(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Password confirmation does not match"
      );

      return;
    }

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

      router.push(
        "/login"
      );

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
        bg-[#111318]
        flex
        items-center
        justify-center
        overflow-hidden
        relative
        px-6
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

      <div
        className="
          w-full
          max-w-md
          relative
          z-10
          bg-white/[0.04]
          backdrop-blur-2xl
          border
          border-white/10
          rounded-[32px]
          p-10
          shadow-2xl
          shadow-black/30
        "
      >
        <div
          className="
            w-[4px]
            h-16
            bg-violet-500
            rounded-full
            mb-8
          "
        />

        <h1
          className="
            text-3xl
            font-light
            text-white
            mb-3
          "
        >
          Reset Access
          Password
        </h1>

        <p
          className="
            text-white/40
            text-sm
            leading-6
            mb-10
          "
        >
          Create a new password
          for your Content
          Archive account.
        </p>

        <form
          onSubmit={handleReset}
          className="
            space-y-6
          "
        >
          <div>
            <label
              className="
                block
                mb-3
                text-xs
                text-white/50
              "
            >
              New Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                className="
                  w-full
                  h-12
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/10
                  px-4
                  text-white
                  outline-none
                  focus:border-violet-500/40
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-xs
                  text-white/40
                  hover:text-white
                "
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label
              className="
                block
                mb-3
                text-xs
                text-white/50
              "
            >
              Confirm Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm password"
              className="
                w-full
                h-12
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/10
                px-4
                text-white
                outline-none
                focus:border-violet-500/40
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-orange-400
              text-white
              shadow-lg
              shadow-violet-500/20
              disabled:opacity-60
            "
          >
            {loading
              ? "Saving..."
              : "Reset Password"}
          </button>
        </form>

        <div
          className="
            mt-6
            text-center
          "
        >
          <Link
            href="/login"
            className="
              text-sm
              text-violet-300
              hover:text-violet-200
            "
          >
            Back to Sign In
          </Link>
        </div>

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