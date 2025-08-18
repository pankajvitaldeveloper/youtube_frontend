import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import CategorySlider from "../CategorySlider";

const FrontendLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);

  // Update sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header onToggleSidebar={handleToggleSidebar} />
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 pt-16"> {/* pt-16 = header height (64px) */}
        
        {/* Backdrop for mobile overlay */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-[#00000080] sm:bg-[#00000075] z-60"
            onClick={handleToggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div className="fixed top-13 h-[calc(100vh-4rem)] z-50">
          <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        </div>

        {/* Main content with fixed CategorySlider */}
        <main
          className={`
            flex-1 overflow-y-auto bg-white dark:bg-black text-black dark:text-white
            ${isSidebarOpen ? "md:ml-56" : "md:ml-20"}
          `}
        >
          {/* ✅ Fixed Category Slider  border-b border-gray-200 dark:border-gray-700 */}
          <div className="fixed top-13 left-0 right-0 z-40 bg-white dark:bg-black ">
            <div className={`${isSidebarOpen ? "md:ml-56" : "md:ml-20"} px-4 py-2`}>
              <CategorySlider />
            </div>
          </div>

          {/* ✅ Push content down so it’s not hidden under category slider */}
          <div className="pt-18 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FrontendLayout;
