import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const FrontendLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);

  // ✅ Only update initial state when screen crosses breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // keep sidebar as is (don’t force open)
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
    <div className="flex flex-col h-screen">
  {/* Header */}
  <Header onToggleSidebar={handleToggleSidebar} />

  {/* Sidebar + Main Content */}
  <div className="flex flex-1 overflow-hidden relative">
    {/* Backdrop for mobile overlay */}
    {isSidebarOpen && window.innerWidth < 768 && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={handleToggleSidebar}
      ></div>
    )}

    {/* Sidebar */}
    <Sidebar isOpen={isSidebarOpen} />

    {/* Main content */}
    <main className="flex-1 overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default FrontendLayout;
