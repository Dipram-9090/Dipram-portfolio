import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ScrollBar = () => {
  const trackRef = useRef(null);
  const timeOutRef = useRef(null); // Ref to store the timer ID

  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [opacity, setOpacity] = useState(0); // Start invisible

  const dragging = useRef(false);
  const isHovering = useRef(false); // Track hover state

  /* ---------- calculate thumb size & visibility ---------- */
  const updateThumb = () => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // 1. Calculate Geometry
    const ratio = winHeight / docHeight;
    const offset = winHeight * 0.02; // 2vh
    const newHeight = winHeight * ratio - offset;

    setThumbHeight(newHeight);
    setThumbTop(window.scrollY * ratio);

    // 2. Check if scrollbar is needed (content overflow)
    const trackHeight = winHeight * 0.98;
    if (newHeight >= trackHeight - 2) {
      setOpacity(0); // Force hide if content fits on screen
      return;
    }

    // 3. Activity Logic: Show scrollbar
    setOpacity(1);

    // Clear existing hide timer
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    // Set new hide timer ONLY if not dragging and not hovering
    if (!dragging.current && !isHovering.current) {
      timeOutRef.current = setTimeout(() => {
        setOpacity(0);
      }, 1000); // Hide after 1 second of inactivity
    }
  };

  /* ---------- scroll + resize ---------- */
  useEffect(() => {
    // Initial calculation
    updateThumb();

    window.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    return () => {
      window.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);

  /* ---------- drag logic ---------- */
  const onMouseDown = () => {
    dragging.current = true;
    document.body.style.userSelect = "none";
    
    // Ensure visible and clear timer immediately
    setOpacity(1);
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    const track = trackRef.current.getBoundingClientRect();
    const ratio = document.documentElement.scrollHeight / window.innerHeight;

    let newTop = e.clientY - track.top - thumbHeight / 2;
    newTop = Math.max(0, Math.min(newTop, track.height - thumbHeight));

    window.scrollTo({
      top: newTop * ratio,
      behavior: "auto",
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.body.style.userSelect = "auto";

    // If we aren't hovering, restart the hide timer immediately after release
    if (!isHovering.current) {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            setOpacity(0);
        }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [thumbHeight]);

  /* ---------- Hover Handlers ---------- */
  const handleMouseEnter = () => {
    isHovering.current = true;
    setOpacity(1);
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    // Only start timer if not currently dragging
    if (!dragging.current) {
        timeOutRef.current = setTimeout(() => {
            setOpacity(0);
        }, 1000);
    }
  };

  /* ---------- UI ---------- */
  return (
    <motion.div
      ref={trackRef}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
      // Added hover listeners to keep it visible when trying to grab it
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed lg:right-2 md:right-2 right-1 my-[1vh] h-[98vh] w-2 bg-white/10 rounded-full z-1001"
    >
      <motion.button
        onMouseDown={onMouseDown}
        style={{
          height: thumbHeight,
          y: thumbTop,
        }}
        className="w-full bg-[#5043FA] rounded-full cursor-grab active:cursor-grabbing"
      />
    </motion.div>
  );
};

export default ScrollBar;