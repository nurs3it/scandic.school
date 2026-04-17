'use client';

interface YoutubeEmbedProps { videoId: string; }

export function YoutubeEmbed({ videoId }: YoutubeEmbedProps) {
  return (
    <div className="relative w-full aspect-video my-6 overflow-hidden rounded-xl shadow-md">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
