"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaCode, FaGithub, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import ThemeToggle from "./ThemeToggle";
// Import statement for Theme might not be necessary unless you are using it somewhere else
// import { Theme } from "@radix-ui/themes";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light"); // default to 'light'

  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname();

  const links = [
    { label: "About", href: "/about" },
    { label: "Education", href: "/education" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];
  useEffect(() => {
    // Only executed on client-side
    const theme = localStorage.getItem("theme") || "light";
    setCurrentTheme(theme);
  }, []);

  useEffect(() => {
    // Function to handle theme change
    const updateTheme = (newTheme: string) => {
      setCurrentTheme(newTheme); // Update the state
      localStorage.setItem("theme", newTheme); // Update localStorage
      document.documentElement.setAttribute("data-theme", newTheme); // Update the document theme
    };
  }, []);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkSize);
    checkSize();

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderLinks = (baseStyle: string = "", onClick?: () => void) => {
    return links.map((link) => {
      const isActiveLink = currentPath === link.href;
      const textColorClass = isActiveLink
        ? currentTheme === "dark"
          ? "text-white"
          : "text-zinc-900"
        : "text-zinc-500";

      const linkClasses = classnames(
        baseStyle,
        "text-lg py-2 px-4",
        textColorClass,
        {
          "hover:text-zinc-800": true,
          "transition-colors": true,
        }
      );

      return (
        <Link key={link.href} href={link.href}>
          <div onClick={onClick} className={linkClasses + " cursor-pointer"}>
            {link.label}
          </div>
        </Link>
      );
    });
  };

  const desktopLinks = renderLinks();
  const mobileLinks = renderLinks("dropdown-item", () =>
    setIsDropdownOpen(false)
  );

  return (
    <nav
      className="flex justify-between items-center w-full mb-5 px-5 h-14"
      style={{
        backgroundColor: "var(--navbar-bg-color)",
        color: "var(--navbar-text-color)",
      }}
    >
      <Link href="/">
        <FaCode size={25} />
      </Link>
      {isMobile ? (
        <div className="dropdown dropdown-end z-50" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <FaBars size={20} />
          </button>
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {mobileLinks}
              <ThemeToggle
                scale={1.7}
                onThemeChange={setCurrentTheme}
                className="pb-3 pr-20 pl-6 pt-2"
              />
            </ul>
          )}
        </div>
      ) : (
        <ul className="flex space-x-6 right-0">
          {desktopLinks}
          <ThemeToggle scale={1.7} onThemeChange={setCurrentTheme} />
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
