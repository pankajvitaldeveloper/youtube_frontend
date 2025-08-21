import { useState } from "react";

const VideoDescription = ({ description }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-2 text-sm">
      {/* Always show perks line */}
      <div className="flex items-center">
        <span className="mr-1">❤️</span>
        <span>
          Join this channel to get access to perks...
        </span>

        {/* Show more button beside perks */}
        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="ml-2 text-white hover:underline"
          >
            Show more
          </button>
        )}
      </div>

      {/* Expand full description */}
      {showMore && (
        <div className="mt-2">
          <p className="text-gray-700 dark:text-gray-300">{description}</p>

          <button
            onClick={() => setShowMore(false)}
            className="mt-1 text-white hover:underline"
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoDescription;
