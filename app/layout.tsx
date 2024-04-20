import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import NavBar from "./components/navbar/NavBar";
import type { ReactNode, FC } from "react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
  nonce?: string;
}

export const metadata = {
  title: "Josh Personal Web",
  description: "Personal website created to show off my projects and resume.",
};

const RootLayout: FC<RootLayoutProps> = ({ children, nonce }) => {
  return (
    <html lang="en">
      <head>
        <style>{`body { display: none; }`}</style>
        <script nonce={nonce} src="/set-theme.js" async></script>{" "}
        {/* Made script asynchronous */}
      </head>
      <body
        className={`bg-theme-background text-theme-text ${inter.className}`}
        style={{ display: "block" }} // Re-enable display after theme is set
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
};

export default RootLayout;
