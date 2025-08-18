import React, { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const categories = [
  "All", "Web Development", "JavaScript", "Data Structures", "Music",
  "Gaming", "ReactJS", "Movies", "Sports", "News",
  "Gaming", "ReactJS", "Movies", "Sports", "News",
  "Web Development", "JavaScript", "Data Structures", "Music",
];

const CategorySlider = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // Small buffer for precision
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
      behavior: "smooth",
    });
    checkScroll();
  };

  return (
    <div className="relative flex items-center w-full px-4 py-2">
      {/* Left Button */}
      {canScrollLeft && (
        <button
          className="absolute left-0 p-2 rounded-full shadow-md z-10 bg-white text-black dark:bg-black dark:text-white"
          onClick={() => scroll("left")}
        >
          <MdChevronLeft className="text-2xl" />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex space-x-3 overflow-hidden"
      >
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 whitespace-nowrap rounded-lg transition-colors
              ${
                activeCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                  : "bg-gray-200 text-black dark:bg-[#272727] dark:text-white hover:bg-gray-300 dark:hover:bg-[#3f3f3f]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Button */}
      {canScrollRight && (
        <button
          className="absolute right-0 p-2 rounded-full shadow-md z-10 bg-white text-black dark:bg-black dark:text-white"
          onClick={() => scroll("right")}
        >
          <MdChevronRight className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default CategorySlider;