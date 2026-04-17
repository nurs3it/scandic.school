'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { remarkEmbeds } from '@/lib/remark-embeds';
import { YoutubeEmbed } from '@/components/embeds/youtube-embed';
import { VimeoEmbed } from '@/components/embeds/vimeo-embed';
import { InstagramEmbed } from '@/components/embeds/instagram-embed';
import { TiktokEmbed } from '@/components/embeds/tiktok-embed';
import { FacebookEmbed } from '@/components/embeds/facebook-embed';

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'youtube-embed',
    'vimeo-embed',
    'instagram-embed',
    'tiktok-embed',
    'facebook-embed',
  ],
  attributes: {
    ...defaultSchema.attributes,
    'youtube-embed': ['videoId'],
    'vimeo-embed': ['videoId'],
    'instagram-embed': ['url'],
    'tiktok-embed': ['url'],
    'facebook-embed': ['url'],
    img: [...(defaultSchema.attributes?.img ?? []), 'loading', 'decoding'],
  },
};

interface MarkdownRendererProps { content: string; }

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmbeds]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={{
          'youtube-embed': ({ videoid }: any) => <YoutubeEmbed videoId={videoid} />,
          'vimeo-embed': ({ videoid }: any) => <VimeoEmbed videoId={videoid} />,
          'instagram-embed': ({ url }: any) => <InstagramEmbed url={url} />,
          'tiktok-embed': ({ url }: any) => <TiktokEmbed url={url} />,
          'facebook-embed': ({ url }: any) => <FacebookEmbed url={url} />,
          img: ({ src, alt }: any) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" />
          ),
        } as Components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
