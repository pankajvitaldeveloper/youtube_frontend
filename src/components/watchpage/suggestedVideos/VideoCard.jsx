import { useState } from "react";
import Thumbnail from "./Thumbnail";
import VideoInfo from "./VideoInfo";
import { BsThreeDotsVertical } from "react-icons/bs";

const VideoCard = ({ video, hoveredId, setHoveredId, channelName }) => {

  return (
    <div
      className="flex gap-3 group"
      onMouseEnter={() => setHoveredId(video._id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <Thumbnail video={video} hoveredId={hoveredId} videoId={video._id} />
      <VideoInfo video={video} channelName={channelName} />
      <div className="relative flex items-start">
        <button
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none text-gray-500 hover:text-black dark:hover:text-white"
        >
          <BsThreeDotsVertical size={18} />
        </button>
       
      </div>
    </div>
  );
};

export default VideoCard;