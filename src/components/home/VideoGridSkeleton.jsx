const VideoGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    {[...Array(6)].map((_, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-black shadow rounded-lg overflow-hidden"
      >
        <div className="aspect-video w-full bg-gray-200 dark:bg-[#272727] animate-pulse rounded-md"></div>
        <div className="p-4 space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-[#272727] rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-[#272727] rounded animate-pulse"></div>
          <div className="h-3 w-1/3 bg-gray-200 dark:bg-[#272727] rounded animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

export default VideoGridSkeleton;