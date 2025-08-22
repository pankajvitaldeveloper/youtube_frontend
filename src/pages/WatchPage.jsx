import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoById, fetchAllVideos } from "../redux/slices/videoSlice";

import VideoPlayer from "../components/watchpage/VideoPlayer";
import VideoInfo from "../components/watchpage/VideoInfo";
import SuggestedVideos from "../components/watchpage/SuggestedVideos";
import CommentSection from "../components/watchpage/CommentSection";

import VideoSkeleton from "../components/watchpage/common_Skeleton/VideoSkeleton";
import SuggestedVideoSkeleton from "../components/watchpage/common_Skeleton/SuggestedVideoSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // ✅ use allItems from slice, alias it as allVideos
  const { currentVideo, allItems: allVideos, loading, error } = useSelector(
    (state) => state.videos
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchVideoById(id));   // load current video
      dispatch(fetchAllVideos());     // load all videos
    }
  }, [dispatch, id]);

  // ✅ now logs correctly
  console.log("🔹 All Videos from Redux:", allVideos);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-6 px-3 md:px-6 lg:px-12 xl:px-20">
        <div className="flex-1">
          <VideoSkeleton />
        </div>
        <div className="w-full md:w-96">
          {[...Array(6)].map((_, i) => (
            <SuggestedVideoSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="p-4 text-center text-red-500">Error: {error}</p>;
  if (!currentVideo) return <p className="p-4 text-center">Video not found</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 px-3 md:px-6 lg:px-12 xl:px-20">
      {/* Left Side (Video + Info + Comments) */}
      <div className="flex-1">
        <VideoPlayer video={currentVideo} />
        <VideoInfo video={currentVideo} />
        <CommentSection videoId={id} />
      </div>

      {/* Right Side (Suggested Videos) */}
      <div className="w-full md:w-96">
        <SuggestedVideos currentVideoId={id} allVideos={allVideos} />
      </div>
    </div>
  );
};

export default WatchPage;
