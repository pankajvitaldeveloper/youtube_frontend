import React from "react";
import { MdHome, MdSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: <MdHome />, label: "Home", path: "/" },
  { icon: <MdSubscriptions />, label: "Subscriptions", path: "/subscriptions" },
  { icon: <MdOutlineVideoLibrary />, label: "Library", path: "/library" },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-56" : "w-20"
      } bg-white h-screen p-3 transition-all duration-300`}
    >
      <ul className=" space-y-2">
        {menuItems.map((item, idx) => (
          // NavLink replaces <li> — it wraps each menu item.
          // It has a className function: ({ isActive }) => True or False
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex cursor-pointer p-2 rounded-lg transition-all
              ${
                isOpen ? "flex-row items-center gap-4" : "flex-col items-center"
              }
              ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`
            }
          >
            {/* Icon */}
            <span className="text-xl">{item.icon}</span>

            {/* Label */}
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
