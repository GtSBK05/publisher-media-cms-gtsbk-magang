"use client";

import { useState } from "react";

import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
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

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
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
        overflow-hidden
        relative
        px-6
      "
    >
      <div
        className="
          absolute
          w-[250px]
          h-[250px]
          border
          border-orange-500/20
          left-[12%]
          bottom-[15%]
        "
      />

      <div
        className="
          absolute
          w-[180px]
          h-[180px]
          border
          border-violet-500/20
          right-[20%]
          top-[18%]
        "
      />

      <div
        className="
          w-full
          max-w-5xl
          bg-[#0f0f17]
          border
          border-white/10
          grid
          md:grid-cols-2
          rounded-sm
          overflow-hidden
          relative
          z-10
        "
      >
        <div
          className="
            p-14
            flex
            flex-col
            justify-between
            border-r
            border-white/5
          "
        >
          <div>
            <div className="flex items-start gap-4">
              <div
                className="
                  w-[3px]
                  h-14
                  bg-violet-500
                "
              />

              <div>
                <h1
                  className="
                    text-white
                    text-2xl
                    font-light
                  "
                >
                  Publisher CMS
                </h1>

                <p
                  className="
                    text-white/40
                    text-sm
                    mt-1
                  "
                >
                  Editorial Platform
                </p>
              </div>
            </div>

            <div className="mt-24 space-y-10">
              <div className="flex gap-5">
                <div
                  className="
                    w-5
                    h-5
                    border
                    border-orange-500
                    mt-1
                  "
                />

                <div>
                  <h2
                    className="
                      text-white
                      text-sm
                    "
                  >
                    Secure Recovery
                  </h2>

                  <p
                    className="
                      text-white/30
                      text-xs
                      mt-1
                    "
                  >
                    Reset your password
                    securely through your
                    registered email
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div
                  className="
                    w-5
                    h-5
                    border
                    border-violet-500
                    mt-1
                  "
                />

                <div>
                  <h2
                    className="
                      text-white
                      text-sm
                    "
                  >
                    Account Protection
                  </h2>

                  <p
                    className="
                      text-white/30
                      text-xs
                      mt-1
                    "
                  >
                    Your editorial workspace
                    stays protected with
                    secure authentication
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              flex
              gap-1
              mt-20
            "
          >
            <div
              className="
                h-[2px]
                w-32
                bg-orange-500
              "
            />

            <div
              className="
                h-[2px]
                w-32
                bg-violet-500
              "
            />
          </div>
        </div>

        <div
          className="
            p-14
            flex
            items-center
          "
        >
          <div className="w-full">
            <h2
              className="
                text-3xl
                text-white
                font-light
              "
            >
              Forgot Password
            </h2>

            <p
              className="
                text-white/40
                text-sm
                mt-2
                mb-10
              "
            >
              Enter your email to reset
              your password
            </p>

            <form
              onSubmit={handleSubmit}
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
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="your@email.com"
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
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>
            </form>

            <div
              className="
                mt-6
                text-sm
                text-white/40
              "
            >
              Back to{" "}

              <Link
                href="/login"
                className="
                  text-violet-400
                "
              >
                Sign In
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
        </div>
      </div>
    </main>
  );
}