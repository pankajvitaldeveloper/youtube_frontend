import React from "react";
import { MdHome, MdSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { NavLink } from "react-router-dom";
import HeaderLeft from "./HeaderComponents/HeaderLeft";

const menuItems = [
  { icon: <MdHome />, label: "Home", path: "/" },
  { icon: <MdSubscriptions />, label: "Subscriptions", path: "/subscriptions" },
  { icon: <MdOutlineVideoLibrary />, label: "Library", path: "/library" },
  { icon: <MdSubscriptions />, label: "Shorts", path: "/shorts" },
  { icon: <MdOutlineVideoLibrary />, label: "History", path: "/history" },
  { icon: <MdOutlineVideoLibrary />, label: "Playlists", path: "/playlists" },
  {
    icon: <MdOutlineVideoLibrary />,
    label: "Your videos",
    path: "/your-videos",
  },
  {
    icon: <MdOutlineVideoLibrary />,
    label: "Watch Later",
    path: "/watch-later",
  },
];

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  const handleNavLinkClick = () => {
    // Close sidebar only on mobile screens (width < 768px)
    if (window.innerWidth < 768) {
      onToggleSidebar(false);
    }
  };
// transition-all duration-300 ease-in-out
  return (
    <div
      className={`
        fixed md:static top-[-50px] left-0 h-screen p-3  z-40 overflow-hidden
        bg-white dark:bg-black text-black dark:text-white
        /* mobile: slide in/out */
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
        /* desktop: collapsible width */
        ${isOpen ? "md:w-56 md:translate-x-0" : "md:w-20 md:translate-x-0"}
      `}
    >
      <ul className="space-y-2">
        <div className="block md:hidden pl-1 pb-5">
          <HeaderLeft onToggleSidebar={onToggleSidebar} />
        </div>
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            onClick={handleNavLinkClick} // Call handler to close sidebar on mobile
            className={({ isActive }) => `
              flex cursor-pointer p-2 rounded-lg transition-all duration-200
              ${
                isOpen ? "flex-row items-center gap-4" : "flex-col items-center"
              }
              ${
                isActive
                  ? "bg-gray-200 text-black font-semibold dark:bg-[#272727] dark:text-white"
                  : "hover:bg-gray-200 hover:text-black dark:hover:bg-[#272727] dark:hover:text-white"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen ? (
              <span className="text-sm">{item.label}</span>
            ) : (
              <span className="text-[10px] mt-1 text-center">{item.label}</span>
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;