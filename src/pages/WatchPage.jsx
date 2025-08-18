import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const getYouTubeId = (url) => {
  try {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  } catch {
    return null;
  }
};

const WatchPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/video/${id}`);
        const data = await res.json();
        console.log(data, "check")
        setVideo(data.videoById);
      } catch (err) {
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  const videoId = getYouTubeId(video.videoUrl);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Video Player */}
      <div className="flex-1">
        <div className="aspect-video w-full">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1`}
              title={video.title}
              className="w-full h-full rounded-md"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <video
              src={video.videoUrl}
              className="w-full h-full rounded-md"
              controls
              autoPlay
            />
          )}
        </div>

        {/* Video Info */}
        <h2 className="mt-4 text-xl font-bold dark:text-white">
          {video.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {video.channelId} • {video.viewers?.length || 0} views
        </p>
      </div>

      {/* Suggested Videos Sidebar */}
      <div className="w-full md:w-96">
        <h3 className="font-semibold mb-3 dark:text-white">
          Suggested Videos
        </h3>
        {/* TODO: Map through recommended videos */}
      </div>
    </div>
  );
};

export default WatchPage;
