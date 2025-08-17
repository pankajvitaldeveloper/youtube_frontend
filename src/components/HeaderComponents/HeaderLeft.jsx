import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderLeft = ({ onToggleSidebar }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onToggleSidebar}
        className="text-2xl cursor-pointer text-white"
      >
        <GiHamburgerMenu />
      </button>

      {/* Logo */}
      <img
        src="/img/logo-b.png"
        alt="Logo"
        className="h-6 cursor-pointer block dark:hidden"
      />
      <img
        src="/img/logo.png"
        alt="Logo"
        className="h-6 cursor-pointer hidden dark:block"
      />
    </div>
  );
};

export default HeaderLeft;