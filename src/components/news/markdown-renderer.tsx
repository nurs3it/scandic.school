'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { YoutubeEmbed } from '@/components/embeds/youtube-embed';
import { VimeoEmbed } from '@/components/embeds/vimeo-embed';
import { InstagramEmbed } from '@/components/embeds/instagram-embed';
import { TiktokEmbed } from '@/components/embeds/tiktok-embed';
import { FacebookEmbed } from '@/components/embeds/facebook-embed';

interface EditorJsBlock {
  id?: string;
  type: string;
  data: Record<string, any>;
  tunes?: Record<string, any>;
}

interface EditorJsContent {
  time?: number;
  version?: string;
  blocks: EditorJsBlock[];
}

interface MarkdownRendererProps {
  content: string;
}

function parseContent(content: string): EditorJsBlock[] {
  try {
    const parsed: EditorJsContent = JSON.parse(content);
    if (parsed && Array.isArray(parsed.blocks)) return parsed.blocks;
  } catch {
    // Fallback for legacy plain-text / markdown content
    if (content.trim()) {
      return [{ type: 'paragraph', data: { text: content } }];
    }
  }
  return [];
}

function extractYoutubeId(url: string): string | null {
  const m =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/youtube\.com\/embed\/([^?]+)/) ||
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/youtube-nocookie\.com\/embed\/([^?]+)/);
  return m ? m[1] : null;
}

function extractVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function EmbedBlock({ data }: { data: Record<string, any> }) {
  const source = data.embed || data.source || '';
  const caption = data.caption || '';
  const service = (data.service || '').toLowerCase();

  const ytId = extractYoutubeId(source);
  if (ytId || service === 'youtube') {
    return <YoutubeEmbed videoId={ytId || source} />;
  }

  const vimeoId = extractVimeoId(source);
  if (vimeoId || service === 'vimeo') {
    return <VimeoEmbed videoId={vimeoId || source} />;
  }

  if (service === 'instagram' || source.includes('instagram.com')) {
    const origUrl = data.source || source;
    return <InstagramEmbed url={origUrl} />;
  }

  if (service === 'tiktok' || source.includes('tiktok.com')) {
    return <TiktokEmbed url={data.source || source} />;
  }

  if (service === 'facebook' || source.includes('facebook.com')) {
    return <FacebookEmbed url={data.source || source} />;
  }

  // Generic iframe embed
  return (
    <div className="my-6">
      <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-md">
        <iframe
          src={source}
          title={caption || 'Embedded content'}
          loading="lazy"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {caption && (
        <p className="mt-2 text-center text-sm text-gray-500 italic">{caption}</p>
      )}
    </div>
  );
}

function ListItems({ items, style }: { items: any[]; style: string }) {
  const Tag = style === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag className={style === 'ordered' ? 'list-decimal pl-6 my-4 space-y-1' : 'list-disc pl-6 my-4 space-y-1'}>
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : (item.content || item.text || '');
        const children = typeof item === 'object' && Array.isArray(item.items) && item.items.length > 0
          ? item.items
          : null;
        return (
          <li key={i} className="text-base leading-relaxed">
            {/* Content from Editor.js tools is sanitized by each tool's built-in sanitize config */}
            <span dangerouslySetInnerHTML={{ __html: text }} />
            {children && <ListItems items={children} style={style} />}
          </li>
        );
      })}
    </Tag>
  );
}

