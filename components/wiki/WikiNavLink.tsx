"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

export default function WikiNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  const active =
    pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex
        items-center

        h-11
        px-4

        rounded-2xl

        text-sm

        border

        transition-all

        ${
          active
            ? `
              text-white

              border-violet-500/30

              bg-gradient-to-r
              from-violet-500/20
              to-orange-400/20
            `
            : `
              text-white/70

              border-transparent

              hover:text-white

              hover:border-violet-500/20

              hover:bg-gradient-to-r
              hover:from-violet-500/20
              hover:to-orange-400/20
            `
        }
      `}
    >
      {children}
    </Link>
  );
}