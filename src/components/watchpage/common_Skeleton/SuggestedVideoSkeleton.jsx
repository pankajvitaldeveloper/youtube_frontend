import Skeleton from "./Skeleton";

const SuggestedVideoSkeleton = () => {
  return (
    <div className="flex gap-3 mb-4">
      <Skeleton className="h-24 w-40 rounded-md" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
};

export default SuggestedVideoSkeleton;
