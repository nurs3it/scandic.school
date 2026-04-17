import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { remarkEmbeds } from './remark-embeds';

function transformed(md: string) {
  const processor = unified().use(remarkParse).use(remarkEmbeds);
  const tree = processor.parse(md);
  return processor.runSync(tree) as any;
}

describe('remarkEmbeds', () => {
  it('converts bare YouTube URL on its own line into youtube node', () => {
    const tree = transformed('Intro\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ\n\nOutro');
    const kinds = tree.children.map((n: any) => n.type);
    expect(kinds).toContain('embed');
    const embed = tree.children.find((n: any) => n.type === 'embed');
    expect(embed.provider).toBe('youtube');
    expect(embed.props.videoId).toBe('dQw4w9WgXcQ');
  });

  it('recognizes youtu.be short links', () => {
    const tree = transformed('https://youtu.be/dQw4w9WgXcQ');
    const embed = tree.children.find((n: any) => n.type === 'embed');
    expect(embed?.provider).toBe('youtube');
    expect(embed?.props.videoId).toBe('dQw4w9WgXcQ');
  });

  it('recognizes Instagram posts and reels', () => {
    const tree = transformed('https://www.instagram.com/p/ABC123/');
    const embed = tree.children.find((n: any) => n.type === 'embed');
    expect(embed?.provider).toBe('instagram');
  });

  it('recognizes TikTok videos', () => {
    const tree = transformed('https://www.tiktok.com/@user/video/1234567890');
    const embed = tree.children.find((n: any) => n.type === 'embed');
    expect(embed?.provider).toBe('tiktok');
  });

  it('recognizes Facebook videos', () => {
    const tree = transformed('https://www.facebook.com/watch/?v=1234567890');
    const embed = tree.children.find((n: any) => n.type === 'embed');
    expect(embed?.provider).toBe('facebook');
  });

  it('recognizes Vimeo videos', () => {
    const tree = transformed('https://vimeo.com/76979871');
    const embed = tree.children.find((n: any) => n.type === 'embed');
    expect(embed?.provider).toBe('vimeo');
    expect(embed?.props.videoId).toBe('76979871');
  });

  it('leaves URL inside a sentence untouched', () => {
    const tree = transformed('Check this https://www.youtube.com/watch?v=abc for info.');
    expect(tree.children.some((n: any) => n.type === 'embed')).toBe(false);
  });
});
