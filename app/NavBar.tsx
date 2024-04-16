"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FaCode, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useTheme } from "next-themes";

import ThemeToggle from "./ThemeToggle";

// Define the type for links array
interface LinkInfo {
  label: string;
  href: string;
}

// Declaration and initialization of the links array
const links: LinkInfo[] = [
  { label: "About", href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme(); // This is the hook from next-themes
  const currentPath = usePathname();

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderLinks = (baseStyle: string = "", onClick?: () => void) => {
    return links.map((link) => {
      const isActiveLink = currentPath === link.href;
      const textColorClass = isActiveLink
        ? theme === "dark"
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
                className="pb-3 pr-20 pl-6 pt-2"
                currentTheme={theme}
              />
            </ul>
          )}
        </div>
      ) : (
        <ul className="flex space-x-6 right-0">
          {desktopLinks}
          <ThemeToggle scale={1.7} currentTheme={theme} />
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
