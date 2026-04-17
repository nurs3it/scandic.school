import type { Root, Paragraph, Link, Text } from 'mdast';
import { visit } from 'unist-util-visit';

export type EmbedProvider = 'youtube' | 'vimeo' | 'instagram' | 'tiktok' | 'facebook';

export interface EmbedNode {
  type: 'embed';
  provider: EmbedProvider;
  props: Record<string, string>;
  data: { hName: string; hProperties: Record<string, string> };
}

const PROVIDERS: Array<{
  provider: EmbedProvider;
  test: (url: URL) => Record<string, string> | null;
}> = [
  {
    provider: 'youtube',
    test: u => {
      if (/(^|\.)youtube\.com$/.test(u.hostname) && u.searchParams.get('v')) {
        return { videoId: u.searchParams.get('v')! };
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.replace(/^\/+/, '').split('/')[0];
        if (id) return { videoId: id };
      }
      return null;
    },
  },
  {
    provider: 'vimeo',
    test: u => {
      if (/(^|\.)vimeo\.com$/.test(u.hostname)) {
        const id = u.pathname.split('/').filter(Boolean)[0];
        if (id && /^\d+$/.test(id)) return { videoId: id };
      }
      return null;
    },
  },
  {
    provider: 'instagram',
    test: u => {
      if (/(^|\.)instagram\.com$/.test(u.hostname) && /\/(p|reel|tv)\//.test(u.pathname)) {
        return { url: u.toString() };
      }
      return null;
    },
  },
  {
    provider: 'tiktok',
    test: u => {
      if (/(^|\.)tiktok\.com$/.test(u.hostname) && /\/video\/\d+/.test(u.pathname)) {
        return { url: u.toString() };
      }
      return null;
    },
  },
  {
    provider: 'facebook',
    test: u => {
      if (/(^|\.)facebook\.com$/.test(u.hostname)) {
        if (u.pathname.startsWith('/watch') && u.searchParams.get('v')) return { url: u.toString() };
        if (/\/videos\/\d+/.test(u.pathname)) return { url: u.toString() };
      }
      return null;
    },
  },
];

const PROVIDER_HNAME: Record<EmbedProvider, string> = {
  youtube: 'youtube-embed',
  vimeo: 'vimeo-embed',
  instagram: 'instagram-embed',
  tiktok: 'tiktok-embed',
  facebook: 'facebook-embed',
};

function detect(url: string): { provider: EmbedProvider; props: Record<string, string> } | null {
  let parsed: URL;
  try { parsed = new URL(url); } catch { return null; }
  for (const p of PROVIDERS) {
    const props = p.test(parsed);
    if (props) return { provider: p.provider, props };
  }
  return null;
}

function bareLink(paragraph: Paragraph): string | null {
  if (paragraph.children.length !== 1) return null;
  const only = paragraph.children[0];
  if (only.type === 'link') {
    const link = only as Link;
    if (link.children.length === 1 && link.children[0].type === 'text') {
      const inner = (link.children[0] as Text).value.trim();
      if (inner === link.url || inner === '') return link.url;
    }
    return link.url;
  }
  if (only.type === 'text') {
    const txt = (only as Text).value.trim();
    if (/^https?:\/\/\S+$/.test(txt)) return txt;
  }
  return null;
}

export function remarkEmbeds() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const url = bareLink(node as Paragraph);
      if (!url) return;
      const detected = detect(url);
      if (!detected) return;
      const embed: EmbedNode = {
        type: 'embed',
        provider: detected.provider,
        props: detected.props,
        data: {
          hName: PROVIDER_HNAME[detected.provider],
          hProperties: detected.props,
        },
      };
      (parent.children as any)[index] = embed;
    });
  };
}
