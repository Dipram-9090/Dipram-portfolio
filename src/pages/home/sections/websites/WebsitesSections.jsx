import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Mock Data Structure for Websites
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
  },
  {
    id: 2,
    title: "Events Page | Srijan 2026",
    description:
      "A collaborative high-performance Hackathon site with seamless cart interactions and a dark-mode-first design. I was responsible for key parts of the UI/UX, front-end development, and motion interactions—focusing on performance, responsiveness, and smooth user experience across heavy visual assets.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Motion"],
    videoSrc: "/videos/srijan-website.webm",
    liveLink: "https://srijanju.in/events",
    githubLink: "https://github.com/codeclubjusl/Srijan26/pulse?period=monthly",
  },
];

// 2. Extracted Sub-component for individual GSAP scoping
const WebsiteRow = ({ item }) => {
  const containerRef = useRef(null);
  
  // ADDED: State and Ref for Lazy Loading Video
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoWrapperRef = useRef(null);

  // ADDED: Intersection Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the video container comes within 200px of the viewport, render the video
        if (entries[0].isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect(); // Stop observing once it's loaded
        }
      },
      {
        rootMargin: "200px", // Loads slightly before the user scrolls to it
      }
    );

    if (videoWrapperRef.current) {
      observer.observe(videoWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers when the top of the row is 75% down the screen
          toggleActions: "play none none reverse",
        },
      });

      // Animate the text and buttons up from the bottom
      tl.from(".anim-web-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })
        // Animate the video frame up and slightly scale it up
        .from(
          ".anim-web-video",
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full gap-10"
    >
      {/* TOP: Details & Buttons (Centered) */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center">
        <h3 className="anim-web-text text-5xl font-medium text-white md:text-6xl lg:text-7xl font-bebas">
          {item.title}
        </h3>

        <p className="anim-web-text max-w-2xl mt-6 text-base text-gray-400 lg:text-lg font-euclid">
          {item.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="anim-web-text flex flex-wrap justify-center gap-3 mt-6">
          {item.techStack.map((tech, index) => (
            <p
              key={index}
              className="px-4 py-1 text-sm font-medium text-white bg-[#5043FA] rounded-full font-euclid"
            >
              {tech}
            </p>
          ))}
        </div>

        {/* Action Buttons */}
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

      {/* BOTTOM: Large Laptop/Browser Video Mockup */}
      <div className="anim-web-video flex items-center justify-center w-full max-w-7xl mx-auto">
        {/* The Mockup Frame */}
        <div className="w-full overflow-hidden bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl shadow-black/60">
          {/* Mockup Top Bar (macOS style dots) */}
          <div className="flex items-center w-full h-10 px-4 gap-2 bg-[#2a2a2a] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>

          {/* ADDED: ref={videoWrapperRef} to track intersection */}
          <div ref={videoWrapperRef} className="relative w-full aspect-80/39 bg-black">
            
            {/* ADDED: Conditional rendering so it only mounts when near the viewport */}
            {isVideoVisible && (
              <video
                src={item.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Main Component
const WebsitesSection = () => {
  return (
    <div className="w-full bg-[#131313] flex flex-col px-4 md:px-8 py-40 gap-60 overflow-hidden">
      {/* Map through the data */}
      {websitesData.map((item) => (
        <WebsiteRow key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WebsitesSection;