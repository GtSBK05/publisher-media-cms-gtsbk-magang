"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function WikiSettingsGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const [
    authorized,
    setAuthorized,
  ] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      router.replace(
        "/login"
      );

      return;
    }

    try {
      const payload =
        JSON.parse(
          atob(
            token.split(".")[1]
          )
        );

      const role =
        payload.role;

      if (
        role !== "ADMIN" &&
        role !== "EDITOR"
      ) {
        router.replace(
          "/dashboard"
        );

        return;
      }

      setAuthorized(
        true
      );

    } catch {
      router.replace(
        "/login"
      );
    }
  }, [router]);

  if (!authorized) {
    return (
      <div
        className="
          min-h-screen
          bg-[#111318]
        "
      />
    );
  }

  return <>{children}</>;
}