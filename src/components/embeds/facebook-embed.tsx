'use client';

import dynamic from 'next/dynamic';

const FacebookEmbedImpl = dynamic(
  () => import('react-social-media-embed').then(m => m.FacebookEmbed),
  { ssr: false },
);

export function FacebookEmbed({ url }: { url: string }) {
  return (
    <div className="flex justify-center my-6">
      <FacebookEmbedImpl url={url} width="100%" />
    </div>
  );
}
