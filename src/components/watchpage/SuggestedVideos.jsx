import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelById } from "../../redux/slices/channelSlice";
import VideoCard from "./suggestedVideos/VideoCard";
import AllVideoSuggestion from "./suggestedVideos/AllVideoSuggestion";

const SuggestedVideos = ({ currentVideoId, allVideos }) => {
  const dispatch = useDispatch();
  const { currentVideo } = useSelector((state) => state.videos);
  const { currentChannel, loading } = useSelector((state) => state.channel);

  const [hoveredId, setHoveredId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // ✅ pagination for all videos
  const [visibleCount, setVisibleCount] = useState(8);

  // ✅ fetch channel details only for current video
  useEffect(() => {
    if (currentVideo?.channelId?._id) {
      dispatch(fetchChannelById(currentVideo.channelId._id));
    }
  }, [currentVideo, dispatch]);

  if (loading) return <p className="text-gray-500">Loading suggestions...</p>;
  if (!currentChannel) return null;

  // ✅ filter current video out of channel videos
  const channelVideos = (currentChannel.videos || [])
  // .filter(
  //   (vid) => vid._id !== currentVideoId
  // );
  const displayedChannelVideos = showAll
    ? channelVideos
    : channelVideos.slice(0, 8);

  // ✅ show limited global videos
  const displayedAllVideos = allVideos.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* 🔹 Suggestions Section - From Same Channel */}
      <div>
        <h3 className="font-semibold mb-3 dark:text-white">
          More from {currentChannel?.name}
        </h3>

        {displayedChannelVideos.length ? (
          <div className="space-y-3">
            {displayedChannelVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                channelName={currentChannel?.name}
              />
            ))}

            {channelVideos.length > 8 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-3 text-blue-500 hover:underline text-sm"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No other videos yet</p>
        )}
      </div>

      {/* 🔹 Global All Videos Section */}
      <div>
        <h3 className="font-semibold mb-3 dark:text-white">All Videos</h3>
        <div className="flex flex-wrap gap-3">
          {displayedAllVideos.length > 0 ? (
            displayedAllVideos.map((video) => (
              <AllVideoSuggestion
                key={video._id}
                video={video}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No videos available</p>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < allVideos.length && (
          <button 
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="mt-4 text-black dark:text-white hover:underline text-sm"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestedVideos;
