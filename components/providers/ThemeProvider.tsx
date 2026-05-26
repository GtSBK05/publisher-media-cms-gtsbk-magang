"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  lightMode: boolean;

  toggleTheme: () => void;
}

const ThemeContext =
  createContext<
    ThemeContextType | undefined
  >(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    lightMode,
    setLightMode,
  ] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    if (
      savedTheme === "light"
    ) {
      setLightMode(true);

      document.documentElement.classList.add(
        "light"
      );
    }
  }, []);

  function toggleTheme() {
    const nextMode =
      !lightMode;

    setLightMode(nextMode);

    localStorage.setItem(
      "theme",
      nextMode
        ? "light"
        : "dark"
    );

    if (nextMode) {
      document.documentElement.classList.add(
        "light"
      );
    } else {
      document.documentElement.classList.remove(
        "light"
      );
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        lightMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(
      ThemeContext
    );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}