import React, { useRef, useMemo, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const postersData = [
  {
    id: 1,
    title: "DualSense Edge Wireless Controller",
    description:
      "Designed to reflect the evolving aesthetics of gaming hardware, this poster blends technical detailing with a clean, modern layout. The focus was on balancing information with visual appeal while maintaining a strong, premium identity across different mockup environments.",
    mainPoster: "/img/posters/poster-1-main.webp",
    mockups: [
      "/img/posters/poster-1-mockup-1.webp",
      "/img/posters/poster-1-mockup-2.webp",
      "/img/posters/poster-1-mockup-3.webp",
    ],
  },
  {
    id: 2,
    title: "911 GT3 RS",
    description:
      "Inspired by the raw performance and racing heritage of Porsche, this poster focuses on translating speed into a visual form. The use of dynamic shapes, strong color hierarchy, and multiple perspectives of the vehicle creates a sense of motion and intensity within a static frame.",
    mainPoster: "/img/posters/poster-2-main.webp",
    mockups: [
      "/img/posters/poster-2-mockup-1.webp",
      "/img/posters/poster-2-mockup-2.webp",
      "/img/posters/poster-2-mockup-3.webp",
      "/img/posters/poster-2-mockup-4.webp",
    ],
  },
];

const LazyImage = memo(({ src, alt, className = "" }) => (
  <div
    className={`w-full h-full bg-[#1e1e1e] ${className}`}
    style={{ contain: "layout paint" }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
));
LazyImage.displayName = "LazyImage";

const PosterRow = memo(({ item }) => {
  /**
   * PIN FIX — three refs instead of two:
   *
   * outerRef   → the full-width row wrapper. Used as ScrollTrigger `trigger`
   *              AND as the `pin` target's end-boundary. Must be a plain div
   *              with no fixed height so ScrollTrigger can measure it freely.
   *
   * leftColRef → the element we actually want to pin. Must NOT have a fixed
   *              height class (removed `lg:h-[80vh]`) — GSAP injects its own
   *              inline height/transform during pinning and a competing CSS
   *              height breaks the calculation.
   *
   * rightColRef → the scrollable mockup column. Its natural scrolled height
   *              determines how long the pin lasts. ScrollTrigger uses
   *              `end: "bottom bottom"` on `outerRef` which equals the bottom
   *              of the taller column — so the pin releases exactly when the
   *              right column finishes scrolling into view.
   *
   * WHY pinSpacing: true (default):
   *   With `pinSpacing: false` inside a CSS Grid, the grid collapses the
   *   pinned column's space the moment GSAP lifts it out of flow, causing the
   *   right column to shift left and overlap. Keeping pinSpacing: true lets
   *   GSAP insert a spacer that holds the grid cell open.
   *
   * WHY trigger === outerRef (not leftColRef):
   *   The trigger controls WHEN the pin starts/ends. If trigger === leftColRef,
   *   ScrollTrigger measures only the left column's height, so `end: "bottom
   *   bottom"` resolves too early and the pin releases before the right column
   *   finishes. Using outerRef (which wraps both columns) gives the correct
   *   full-row height for the end calculation.
   */
  const outerRef    = useRef(null);
  const leftColRef  = useRef(null);
  const rightColRef = useRef(null);

  const mockupElements = useMemo(
    () =>
      item.mockups.map((imgSrc, index) => (
        <div
          key={index}
          className="anim-mockup w-full max-w-md bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg"
        >
          <LazyImage src={imgSrc} alt={`${item.title} Mockup ${index + 1}`} />
        </div>
      )),
    [item.mockups, item.title]
  );

  useGSAP(
    () => {
      // Entry animations — scoped to outerRef so selectors are isolated per row
      gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
        .from(".anim-text", {
          x: -100, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        })
        .from(".anim-poster", {
          x: -100, opacity: 0, duration: 1.2, ease: "power3.out",
        }, "<+=0.2")
        .from(".anim-mockup", {
          x: 100, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        }, "<+=0.3");

      // Pin — desktop only
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          // trigger = the whole row so end-boundary uses full row height
          trigger:    outerRef.current,
          // pin = only the left column
          pin:        leftColRef.current,
          start:      "top 50px",
          // end when the BOTTOM of the outer row hits the BOTTOM of the viewport
          end:        "bottom bottom",
          // pinSpacing: true (default) — keeps the grid cell open while pinned
          pinSpacing: true,
        });
        return () => {};
      });

      return () => mm.revert();
    },
    { scope: outerRef }
  );

  return (
    /**
     * outerRef on the row — no fixed height, let content define it.
     * `items-start` keeps both columns top-aligned before the pin kicks in.
     */
    <div
      ref={outerRef}
      className="relative grid items-start grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
    >
      {/* LEFT — pinned column. NO fixed height (removed lg:h-[80vh]). */}
      <div
        ref={leftColRef}
        className="w-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 lg:p-8"
      >
        <div className="flex flex-col items-start justify-center w-full">
          <h3 className="text-3xl font-medium text-left text-white anim-text md:text-5xl lg:text-6xl font-bebas">
            {item.title}
          </h3>
          <p className="max-w-md mt-6 text-sm text-left text-gray-400 anim-text md:text-base font-euclid">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-center w-full anim-poster">
          <LazyImage
            src={item.mainPoster}
            alt={item.title}
            className="max-h-[85vh] max-w-full shadow-2xl shadow-black/50 bg-transparent"
          />
        </div>
      </div>

      {/* RIGHT — scrollable mockups column. ref used only for height measurement. */}
      <div
        ref={rightColRef}
        className="flex flex-col items-center w-full gap-8 pt-4 pb-12 lg:col-span-1 lg:gap-12 lg:pt-24"
      >
        {mockupElements}
      </div>
    </div>
  );
});

PosterRow.displayName = "PosterRow";

const PosterSection = () => (
  <div className="w-full bg-[#131313] flex flex-col px-4 md:px-8 py-24 gap-32">
    {postersData.map((item) => (
      <PosterRow key={item.id} item={item} />
    ))}
  </div>
);

export default PosterSection;