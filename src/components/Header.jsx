import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone, FaBell, FaVideo } from "react-icons/fa";

const Header = ({ onToggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-md bg-white">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-4 ml-2">
        <button onClick={onToggleSidebar} className="text-2xl cursor-pointer">
          <GiHamburgerMenu />
        </button>
        <img src="/img/logo-b.png" alt="Logo" className="h-6 cursor-pointer" />
      </div>

      {/* Center: Search */}
      <div className="flex items-center flex-1 max-w-xl px-4">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-l-full px-4 py-1 focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
            <IoSearchOutline className="text-xl" />
          </button>
        </div>
        <button className="ml-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <FaMicrophone className="text-lg" />
        </button>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <FaVideo className="text-xl cursor-pointer" />
        <FaBell className="text-xl cursor-pointer" />
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white cursor-pointer">
          A
        </div>
      </div>
    </nav>
  );
};

export default Header;
