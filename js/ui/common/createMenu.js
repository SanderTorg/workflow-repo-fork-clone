import { getUsername } from "../../utils/storage.js";
import { isActivePath } from "../../utils/userInterface.js";

export function createMenu() {
  const container = document.querySelector("#menu-container");
  if (!container) {
    console.warn(
      "createMenu: #menu-container not found. Menu will not be rendered."
    );
    return;
  }
  const currentPath = window.location.pathname;
  const username = getUsername();

  const createNavLink = (href, text) => {
    const isActive = isActivePath(href, currentPath) && text !== "Logo";
    const activeClass = isActive
      ? "text-blue-300"
      : "text-white hover:text-blue-200";
    return `<a href="${href}" class="${activeClass} py-2 px-3 font-medium transition-colors duration-200 ${
      isActive ? "font-bold" : ""
    }">${text}</a>`;
  };

  let authLink = createNavLink("/auth/login", "Login");

  if (username) {
    authLink = `
      <span class="text-white mr-4">Hi ${username}</span>
      <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
        Logout
      </button>
    `;
  }

  container.innerHTML = `
    <nav class="flex justify-between items-center p-4 bg-gray-800">
      <div class="flex items-center space-x-4">
        ${createNavLink("/", "Logo")}

      </div>
      <div class="flex items-center space-x-4">
      ${createNavLink("/", "Home")}
        ${authLink}
        ${username ? "" : createNavLink("/auth/register", "Register")}
      </div>
    </nav>
  `;
}
