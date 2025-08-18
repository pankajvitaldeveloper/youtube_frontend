import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const HeaderLeft = ({ onToggleSidebar }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onToggleSidebar}
        className="text-2xl cursor-pointer text-black bg-white dark:bg-black dark:text-white"
      >
        <GiHamburgerMenu />
      </button>

      {/* Logo */}
      <Link to="/"> <img
        src="/img/logo-b.png"
        alt="Logo"
        className="h-6 cursor-pointer block dark:hidden"
      /></Link>
     <Link to="/"> 
      <img
        src="/img/logo.png"
        alt="Logo"
        className="h-6 cursor-pointer hidden dark:block"
      />
      </Link>
    </div>
  );
};

export default HeaderLeft;