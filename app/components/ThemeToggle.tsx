// This script defines a React component for toggling between light and dark themes.
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Used for storing theme preference in cookies.
import { useTheme } from "next-themes"; // Provides theme switching functionality using Next.js themes.

// Props definition for the ThemeToggle component.
interface ThemeToggleProps {
  scale?: number; // Scale factor for the icon size.
  className?: string; // Additional CSS classes to apply.
}

// Functional component for theme toggling.
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  scale = 1, // Default scale is 1.
  className = "", // Default className is an empty string.
}) => {
  const { theme, setTheme, systemTheme } = useTheme(); // Extracts theme control functions from the hook.
  const [mounted, setMounted] = useState(false); // State to check if component has mounted.

  // Determines if dark mode is currently enabled.
  const isDarkMode =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  // Function to toggle the current theme.
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme); // Toggle theme
    Cookies.set("theme", newTheme, { path: "/" }); // Save the new theme preference to cookies.
  };

  // useEffect to synchronize theme with system or cookie settings upon component mount.
  useEffect(() => {
    if (typeof window === "undefined") return; // Exit if running in a non-browser environment.

    const cookieTheme = Cookies.get("theme"); // Retrieve theme preference from cookies.
    const currentTheme = document.documentElement.getAttribute("data-theme"); // Current theme set on the document element.

    // If the theme in cookies or document is different from the current theme state, update it.
    if (cookieTheme && theme !== cookieTheme) {
      setTheme(cookieTheme);
      document.documentElement.setAttribute("data-theme", cookieTheme);
    } else if (currentTheme && theme !== currentTheme) {
      setTheme(currentTheme);
    }

    setMounted(true); // Confirm that the component has mounted.
  }, [theme, setTheme]);

  // Style object for scaling the toggle button.
  const toggleStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "center center",
    transition: "transform 0.2s ease",
  };

  // Calculating icon size based on the scale prop.
  const iconSize = 10 * scale;

  // Render nothing if the component has not mounted.
  if (!mounted) {
    return null;
  }

  // Component render JSX.
  return (
    <label className={`swap swap-rotate ${className}`} style={toggleStyle}>
      <input
        type="checkbox"
        className="theme-controller"
        onChange={toggleTheme}
        checked={isDarkMode} // Checkbox is checked if dark mode is active.
      />
      {/* Sun Icon for light mode */}
      <svg
        className="swap-off fill-current"
        width={`${iconSize}px`}
        height={`${iconSize}px`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {/* SVG path data for sun icon */}
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* Moon Icon for dark mode */}
      <svg
        className="swap-on fill-current"
        width={`${iconSize}px`}
        height={`${iconSize}px`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {/* SVG path data for moon icon */}
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
};

export default ThemeToggle;
