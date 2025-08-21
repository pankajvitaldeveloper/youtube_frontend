import React from 'react'

const VideoChannelNameSub = ({videoChannelName}) => {
  return (
    <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            {videoChannelName.channelId?.profileImage ? (
              <img
                src={videoChannelName.channelId.profileImage}
                alt={videoChannelName.channelId?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span>
                {videoChannelName.channelId?.name
                  ? videoChannelName.channelId.name.charAt(0).toUpperCase()
                  : "?"}
              </span>
            )}
          </div>

          <div>
            <h3 className="font-semibold dark:text-white">
              {videoChannelName.channelId?.name || "Unknown Channel"}
            </h3>
            <p className="text-gray-500 text-sm">
              {videoChannelName.channelId?.subscribers?.length > 0
                ? videoChannelName.channelId.subscribers.length
                : 10}{" "}
              subscribers
            </p>
          </div>
          <button className="ml-4 px-4 py-1.5 bg-[#272727] text-white rounded-full font-medium hover:text-gray-200 transition">
            Join
          </button>
          <button className="px-4 py-1.5 bg-gray-200 dark:bg-white text-black rounded-full font-medium hover:bg-gray-300 transition">
            Subscribe
          </button>
        </div>
  )
}

export default VideoChannelNameSub