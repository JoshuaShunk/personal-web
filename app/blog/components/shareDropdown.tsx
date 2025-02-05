"use client";

import { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";
import { CiShare2 } from "react-icons/ci";
import { IoMdLink } from "react-icons/io";
import "./blogpage.module.css";

interface ShareDropdownProps {
  url: string;
  title: string;
  isMobile?: boolean;
}

const ShareDropdown = ({
  url,
  title,
  isMobile = false,
}: ShareDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  // Updated for mobile to position underneath the button, preventing horizontal overflow
  const dropdownClasses = isMobile
    ? "absolute left-0 top-full mt-2 z-10 rounded-md shadow-lg ring-black ring-opacity-5 overflow-hidden bg-white"
    : "absolute left-0 mt-2 z-10 rounded-md shadow-lg ring-black ring-opacity-5 overflow-hidden bg-white";

  // Flex direction for the icons container:
  const iconsContainerClasses = isMobile
    ? "flex flex-row items-center justify-center p-3"
    : "flex flex-col items-center justify-center p-3";

  return (
    <div className="relative inline-block text-left pr-2">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center p-2 rounded-md hover:bg-gray-400"
      >
        <CiShare2 className="mr-2" size={30} />
        Share
      </button>
      {isOpen && (
        <div className={dropdownClasses}>
          <div className={iconsContainerClasses}>
            <FacebookShareButton url={url} className="m-1">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} className="m-1">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url} className="m-1">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url={url} className="m-1">
              <EmailIcon size={32} round />
            </EmailShareButton>
            <IoMdLink
              size={32}
              className="cursor-pointer m-1 transition-transform duration-150 ease-in-out active:scale-90"
              onClick={copyToClipboard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareDropdown;
