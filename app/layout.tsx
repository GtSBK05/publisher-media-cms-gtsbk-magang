import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import {
  GoogleOAuthProvider,
} from "@react-oauth/google";

import "./globals.css";

import {
  ThemeProvider,
} from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata: Metadata =
  {
    title:
      "Community Archive",

    description:
      "Community Archive CMS",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={
            process.env
              .NEXT_PUBLIC_GOOGLE_CLIENT_ID!
          }
        >
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}