import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet, useLocation } from "react-router-dom";
import CategorySlider from "../CategorySlider";

const FrontendLayout = () => {
  const location = useLocation();
  const isWatchPage = location.pathname.startsWith("/watch");

  // Sidebar state: open on desktop (except watch page), closed on mobile/watch page
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => !isWatchPage && window.innerWidth >= 768
  );

  // Reset sidebar whenever route changes
  useEffect(() => {
    if (isWatchPage) {
      setIsSidebarOpen(false);
    } else if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, [isWatchPage]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isWatchPage) {
        setIsSidebarOpen(window.innerWidth >= 768);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isWatchPage]);

  // Toggle sidebar (works for mobile + watch page)
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Header - fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header onToggleSidebar={handleToggleSidebar} />
      </div>

      <div className="flex flex-1 pt-13">
        {/* Backdrop for mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-[#00000080] sm:bg-[#00000075] z-50 md:hidden"
            onClick={handleToggleSidebar}
          />
        )}

        {/* ✅ Single Sidebar component for both desktop + mobile */}
        <div
          className={`
            fixed top-0 sm:top-13 h-[calc(100vh-4rem)] z-50 transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            ${!isWatchPage ? "md:translate-x-0" : ""}
          `}
        >
          <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        </div>

        {/* Main content */}
        <main
          className={`
            flex-1 overflow-y-auto bg-white dark:bg-black text-black dark:text-white
            ${!isWatchPage && (isSidebarOpen ? "md:ml-56" : "md:ml-20")}
          `}
        >
          {/* Category Slider (hidden on watch page) */}
          {!isWatchPage && (
            <div className="fixed top-13 left-0 right-0 z-40 bg-white dark:bg-black">
              <div className={`${isSidebarOpen ? "md:ml-56" : "md:ml-20"} px-4 py-2`}>
                <CategorySlider />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`${!isWatchPage ? "pt-20 px-4 sm:px-6 lg:px-8" : "pt-4"}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FrontendLayout;
