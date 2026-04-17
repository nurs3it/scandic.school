'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

interface Props { tags: string[]; active?: string; }

export function TagFilter({ tags, active }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  if (tags.length === 0) return null;

  const toggle = (tag: string) => {
    const p = new URLSearchParams(params.toString());
    if (active === tag) p.delete('tag'); else p.set('tag', tag);
    router.push(`/news${p.toString() ? `?${p.toString()}` : ''}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map(t => {
        const selected = active === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => toggle(t)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              selected
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            #{t}{selected && <X className="inline h-3 w-3 ml-1" />}
          </button>
        );
      })}
    </div>
  );
}
