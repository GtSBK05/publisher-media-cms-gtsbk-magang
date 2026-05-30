"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router =
    useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );

      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
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

      alert(
        "Account created successfully"
      );

      router.push(
        "/login"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Register failed"
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
        py-10
      "
    >
      <div
        className="
          absolute
          w-[260px]
          h-[260px]
          border
          border-orange-500/15
          left-[12%]
          bottom-[10%]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          w-[180px]
          h-[180px]
          border
          border-violet-500/15
          right-[18%]
          top-[15%]
          pointer-events-none
        "
      />

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
        "
      />

      <div
        className="
          w-full
          max-w-6xl
          bg-white/[0.04]
          backdrop-blur-2xl
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
          shadow-2xl
          shadow-black/30
          grid
          md:grid-cols-2
          relative
          z-10
        "
      >
        <div
          className="
            p-14
            border-r
            border-white/10
            flex
            flex-col
            justify-between
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    w-[3px]
                    h-16
                    bg-violet-500
                    rounded-full
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-white/30
                    "
                  >
                    Community
                  </p>

                  <h1
                    className="
                      text-2xl
                      font-light
                      text-white
                    "
                  >
                    Archive
                  </h1>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <p
                className="
                  mt-5
                  text-white/50
                  leading-7
                "
              >
                Preserve and organize
                community knowledge
                through collaborative
                archive entries.
              </p>
            </div>

            <div className="mt-20 space-y-10">
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
                  <h2 className="text-white text-sm">
                    Create Entries
                  </h2>

                  <p
                    className="
                      text-white/30
                      text-xs
                      mt-1
                    "
                  >
                    Build detailed archive
                    entries for your
                    community.
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
                  <h2 className="text-white text-sm">
                    Review Contributions
                  </h2>

                  <p
                    className="
                      text-white/30
                      text-xs
                      mt-1
                    "
                  >
                    Collaborate with
                    editors and
                    contributors.
                  </p>
                </div>
              </div>

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
                  <h2 className="text-white text-sm">
                    Organize Categories
                  </h2>

                  <p
                    className="
                      text-white/30
                      text-xs
                      mt-1
                    "
                  >
                    Keep archive
                    knowledge structured
                    and searchable.
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
            flex-col
            justify-between
          "
        >
          <div className="w-full">
            <h2
              className="
                text-4xl
                font-light
                text-white
              "
            >
              Join Community
              Archive
            </h2>

            <p
              className="
                text-white/40
                mt-3
                mb-10
              "
            >
              Create your contributor
              account to start building
              archive entries.
            </p>

            <form
              onSubmit={
                handleRegister
              }
              className="space-y-6"
            >
              <input
                type="text"
                required
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Full Name"
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

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Email"
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
                  placeholder="Password"
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
                  "
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

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
                placeholder="Confirm Password"
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
                "
              >
                {loading
                  ? "Creating..."
                  : "Create Contributor Account"}
              </button>
            </form>

            <p
              className="
                text-xs
                text-white/30
                mt-6
              "
            >
              You can also join instantly
              using Google Sign In on the
              login page.
            </p>

            <div
              className="
                mt-6
                text-sm
                text-white/40
              "
            >
              Already have an account?{" "}

              <Link
                href="/login"
                className="
                  text-violet-300
                "
              >
                Sign In
              </Link>
            </div>
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
    </main>
  );
}