import React, { useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const HeaderCenter = ({ isSearchOpen, setIsSearchOpen }) => {
    const searchRef = useRef(null);
 // Close search if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);
  return (
    <>
      {isSearchOpen ? (
        // Mobile search active
        <div ref={searchRef}
 className="fixed inset-x-0 top-0 flex items-center bg-white dark:bg-black px-4 py-2 z-50">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-2xl mr-4 text-black dark:text-white"
          >
            <IoArrowBack />
          </button>

          <div className="flex items-center flex-1 gap-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white rounded-l-full px-3 py-1.5 focus:outline-none"
            />
            <button className="px-4 py-2 bg-gray-100 dark:bg-[#272727] border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full">
              <IoSearchOutline className="text-xl text-black dark:text-white" />
            </button>
          </div>

          <button className="ml-4 p-2">
            <FaMicrophone className="text-lg text-black dark:text-white" />
          </button>
        </div>
      ) : (
        // Desktop search (default header)
        <div className="hidden md:flex items-center flex-1 max-w-xl px-4">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 dark:border-[#272727] bg-white dark:bg-black text-black dark:text-white rounded-l-full px-4 py-1 focus:outline-none"
            />
            <button className="px-4 py-1 bg-gray-200 dark:bg-[#272727] border border-l-0 border-gray-300 dark:border-[#272727] rounded-r-full hover:bg-white hover:text-white dark:hover:bg-black dark:hover:text-white cursor-pointer">
              <IoSearchOutline className="text-xl text-black dark:text-white" />
            </button>
          </div>
          <button className="ml-3 p-2 border bg-gray-200 border-gray-300 dark:bg-[#272727] dark:border-[#272727] rounded-full hover:bg-white hover:text-white dark:hover:bg-black cursor-pointer dark:hover:text-black">
            <FaMicrophone className="text-lg text-black dark:text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderCenter;
