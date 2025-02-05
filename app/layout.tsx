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

const setInitialTheme = `
(function() {
  var theme = localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'light';
  if (theme === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Ensure the viewport meta tag is here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`body { display: none; }`}</style>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body
        className={`bg-theme-background text-theme-text ${inter.className} overflow-x-hidden`}
        style={{ display: "block" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          enableColorScheme={true}
          storageKey="theme"
        >
          <NavBar />
          <main className="py-5">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
