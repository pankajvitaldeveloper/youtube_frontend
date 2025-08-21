
import VideoDescription from "./VideoDescription";
import VideoAction from "./VideoAction";
import VideoChannelNameSub from "./VideoChannelNameSub";

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
        <VideoChannelNameSub videoChannelName={video} />

        {/* Video Actions */}
        <VideoAction VideoAction={video} />

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
