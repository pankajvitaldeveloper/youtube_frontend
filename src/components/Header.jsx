import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone, FaBell, FaVideo } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

const Header = ({ onToggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-md bg-white dark:bg-black text-black dark:text-white">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-4 ml-2">
        <button onClick={onToggleSidebar} className="text-2xl cursor-pointer">
          <GiHamburgerMenu />
        </button>
        <img
          src="/img/logo-b.png"
          alt="Logo"
          className="h-6 cursor-pointer block dark:hidden"
        />
        {/* Dark mode logo */}
        <img
          src="/img/logo.png"
          alt="Logo"
          className="h-6 cursor-pointer hidden dark:block"
        />
      </div>

      {/* Center: Search */}
      <div className="flex items-center flex-1 max-w-xl px-4">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full border-[0.5px] border-black dark:border-[#272727]  dark:bg-black text-black dark:text-white rounded-l-full px-4 py-1 focus:outline-none"
          />
          <button className="px-4 py-1 bg-white dark:bg-[#272727] border-[0.5px] border-l-0 border-[#272727] dark:border-[#272727] rounded-r-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
            <IoSearchOutline className="text-xl" />
          </button>
        </div>
        <button className="ml-3 p-2 bg-white dark:bg-[#272727] border-[0.5px] border-black dark:border-[#272727] rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
          <FaMicrophone className="text-lg" />
        </button>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <FaVideo className="text-xl cursor-pointer hover:text-black dark:hover:text-white" />
        <FaBell className="text-xl cursor-pointer hover:text-black dark:hover:text-white" />
        <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black cursor-pointer">
          A
        </div>
      </div>
    </nav>
  );
};

export default Header;
