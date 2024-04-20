// This enables strict mode in JavaScript to prevent common pitfalls.
"use client";

// Importing necessary React hooks and components.
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { FaCode, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

// Custom component for toggling the theme.
import ThemeToggle from "../ThemeToggle";

// CSS module for styling components specifically within this navbar.
import styles from "./navbar.module.css";

// Type definition for navigation links.
interface LinkInfo {
  label: string;
  href: string;
}

// Array containing the navigation links to be displayed.
const links: LinkInfo[] = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false); // State to manage mobile view toggle.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility.
  const [mounted, setMounted] = useState(false); // State to track if component is mounted.

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu to manage outside clicks.
  const { theme } = useTheme(); // Current theme state from 'next-themes'.
  const currentPath = usePathname(); // Pathname from 'next/navigation' to highlight the active link.

  // Layout effect to handle window resizing and set mobile view state.
  useLayoutEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view if window width is less than 768px.
    };

    checkSize(); // Initialize state based on current window size.
    window.addEventListener("resize", checkSize); // Add resize listener.
    setMounted(true); // Confirm component mount completion.

    return () => window.removeEventListener("resize", checkSize); // Cleanup resize listener.
  }, []);

  // Effect to close dropdown if clicked outside.
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
  }, []);

  // Effect to apply theme-based body class.
  useEffect(() => {
    document.body.className =
      theme === "dark" ? styles.darkMode : styles.lightMode;
  }, [theme]);

  // Function to toggle the visibility of the dropdown.
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Function to render navigation links as list items.
  const renderLinks = () =>
    links.map((link) => {
      const isActive = currentPath === link.href;
      const textColorClass = isActive
        ? theme === "dark"
          ? styles.textActiveDark
          : styles.textActiveLight
        : styles.textInactive;

      const hoverClass = isActive ? "" : "hover:text-zinc-800";
      return (
        <Link
          key={link.href}
          href={link.href}
          className={`text-lg py-2 px-4 transition-colors cursor-pointer ${textColorClass} ${hoverClass}`}
          onClick={() => setIsDropdownOpen(false)}
        >
          {link.label}
        </Link>
      );
    });

  // Render placeholder during mounting process to prevent layout shift.
  if (!mounted) {
    return <div className="w-full mb-5 px-5 h-14 navbar"></div>;
  }

  // Main render method for NavBar component.
  return (
    <nav
      className={`flex justify-between items-center w-full mb-5 px-5 h-14 navbar ${
        isMobile ? "" : "visible-lg"
      }`}
      style={{ visibility: isMobile ? "visible" : undefined }}
    >
      <Link className="pt-2 pl-3" href="/">
        <FaCode size={25} />
      </Link>
      {isMobile ? (
        <div className="dropdown dropdown-end z-50 pt-2" ref={dropdownRef}>
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
              {renderLinks()}
              <ThemeToggle scale={1.7} className="pb-2 pr-20 pl-6 pt-5" />
            </ul>
          )}
        </div>
      ) : (
        <ul className="flex space-x-6">
          {renderLinks()}
          <ThemeToggle scale={1.7} />
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
