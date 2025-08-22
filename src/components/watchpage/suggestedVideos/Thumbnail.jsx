import { Link } from "react-router-dom";

const Thumbnail = ({ video, hoveredId, videoId }) => {
  return (
    <div className="relative w-40 h-24 flex-shrink-0">
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
  );
};

export default Thumbnail;