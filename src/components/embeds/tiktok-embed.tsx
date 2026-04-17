'use client';

import dynamic from 'next/dynamic';

const TikTokEmbedImpl = dynamic(
  () => import('react-social-media-embed').then(m => m.TikTokEmbed),
  { ssr: false },
);

export function TiktokEmbed({ url }: { url: string }) {
  return (
    <div className="flex justify-center my-6">
      <TikTokEmbedImpl url={url} width="100%" />
    </div>
  );
}
