import Skeleton from "./Skeleton";
const VideoSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Video player placeholder */}
      <Skeleton className="w-full h-64 md:h-96 rounded-lg" />

      {/* Video title */}
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />

      {/* Channel + Subscribe row */}
      <div className="flex items-center gap-3 mt-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      {/* Comments placeholder */}
      <div className="mt-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSkeleton;
