import React, { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosByCategory, fetchAllVideos } from "../redux/slices/videoSlice";

const CategorySlider = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const dispatch = useDispatch();
  const { items, allItems } = useSelector((state) => state.videos); 
  // 👆 we'll store both "all videos" and "filtered videos" in the slice

  // ✅ dynamic categories should always come from `allItems` (never filtered ones)
  const categories = ["All", ...new Set(allItems.map((v) => v.category))];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchAllVideos()); // load all videos initially
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [dispatch]);

  const scroll = (direction) => {
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
      behavior: "smooth",
    });
    checkScroll();
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      dispatch(fetchAllVideos());
    } else {
      dispatch(fetchVideosByCategory(cat));
    }
  };

  return (
    <div className="relative flex items-center w-full px-4 py-1">
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
            onClick={() => handleCategoryClick(cat)}
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
