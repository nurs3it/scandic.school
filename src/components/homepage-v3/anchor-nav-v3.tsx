"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { ANCHOR_ENTRIES } from "./anchor-nav-v3-config";

export function AnchorNavV3() {
  const { locale } = useLocale();
  const [activeId, setActiveId] = useState<string>(ANCHOR_ENTRIES[0].id);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const list = listRef.current;
    const item = itemRefs.current[activeId];
    if (!list || !item) return;
    const target = item.offsetLeft - list.clientWidth / 2 + item.offsetWidth / 2;
    list.scrollTo({ left: target, behavior: "smooth" });
  }, [activeId]);

  useEffect(() => {
    const sections = ANCHOR_ENTRIES
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-16 md:top-18 z-40 w-full bg-white/95 backdrop-blur border-b border-brand-navy-100"
    >
      <div className="container mx-auto px-2 md:px-4">
        <ul
          ref={listRef}
          className="flex gap-2 md:gap-3 overflow-x-auto py-2.5 md:py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          {ANCHOR_ENTRIES.map((entry) => {
            const isActive = activeId === entry.id;
            return (
              <li
                key={entry.id}
                ref={(el) => { itemRefs.current[entry.id] = el; }}
                className="flex-shrink-0"
              >
                <a
                  href={`#${entry.id}`}
                  onClick={(e) => handleClick(e, entry.id)}
                  className={[
                    "inline-flex items-center px-3.5 md:px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-secondary-700 text-white"
                      : "bg-mint-accent/30 text-secondary-800 hover:bg-mint-accent/50",
                  ].join(" ")}
                >
                  {entry.label[locale]}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
