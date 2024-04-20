import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import NavBar from "./components/navbar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Josh Personal Web",
  description: "Personal website created to show off my projects and resume.",
};

export default function RootLayout({
  children,
  nonce, // nonce passed as a prop
}: Readonly<{
  children: React.ReactNode;
  nonce?: string;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`body { display: none; }`}</style>
        <script nonce={nonce} async src="/set-theme.js"></script>{" "}
        {/* Secured by nonce */}
      </head>
      <body
        className={`bg-theme-background text-theme-text ${inter.className}`}
        style={{ display: "block" }} /* Re-enable display after theme is set */
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
