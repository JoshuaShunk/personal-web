(function () {
  var theme =
    localStorage.getItem("theme") ||
    document.documentElement.getAttribute("data-theme") ||
    "light";
  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
