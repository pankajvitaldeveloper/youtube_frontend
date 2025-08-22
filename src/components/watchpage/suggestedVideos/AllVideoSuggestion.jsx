import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const AllVideoSuggestion = ({ video, hoveredId, setHoveredId }) => {
  const videoId = video._id;

  return (
    <div className="flex gap-3 mb-4">
      {/* Thumbnail with hover video preview */}
      <div
        className="relative w-40 h-24 flex-shrink-0"
        onMouseEnter={() => setHoveredId(videoId)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {hoveredId === videoId && video.videoUrl?.includes("youtube.com") ? (
          <iframe
            src={`https://www.youtube.com/embed/${
              video.videoUrl.split("v=")[1]
            }?autoplay=1&mute=1&controls=0&loop=1&playlist=${
              video.videoUrl.split("v=")[1]
            }`}
            title={video.title}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        <Link to={`/watch/${videoId}`} className="absolute inset-0" />
      </div>

      {/* Right Section (title, channel, views, etc.) */}
      <div className="flex flex-col flex-1">
        <Link to={`/watch/${videoId}`}>
        <h3 className="text-sm font-semibold line-clamp-2">
          {video.title || "Untitled Video"}
        </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-1">{video.channelId?.name || "Unknown Channel"}</p>
        <p className="text-xs text-gray-400">
          {video.views || "0"} views • {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Recently"}
        </p>
      </div>

      {/* Static 3 dots */}
      <div className="flex items-start">
        <BsThreeDotsVertical className="text-gray-400 text-lg cursor-pointer" />
      </div>
    </div>
  );
};

export default AllVideoSuggestion;
