const CategorySliderSkeleton = () => (
  <div className="fixed top-13 left-0 right-0 z-30 bg-white dark:bg-black px-4 py-2 shadow-sm">
    <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="h-8 w-24 bg-gray-200 dark:bg-[#272727] rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);

export default CategorySliderSkeleton;