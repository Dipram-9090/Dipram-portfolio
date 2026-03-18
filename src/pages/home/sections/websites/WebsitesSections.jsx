import React, { useRef, useState, useEffect, memo, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Static data outside component
const websitesData = [
  {
    id: 1,
    title: "Synchronicity Season 2",
    description:
      "A collaborative high-performance hackathon website. I led the implementation of complex, motion-driven interactions—alongside UI/UX and front-end development—bringing the interface to life while ensuring performance, responsiveness, and a smooth user experience across heavy visual assets.",
    techStack: ["React", "Tailwind CSS", "GSAP", "Motion", "Lenis"],
    videoSrc: "/videos/synchronicity-website.webm",
    liveLink: "https://synchronicity.ju-acm.com/home",
    githubLink:
      "https://github.com/JU-ACM/Syncronicity-2026/pulse?period=monthly",
    bgColor: "#0b2b7c", // Deep dark gray (Default)
  },
  {
    id: 2,
    title: "Events Page | Srijan 2026",
    description: "A collaborative high-performance Hackathon site with seamless cart interactions and a dark-mode-first design. I was responsible for key parts of the UI/UX, front-end development, and motion interactions—focusing on performance, responsiveness, and smooth user experience across heavy visual assets.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Motion"],
    videoSrc: "/videos/srijan-website.webm",
    liveLink: "https://srijanju.in/events",
    githubLink: "https://github.com/codeclubjusl/Srijan26/pulse?period=monthly",
    bgColor: "#4f0000", // Slate 900 for a subtle shift
  },
];

/**
 * LazyVideo — replaces the manual IntersectionObserver pattern
 *
 * OPTIMIZATION NOTES:
 * 1. Uses a single shared IntersectionObserver option with a 200px rootMargin —
 *    same behaviour as the original but encapsulated cleanly.
 * 2. The <video> mounts only when visible; autoPlay fires naturally on mount
 *    so the browser never has to buffer a video off-screen.
 * 3. preload="none" signals the browser not to fetch video data until it's
 *    actually mounted (defence-in-depth on top of conditional rendering).
 * 4. memo() prevents re-render when WebsiteRow re-renders during GSAP ticks.
 */
const LazyVideo = memo(({ src }) => {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // empty deps — el ref is stable, runs once on mount

  return (
    <div
      ref={wrapperRef}
      className="relative w-full aspect-[80/39] bg-black"
      // Reserves layout space before video mounts — prevents CLS
      style={{ contain: "layout" }}
    >
      {isVisible && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
});

LazyVideo.displayName = "LazyVideo";

/**
 * WebsiteRow
 *
 * OPTIMIZATION NOTES:
 * 1. Single unified GSAP timeline instead of two separate `.from()` calls —
 *    one ScrollTrigger instance per row, fewer listeners on scroll events.
 * 2. Tech stack pills memoized — array map only re-runs if techStack changes.
 * 3. Action buttons extracted as stable JSX (no inline arrow functions on
 *    hot-path elements — avoids creating new function objects every render).
 * 4. memo() wraps the whole row — rows don't re-render when siblings change.
 */
const WebsiteRow = memo(({ item }) => {
  const containerRef = useRef(null);

  const techPills = useMemo(
    () =>
      item.techStack.map((tech, index) => (
        <p
          key={index}
          className="px-4 py-1 text-sm font-medium text-white bg-[#5043FA] rounded-full font-euclid"
        >
          {tech}
        </p>
      )),
    [item.techStack],
  );

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .from(".anim-web-text", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        })
        .from(
          ".anim-web-video",
          { y: 60, opacity: 0, scale: 0.95, duration: 1.2, ease: "power3.out" },
          "-=0.8",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="website-color-trigger flex flex-col items-center justify-center w-full gap-10"
      data-bg-color={item.bgColor}
    >
      {/* Details block */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center">
        <h3 className="anim-web-text text-5xl font-medium text-white md:text-6xl lg:text-7xl font-bebas">
          {item.title}
        </h3>
        <p className="anim-web-text max-w-2xl mt-6 text-base text-white/80 lg:text-lg font-euclid">
          {item.description}
        </p>

        <div className="anim-web-text flex flex-wrap justify-center gap-3 mt-6">
          {techPills}
        </div>

        <div className="anim-web-text flex flex-wrap justify-center gap-4 mt-8 w-full sm:w-auto">
          <a
            href={item.liveLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center cursor-pointer duration-200 hover:bg-[#19E6B6] font-euclid font-medium text-black uppercase text-lg md:text-xl bg-white rounded-full px-8 py-2 lg:px-12 text-center w-full sm:w-auto"
          >
            Live Website
          </a>
          <a
            href={item.githubLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center cursor-pointer duration-200 hover:bg-[#19E6B6] hover:ring-[#19E6B6] hover:text-black font-euclid font-medium text-white uppercase text-lg md:text-xl ring-3 ring-inset ring-white rounded-full px-8 py-2 lg:px-12 text-center w-full sm:w-auto"
          >
            GitHub Repo
          </a>
        </div>
      </div>

      {/* Browser mockup with lazy video */}
      <div className="anim-web-video flex items-center justify-center w-full max-w-7xl mx-auto">
        <div className="w-full overflow-hidden bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl shadow-black/60">
          {/* macOS-style top bar */}
          <div className="flex items-center w-full h-10 px-4 gap-2 bg-[#2a2a2a] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <LazyVideo src={item.videoSrc} />
        </div>
      </div>
    </div>
  );
});

WebsiteRow.displayName = "WebsiteRow";

const WebsitesSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Grab all the rows that act as color triggers
      const triggers = gsap.utils.toArray(".website-color-trigger");

      triggers.forEach((trigger) => {
        const color = trigger.dataset.bgColor;

        ScrollTrigger.create({
          trigger: trigger,
          start: "top 50%", // Triggers when the top of the row hits the middle of the viewport
          end: "bottom 50%",
          onEnter: () =>
            gsap.to(sectionRef.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(sectionRef.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      // Removed the hardcoded bg-[#131313] Tailwind class so GSAP can control it smoothly.
      // Set an initial inline style instead to prevent a flash of unstyled background.
      style={{ backgroundColor: "#0b2b7c" }}
      className="w-full flex flex-col px-4 md:px-8 py-40 gap-60 overflow-hidden"
    >
      {websitesData.map((item) => (
        <WebsiteRow key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WebsitesSection;