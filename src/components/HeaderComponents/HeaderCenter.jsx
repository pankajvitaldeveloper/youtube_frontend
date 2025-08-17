import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const HeaderCenter = ({ isSearchOpen, setIsSearchOpen }) => {
  return (
    <>
      {isSearchOpen ? (
        <div className="fixed inset-x-0 top-0 flex items-center bg-black px-4 py-2 z-50">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-2xl mr-4 text-white"
          >
            <IoArrowBack />
          </button>

          <div className="flex items-center flex-1 gap-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-[0.5px] border-gray-600 bg-black text-white rounded-l-full px-3 py-1.5 focus:outline-none"
            />
            <button className="px-4 py-2 bg-[#272727] border-[0.5px] border-l-0 border-gray-600 rounded-r-full">
              <IoSearchOutline className="text-xl text-white" />
            </button>
          </div>

          <button className="ml-4 p-2 ">
            <FaMicrophone className="text-lg text-white" />
          </button>
        </div>
      ) : (
        <div className="hidden md:flex items-center flex-1 max-w-xl px-4">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-[0.5px] border-black dark:border-[#272727] dark:bg-black text-black dark:text-white rounded-l-full px-4 py-1 focus:outline-none"
            />
            <button className="px-4 py-1 bg-white dark:bg-[#272727] border-[0.5px] border-l-0 border-black dark:border-[#272727] rounded-r-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
              <IoSearchOutline className="text-xl" />
            </button>
          </div>
          <button className="ml-3 p-2 border-[0.5px] border-black dark:border-[#272727] rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
            <FaMicrophone className="text-lg" />
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderCenter;