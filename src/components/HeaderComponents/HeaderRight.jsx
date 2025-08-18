import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ThemeToggle from "../ThemeToggle";

const HeaderRight = ({setIsSearchOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {/* Mobile: search icon */}
      <button
        className="md:hidden text-xl cursor-pointer text-black bg-white dark:bg-black dark:text-white"
        onClick={() => setIsSearchOpen(true)}
      >
        <IoSearchOutline />
      </button>
      <ThemeToggle />

      {/* Profile dropdown */}
      <div className="relative" ref={profileRef}>
        <div
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black cursor-pointer"
        >
          A
        </div>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-black border border-gray-200 dark:border-[#272727] rounded-lg shadow-lg overflow-hidden z-50">
            {/* Top: Profile Info */}
            <div className="p-4 border-b border-gray-200 dark:border-[#272727]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold">Your Name</p>
                  <p className="text-sm text-gray-500">@username123</p>
                  <a
                    href="/channel"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View your channel
                  </a>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <ul className="text-sm">
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                Google Account
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                Switch account
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                Sign out
              </li>
              <hr className="my-1 border-gray-200 dark:border-[#272727]" />
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                YouTube Studio
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                Purchases and memberships
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                Your data in YouTube
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer">
                Appearance: Light/Dark
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderRight;