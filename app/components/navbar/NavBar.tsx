"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { FaCode, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import ThemeToggle from "../ThemeToggle";

import styles from "./navbar.module.css"; // Importing CSS module

interface LinkInfo {
  label: string;
  href: string;
}

const links: LinkInfo[] = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // State to track mounting

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const currentPath = usePathname();

  useLayoutEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize(); // Call immediately to set the initial state before paint
    window.addEventListener("resize", checkSize);
    setMounted(true); // Set mounted to true after setup is complete
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
  }, []);

  useEffect(() => {
    document.body.className =
      theme === "dark" ? styles.darkMode : styles.lightMode;
  }, [theme]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

  if (!mounted) {
    // Placeholder div with the same height as the navbar to maintain layout
    return <div className="w-full mb-5 px-5 h-14 navbar"></div>;
  }

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
