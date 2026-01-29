import React, { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GoToTop = ({ lenis }) => {
  const btnRef = useRef(null);
  const timeOutRef = useRef(null);
  const isHovering = useRef(false);
  const isInScrollZone = useRef(false); // Tracks if we are past the 300px mark

  const scrollToTop = () => {
    const target = document.querySelector(".hero-section");
    if (!target) return;

    const currentScroll = window.scrollY;
    const targetTop = target.getBoundingClientRect().top + currentScroll;
    const distance = Math.abs(targetTop - currentScroll);
    const duration = Math.min(Math.max(distance / 1200, 1.2), 1.8);

    lenis.scrollTo(0, {
      duration,
      ease: "power4.in",
    });
  };

  // --- Visibility Logic ---
  const handleActivity = () => {
    // 1. If we are at the top of the page (<300px), do nothing (keep hidden)
    if (!isInScrollZone.current) return;

    // 2. Show button immediately on any activity
    gsap.to(btnRef.current, {
      autoAlpha: 1,
      duration: 0.3,
      overwrite: "auto", // Prevents conflict with hiding animation
    });

    // 3. Clear existing hide timer
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    // 4. Set new hide timer ONLY if not hovering
    if (!isHovering.current) {
      timeOutRef.current = setTimeout(() => {
        gsap.to(btnRef.current, {
          autoAlpha: 0,
          duration: 0.3,
        });
      }, 1000); // Hide after 1 second
    }
  };

  // --- Scroll Listener (for inactivity timer) ---
  useEffect(() => {
    window.addEventListener("scroll", handleActivity);
    return () => {
      window.removeEventListener("scroll", handleActivity);
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);

  // --- Hover Handlers ---
  const handleMouseEnter = () => {
    isHovering.current = true;
    handleActivity(); // Ensure it stays visible/wakes up
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    handleActivity(); // Start the 1s timer immediately
  };

  // --- GSAP ScrollTrigger (Zone Detection) ---
  useGSAP(() => {
    gsap.set(btnRef.current, {
      autoAlpha: 0,
    });

    ScrollTrigger.create({
      start: 300,
      onEnter: () => {
        // Entered the "active" zone (> 300px)
        isInScrollZone.current = true;
        handleActivity();
      },
      onLeaveBack: () => {
        // Returned to top of page (< 300px) - Force hide
        isInScrollZone.current = false;
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        gsap.to(btnRef.current, {
          autoAlpha: 0,
          duration: 0.3,
        });
      },
    });
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-10 right-10 z-1000 w-13 h-13 aspect-square rounded-full bg-[#5043FA] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
      style={{
        boxShadow: `
          0 8px 20px rgba(0, 0, 0, 0.12),
          0 2px 6px rgba(0, 0, 0, 0.08)
        `,
      }}
    >
      <ArrowUp size={30} color="#FFFFFF" strokeWidth={3} />
    </button>
  );
};

export default GoToTop;