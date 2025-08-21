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

const VideoPlayer = ({ video }) => {
  const videoId = getYouTubeId(video.videoUrl);

  return (
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
  );
};

export default VideoPlayer;
