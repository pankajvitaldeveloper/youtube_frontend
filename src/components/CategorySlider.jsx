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
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (direction) => {
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Left Button */}
      {canScrollLeft && (
        <button
          className="absolute left-0  p-2 rounded-full shadow-md z-10 bg-white text-black dark:bg-black dark:text-white "
          onClick={() => scroll("left")}
        >
          <MdChevronLeft className="text-2xl" />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex space-x-3 overflow-hidden" // 🔹 block manual scroll
      >
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 whitespace-nowrap rounded-lg transition-colors
              ${
                activeCategory === cat
                  ? "bg-black text-white border dark:bg-white dark:text-black"
                  : "bg-gray-200 text-black dark:bg-[#272727] dark:text-white cursor-pointer hover:bg-black hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Button */}
      {canScrollRight && (
        <button
          className="absolute right-0 bg-white text-black dark:bg-black dark:text-white p-2 rounded-full text-sm shadow-md z-10"
          onClick={() => scroll("right")}
        >
          <MdChevronRight className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default CategorySlider;
