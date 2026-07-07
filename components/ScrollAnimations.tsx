"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Mounted once on the page. Wires GSAP + ScrollTrigger over elements marked
 * with data attributes in the (server-rendered) sections:
 *   [data-reveal]       → trigger container (not animated itself)
 *   [data-reveal-item]  → children that fade + slide up, staggered, on enter
 *   [data-parallax]     → gentle scrub parallax (big faded category numbers)
 * Renders nothing. useGSAP reverts every animation/trigger on unmount.
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Under reduced motion the CSS keeps [data-reveal-item] visible; create nothing.
    if (reduce) return;

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            // Both directions: play on the way down, reverse when scrolled
            // back up past the start so it re-reveals on the next pass.
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Big faded category numbers: slow parallax drift for depth.
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      gsap.to(el, {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  return null;
}
