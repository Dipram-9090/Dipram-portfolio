import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText"; // Ensure you have the Club GSAP plugin installed
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Don't forget to register SplitText if you haven't elsewhere!
gsap.registerPlugin(ScrollTrigger, SplitText); 

const IndiProjectSection = ({ text }) => {
  // 1. Create a ref for the main container (for ScrollTrigger)
  const containerRef = useRef(null);
  
  // 2. Create specific refs for the text elements you want to split
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useGSAP(() => {
    // 3. Pass the DOM nodes (refs) to SplitText instead of string selectors
    const split1 = new SplitText(text1Ref.current, {
      type: "chars,words",
      charsClass: "char",
    });
    
    const split2 = new SplitText(text2Ref.current, {
      type: "chars,words",
      charsClass: "char",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // Triggers when THIS specific container is in view
        start: "top 60%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    });

    // Animate the chars directly from the split instances
    tl.fromTo(
      split1.chars,
      { y: "0vw" },
      { y: "-11.5vw", stagger: { amount: 0.3 }, ease: "none", duration: 0.2 }
    );
    
    tl.fromTo(
      split2.chars,
      { y: "0vw" },
      { y: "-11.5vw", stagger: { amount: 0.3 }, ease: "none", duration: 0.2 },
      "<0.05"
    );

    // Cleanup is handled automatically by useGSAP for animations, 
    // but SplitText modifies the DOM, so explicit revert is good practice here.
    return () => {
      split1.revert();
      split2.revert();
    };
  }, { scope: containerRef }); // Optional: Scope safeguards selectors if you added any later

  return (
    <div className="bg-[#271CD0] lg:h-screen md:h-[50vh] h-[30vh] w-full flex items-center justify-center">
      {/* Attach the containerRef here */}
      <div
        ref={containerRef}
        className="h-[11.5vw] flex flex-col items-center justify-start gap-0 overflow-hidden"
      >
        {/* Attach text refs directly to the h1 tags */}
        <h1 
          ref={text1Ref} 
          className="font-bebas uppercase text-[15vw] leading-[10vw] pt-[1.5vw] font-medium text-white"
        >
          {text}
        </h1>
        <h1 
          ref={text2Ref} 
          className="font-bebas uppercase text-[15vw] leading-[10vw] pt-[1.5vw] font-medium text-white"
        >
          {text}
        </h1>
      </div>
    </div>
  );
};

export default IndiProjectSection;