import React, { useState } from "react";
import HeaderLeft from "./HeaderComponents/HeaderLeft";
import HeaderCenter from "./HeaderComponents/HeaderCenter";
import HeaderRight from "./HeaderComponents/HeaderRight";



const Header = ({ onToggleSidebar }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-md bg-white dark:bg-black text-black dark:text-white relative z-40">
      <HeaderLeft onToggleSidebar={onToggleSidebar} />
      <HeaderCenter isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      <HeaderRight isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </nav>
  );
};

export default Header;