'use client';

interface VimeoEmbedProps { videoId: string; }

export function VimeoEmbed({ videoId }: VimeoEmbedProps) {
  return (
    <div className="relative w-full aspect-video my-6 overflow-hidden rounded-xl shadow-md">
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        title="Vimeo video"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
