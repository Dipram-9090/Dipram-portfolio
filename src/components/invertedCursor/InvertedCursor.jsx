import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap"; 
import "./invertedCursor.css"; 
import CursorIcon from "../iconComponents/CursorIcon";
import { useLocation } from "react-router-dom";

const InvertedCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const { pathname } = useLocation();

  // Reset hover state on page navigation
  useEffect(() => {
    setIsHovering(false);
  }, [pathname]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 1. Mouse Movement
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Optional GSAP implementation:
      // gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    };

    // 2. Hover Detection (Event Delegation)
    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setIsHovering(false);
      }
    };

    // 3. Click Detection (NEW LOGIC)
    // We triggers this on 'mousedown' for instant feedback before the 'click' completes.
    const handleMouseDown = (e) => {
       // If the user clicks on a clickable element, forcedly remove the hover effect
       if (e.target.closest("a, button, .hover-target")) {
         setIsHovering(false);
       }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    // Add the new listener
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      // Clean up the new listener
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`inverted-cursor ${isHovering ? "hovering" : ""}`}
    >
        <CursorIcon 
            color="#FFFFFF" 
            stroke="black" 
            strokeWidth={1} 
            size={25} 
            className={`arrow-cursor ${isHovering ? "hovering" : ""} translate-3.5`} 
        />
    </div>
  );
};

export default InvertedCursor;