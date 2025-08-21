import React from "react";
import { NavLink } from "react-router-dom";
import HeaderLeft from "./HeaderComponents/HeaderLeft";
import { mainMenu, youMenu, exploreMenu } from "./ui/Sidebar";

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  const handleNavLinkClick = () => {
    if (window.innerWidth < 768) onToggleSidebar(false); // Close on click for mobile
  };

  // Show only first 3 items when closed
  const visibleMainMenu = isOpen ? mainMenu : mainMenu.slice(0, 3);

  const renderSection = (title, items) => (
    <>
      {isOpen && title && (
        <h2 className="px-3 pt-3 pb-1 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      )}
      {items.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          onClick={handleNavLinkClick}
          className={({ isActive }) => `
            flex cursor-pointer ml-3 py-2 px-1 rounded-lg transition-all duration-200 
            ${isOpen ? "flex-row items-center gap-4" : "flex-col items-center justify-center"}
            ${isActive
              ? "bg-gray-200 text-gray-900 font-semibold dark:bg-[#272727] dark:text-white"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-[#272727] dark:hover:text-white"}
          `}
        >
          <span className="text-xl">{item.svg}</span>
          {isOpen ? (
            <span className="text-sm">{item.name}</span>
          ) : (
            <span className="text-[11px] mt-1 text-center">{item.name}</span>
          )}
        </NavLink>
      ))}
    </>
  );

  return (
    <div
      className={`
        fixed md:static top-0 sm:top-13 left-0 h-screen py-3 z-40 overflow-y-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded
        bg-white dark:bg-[#000] text-gray-700 dark:text-gray-200
         scroll-container 
        ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
        ${isOpen ? "md:w-56 md:translate-x-0" : "md:w-16 md:translate-x-0"}
        ${!isOpen && "md:overflow-hidden"}
      `}
    //  transition-all duration-300 ease-in-out
    >
      <ul className="space-y-2 ml-2 mr-2">
        {/* Mobile Hamburger Header - Only visible when sidebar can be toggled */}
        <div className="block md:hidden pl-1 pb-5">
          <HeaderLeft onToggleSidebar={onToggleSidebar} />
        </div>

        {/* Main Menu */}
        {renderSection(null, visibleMainMenu)}

        {/* Show dividers + other sections ONLY if open */}
        {isOpen && <hr className="my-2 border-gray-300 dark:border-gray-600" />}
        {isOpen && renderSection("You", youMenu)}

        {isOpen && <hr className="my-2 border-gray-300 dark:border-gray-600" />}
        {isOpen && renderSection("Explore", exploreMenu)}
      </ul>
    </div>
  );
};

export default Sidebar;