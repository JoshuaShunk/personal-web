import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import { ThemeProvider } from "next-themes";

import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Josh Personal Web",
  description: "Personal website created to show off my projects and resume.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`bg-theme-background text-theme-text ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          storageKey="theme"
        >
          <NavBar />
          <main className="py-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
