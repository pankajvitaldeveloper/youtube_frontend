import { Link } from "react-router-dom";

// Reusing the existing helpers
const formatViews = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";
  return num + " views";
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

const VideoInfo = ({ video, channelName }) => {
  return (
    <div className="flex-1">
      <Link to={`/watch/${video._id}`}>
        <p className="font-medium dark:text-white line-clamp-2">{video.title}</p>
      </Link>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {channelName || "Unknown Channel"}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {formatViews(video.viewers?.length || 0)} • {timeAgo(video.uploadDate)}
      </p>
    </div>
  );
};

export default VideoInfo;