function BlockRenderer({ block }: { block: EditorJsBlock }) {
  const { type, data, tunes } = block;
  const alignment = tunes?.alignmentTune?.alignment || data.alignment || '';
  const alignClass = alignment === 'center' ? 'text-center'
    : alignment === 'right' ? 'text-right'
    : alignment === 'justify' ? 'text-justify'
    : '';

  switch (type) {
    case 'paragraph':
      return (
        <p
          className={`text-base leading-relaxed mb-4 ${alignClass}`}
          dangerouslySetInnerHTML={{ __html: data.text || '' }}
        />
      );

    case 'header': {
      const level = data.level || 2;
      const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
      const sizes: Record<number, string> = {
        1: 'text-3xl font-bold mt-10 mb-4',
        2: 'text-2xl font-bold mt-8 mb-3',
        3: 'text-xl font-bold mt-6 mb-3',
        4: 'text-lg font-bold mt-5 mb-2',
        5: 'text-base font-bold mt-4 mb-2',
        6: 'text-sm font-bold mt-4 mb-2',
      };
      return (
        <Tag
          className={`${sizes[level] || sizes[2]} ${alignClass}`}
          dangerouslySetInnerHTML={{ __html: data.text || '' }}
        />
      );
    }

    case 'list':
      return <ListItems items={data.items || []} style={data.style || 'unordered'} />;

    case 'checklist':
      return (
        <ul className="my-4 space-y-2 list-none pl-0">
          {(data.items || []).map((item: any, i: number) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                item.checked
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-gray-300'
              }`}>
                {item.checked && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span
                className={`text-base leading-relaxed ${item.checked ? 'line-through text-gray-400' : ''}`}
                dangerouslySetInnerHTML={{ __html: item.text || '' }}
              />
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-amber-500 bg-amber-50 rounded-r-lg pl-5 pr-4 py-3 my-6 italic text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: data.text || '' }} />
          {data.caption && (
            <footer className="mt-2 text-sm text-gray-500 not-italic">
              &mdash; {data.caption}
            </footer>
          )}
        </blockquote>
      );

    case 'warning':
      return (
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 my-5">
          <span className="text-2xl flex-shrink-0">&#9888;</span>
          <div>
            {data.title && <div className="font-bold text-sm mb-1">{data.title}</div>}
            <div
              className="text-sm text-amber-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.message || '' }}
            />
          </div>
        </div>
      );

    case 'code':
      return (
        <pre className="bg-slate-800 text-slate-200 rounded-xl p-5 my-5 overflow-x-auto text-sm leading-relaxed">
          <code>{data.code || ''}</code>
        </pre>
      );

    case 'delimiter':
      return (
        <div className="my-8 text-center text-2xl tracking-[0.5em] text-gray-300 select-none">
          * * *
        </div>
      );

    case 'image': {
      const src = (data.file && data.file.url) || data.url || '';
      if (!src) return null;
      return (
        <figure className={`my-6 ${data.withBackground ? 'bg-gray-50 p-4 rounded-xl' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={data.caption || ''}
            loading="lazy"
            decoding="async"
            className={`rounded-xl ${data.stretched ? 'w-full' : 'max-w-2xl mx-auto'} ${
              data.withBorder ? 'border-2 border-gray-200' : ''
            }`}
          />
          {data.caption && (
            <figcaption
              className="mt-2 text-center text-sm text-gray-500 italic"
              dangerouslySetInnerHTML={{ __html: data.caption }}
            />
          )}
        </figure>
      );
    }

    case 'embed':
      return <EmbedBlock data={data} />;

    case 'table': {
      if (!data.content || !data.content.length) return null;
      const withHeadings = data.withHeadings;
      return (
        <div className="my-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {withHeadings && data.content[0] && (
              <thead>
                <tr>
                  {data.content[0].map((cell: string, j: number) => (
                    <th
                      key={j}
                      className="border border-gray-200 bg-gray-50 px-4 py-2.5 text-left font-bold"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {data.content.slice(withHeadings ? 1 : 0).map((row: string[], i: number) => (
                <tr key={i}>
                  {row.map((cell: string, j: number) => (
                    <td
                      key={j}
                      className="border border-gray-200 px-4 py-2.5"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'linkTool': {
      const href = data.link || '#';
      const meta = data.meta || {};
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex border border-gray-200 rounded-xl overflow-hidden my-5 no-underline text-inherit hover:shadow-md transition-shadow"
        >
          {meta.image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={meta.image.url} alt="" className="w-16 h-16 object-cover flex-shrink-0" />
          )}
          <div className="p-3.5 flex-1 min-w-0">
            <div className="font-bold text-sm truncate">{meta.title || href}</div>
            {meta.description && (
              <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{meta.description}</div>
            )}
            <div className="text-xs text-gray-400 mt-1 truncate">{href}</div>
          </div>
        </a>
      );
    }

    case 'attaches': {
      const fileUrl = data.file?.url || '#';
      const fileName = data.title || data.file?.name || 'File';
      const fileSize = data.file?.size
        ? `${(data.file.size / 1024).toFixed(1)} KB`
        : '';
      const ext = data.file?.extension || '';
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 my-5 no-underline text-inherit hover:shadow-md transition-shadow"
        >
          <span className="text-3xl flex-shrink-0">&#128206;</span>
          <div>
            <div className="font-semibold text-sm">
              {fileName}{ext ? ` .${ext}` : ''}
            </div>
            {fileSize && <div className="text-xs text-gray-400">{fileSize}</div>}
          </div>
        </a>
      );
    }

    case 'raw':
      return (
        <div
          className="my-5"
          dangerouslySetInnerHTML={{ __html: data.html || '' }}
        />
      );

    default:
      return null;
  }
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseContent(content);

  if (blocks.length === 0) return null;

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary">
      {blocks.map((block, i) => (
        <BlockRenderer key={block.id || i} block={block} />
      ))}
    </div>
  );
}
