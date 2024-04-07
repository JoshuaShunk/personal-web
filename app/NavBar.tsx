"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaCode, FaGithub, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const renderLinks = (baseStyle: string = "", onClick?: () => void) =>
    links.map((link) => {
      const isActiveLink = currentPath === link.href;
      // Adding text-lg and py-2 px-4 for larger text and padding
      const linkClasses = classnames(baseStyle, "text-lg py-2 px-4", {
        "text-zinc-900": isActiveLink,
        "text-zinc-500": !isActiveLink,
        "hover:text-zinc-800": true,
        "transition-colors": true,
      });

      return (
        <Link key={link.href} href={link.href}>
          <div onClick={onClick} className={linkClasses + " cursor-pointer"}>
            {link.label}
          </div>
        </Link>
      );
    });


  const desktopLinks = renderLinks();
  const mobileLinks = renderLinks("dropdown-item", () =>
    setIsDropdownOpen(false)
  );

  return (
    <nav className="flex justify-between items-center w-full mb-5 px-5 h-14">
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
              {renderLinks("dropdown-item", () => setIsDropdownOpen(false))}
              <li onClick={() => setIsDropdownOpen(false)}>
                <a
                  href="https://github.com/JoshuaShunk?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item flex items-center space-x-2"
                >
                  <FaGithub size={20} />
                </a>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <ul className="flex space-x-6 right-0">
          {desktopLinks}
          <Link
            href="https://github.com/JoshuaShunk?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
