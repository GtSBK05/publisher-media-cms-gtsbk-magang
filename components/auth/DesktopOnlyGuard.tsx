"use client";

import {
  useEffect,
  useState,
} from "react";

export default function DesktopOnlyGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    isDesktop,
    setIsDesktop,
  ] = useState(false);

  useEffect(() => {
    function checkDevice() {
      const mobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
          navigator.userAgent
        );

      const desktopMode =
        window.innerWidth >= 1024;

      setIsDesktop(
        !mobile || desktopMode
      );
    }

    checkDevice();

    window.addEventListener(
      "resize",
      checkDevice
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkDevice
      );
  }, []);

  if (!isDesktop) {
    return (
      <main
        className="
          min-h-screen
          bg-[#111318]
          text-white
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            max-w-md
            text-center
          "
        >
          <div
            className="
              text-6xl
              mb-6
            "
          >
            🖥️
          </div>

          <h1
            className="
              text-3xl
              font-light
              mb-4
            "
          >
            Desktop Required
          </h1>

          <p
            className="
              text-white/50
              leading-7
            "
          >
            You must use a desktop browser to access CMS.
          </p>

          <p
            className="
              text-white/30
              text-sm
              mt-6
            "
          >
            ◇
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}