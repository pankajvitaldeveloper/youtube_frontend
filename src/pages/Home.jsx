import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../redux/slices/videoSlice";

import VideoGridSkeleton from "../components/home/VideoGridSkeleton";
import VideoCard from "../components/home/VideoCard";
import CategorySliderSkeleton from "../components/home/CategorySliderSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchAllVideos());
  }, [dispatch]);

  if (loading) return (
    <div className="px-5">
      <CategorySliderSkeleton />
      <VideoGridSkeleton />
    </div>
  );
  if (error) return <div className="px-5 py-3 text-center">
    <p className="inline-block px-4 py-2 rounded-lg bg-red-100 text-red-600 font-medium shadow-sm">
      ⚠️ "No results found"
    </p>
  </div>;

  return (
    <div className="px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <p className="text-gray-500 text-center dark:text-gray-400">No videos found</p>
        )}
      </div>
    </div>
  );
};

export default Home;