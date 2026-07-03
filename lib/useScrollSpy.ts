"use client";

import { useEffect, useState } from "react";

const NAV_OFFSET = 116;

/**
 * Tracks the last [data-sec] section whose top has passed scrollY + 160,
 * mirroring the reference prototype's rAF-throttled scroll math.
 */
export function useScrollSpy(initial = "signature") {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const secs = document.querySelectorAll<HTMLElement>("[data-sec]");
        const y = window.scrollY + 160;
        let cur = initial;
        secs.forEach((s) => {
          if (s.getBoundingClientRect().top + window.scrollY <= y) {
            cur = s.getAttribute("data-sec") ?? cur;
          }
        });
        setActive(cur);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [initial]);

  return active;
}

export function scrollToSection(id: string) {
  const el = document.querySelector(`[data-sec="${id}"]`);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
      behavior: "smooth",
    });
  }
}
