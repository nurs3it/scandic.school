'use client';

import dynamic from 'next/dynamic';

const InstagramEmbedImpl = dynamic(
  () => import('react-social-media-embed').then(m => m.InstagramEmbed),
  { ssr: false },
);

export function InstagramEmbed({ url }: { url: string }) {
  return (
    <div className="flex justify-center my-6">
      <InstagramEmbedImpl url={url} width="100%" />
    </div>
  );
}
