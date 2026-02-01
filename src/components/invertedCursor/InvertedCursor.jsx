import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap"; 
import "./invertedCursor.css"; 
import CursorIcon from "../iconComponents/CursorIcon";
import { useLocation } from "react-router-dom";

const InvertedCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // New state for visibility
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
      // Create a smooth follow effect or direct lock
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // OPTIONAL: Ensure visibility on movement (fixes edge case where refresh happens inside window)
      // We use a check to prevent excessive re-renders, only setting it if currently false
      // (However, for performance, relying on mouseenter/leave below is usually sufficient and cleaner)
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

    // 3. Click Detection
    const handleMouseDown = (e) => {
       if (e.target.closest("a, button, .hover-target")) {
         setIsHovering(false);
       }
    };

    // 4. Window Visibility Detection (NEW LOGIC)
    const handleHide = () => setIsVisible(false);
    const handleShow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    
    // Listen for the mouse leaving/entering the viewport
    document.addEventListener("mouseleave", handleHide);
    document.addEventListener("mouseenter", handleShow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      
      document.removeEventListener("mouseleave", handleHide);
      document.removeEventListener("mouseenter", handleShow);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`inverted-cursor ${isHovering ? "hovering" : ""}`}
      // Hide opacity when not visible. Using inline style avoids class conflicts.
      style={{ 
        opacity: isVisible ? 1 : 0, 
        // transition: "opacity 0.2s ease-out" // Optional: smooth fade
      }}
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