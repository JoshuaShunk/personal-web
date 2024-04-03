"use client";

import { link } from "fs";
import Link from "next/link";
import React from "react";
import { FaCode, FaGithub } from "react-icons/fa";

import classnames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "About", href: "/about" },
    { label: "Eduction", href: "/education" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex justify-between w-full mb-5 px-5 h-14 items-center ">
      <Link href="/">
        <FaCode size={25} />
      </Link>
      <ul className="flex space-x-6 right-0">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="https://github.com/JoshuaShunk?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
