import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiShare, BiDownload } from "react-icons/bi";

import { BsThreeDots } from "react-icons/bs";
const VideoAction = ({VideoAction}) => {
  return (
    
    <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-[#403f41] transition">
            <AiOutlineLike size={18} /> {VideoAction.likes || "69K"}
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-[#403f41] transition">
            <AiOutlineDislike size={18} />
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-[#403f41] transition">
            <BiShare size={18} /> Share
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-[#403f41] transition">
            <BiDownload size={18} /> Download
          </button>
          <button className="px-2 py-1 bg-gray-200 dark:bg-[#272727] text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-[#403f41] transition">
            <BsThreeDots size={18} />
          </button>
        </div>
  );
};

export default VideoAction;
