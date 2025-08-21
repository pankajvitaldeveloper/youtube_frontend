import { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiShare, BiDownload } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import VideoDescription from "./VideoDescription";

const VideoInfo = ({ video }) => {

  return (
    <div className="mt-4">
      {/* Title */}
      <h2 className="text-xl font-bold dark:text-white">{video.title}</h2>

      {/* Views + Upload Date */}
      <div className="text-gray-600 dark:text-gray-400 text-sm mt-1 flex items-center">
        <span>{video.viewers?.length || "2.7M"} views</span>
        <span className="mx-2">•</span>
        <span>
          {new Date(video.uploadDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Channel + Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Channel Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
  {video.channelId?.profileImage ? (
    <img
      src={video.channelId.profileImage}
      alt={video.channelId?.name}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <span>
      {video.channelId?.name ? video.channelId.name.charAt(0).toUpperCase() : "?"}
    </span>
  )}
</div>

          <div>
            <h3 className="font-semibold dark:text-white">
              {video.channelId?.name || "Unknown Channel"}
            </h3>
            <p className="text-gray-500 text-sm">
  {(video.channelId?.subscribers?.length > 0 
    ? video.channelId.subscribers.length 
    : 10
  )} subscribers
</p>


          </div>
          <button className="ml-4 px-4 py-1.5 bg-[#272727] text-white rounded-full font-medium hover:text-gray-200 transition">
            Join
          </button>
          <button className="px-4 py-1.5 bg-gray-200 dark:bg-white text-black rounded-full font-medium hover:bg-gray-300 transition">
            Subscribe
          </button>
        </div>

        {/* Video Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full">
            <AiOutlineLike size={18} /> {video.likes?.length || "69K"}
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full">
            <AiOutlineDislike size={18} />
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full">
            <BiShare size={18} /> Share
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full">
            <BiDownload size={18} /> Download
          </button>
          <button className="px-2 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full">
            <BsThreeDots size={18} />
          </button>
        </div>
      </div>

      {/* Description Box */}
      <div className="mt-4 p-4 bg-gray-100 dark:bg-[#272727] rounded-lg">
        <p className="text-gray-800 dark:text-gray-200 line-clamp-2">
          {video.description}
        </p>
      

        {/* Channel description toggle */}
        <VideoDescription description={video.description} />

      </div>
    </div>
  );
};

export default VideoInfo;
