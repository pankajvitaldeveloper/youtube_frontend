import { Link } from "react-router-dom";
import { useState } from "react";

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white dark:bg-black rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail / Hover Video */}
      <div className="aspect-video w-full relative cursor-pointer">
        {isHovered ? (
          <iframe
            src={`https://www.youtube.com/embed/${
              video.videoUrl.split("v=")[1]
            }?autoplay=1&mute=1&controls=0&loop=1`}
            title={video.title}
            className="w-full h-full rounded-md"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover rounded-md"
          />
        )}

        {/* Transparent clickable layer for navigation */}
        <Link to={`/watch/${video._id}`} className="absolute inset-0 z-10" />
      </div>

      {/* Video Info Section */}
      <div className="p-3 flex gap-3">
        {/* Channel Profile Image */}
        {video.channelId?.profileImage ? (
          <img
            src={video.channelId?.profileImage}
            alt={video.channelId?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            {video.channelId?.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1">
          {/* Title */}
          <Link to={`/watch/${video._id}`}>
            <h3 className="text-sm font-semibold dark:text-white line-clamp-2">
              {video.title}
            </h3>
          </Link>

          {/* Channel Name */}
          <Link to={`/channel/${video.channelId}`}>
            <p className="text-sm text-gray-600 dark:text-gray-400 hover:text-white">
            {video.channelId?.name || "Unknown Channel"}
          </p>
          </Link>

          {/* Meta Info */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {video.viewers?.length || 0} views •{" "}
            {new Date(video.uploadDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
