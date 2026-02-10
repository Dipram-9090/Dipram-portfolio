import React, { useRef, useMemo } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

const IndiProjectSection = ({ text }) => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const planeRef = useRef(null);
  const pathRef = useRef(null);
  const trailRef = useRef(null);

  // --- 1. Generate Tapered Particles ---
  // We create 30 particles.
  // Instead of random, we calculate radius based on index 'i'.
  // i=0 is closest to plane (Radius 4). i=29 is furthest (Radius 0.5).
  const particles = useMemo(() => {
    const count = 15;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      // Taper Logic: Start big (4px), shrink linearly to small (0.5px)
      r: 4 - (i / count) * 3.5, 
      // Fade Logic: Start opaque (0.8), fade to transparent (0)
      opacity: 0.8 - (i / count) * 0.8, 
    }));
  }, []);

  useGSAP(
    () => {
      // --- 2. Text Animation ---
      const split1 = new SplitText(text1Ref.current, {
        type: "chars,words",
        charsClass: "char",
      });
      const split2 = new SplitText(text2Ref.current, {
        type: "chars,words",
        charsClass: "char",
      });

      const tlText = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      });

      tlText.fromTo(
        split1.chars,
        { y: "0vw" },
        { y: "-11.5vw", stagger: 0.03, ease: "none", duration: 0.2 }
      );
      tlText.fromTo(
        split2.chars,
        { y: "0vw" },
        { y: "-11.5vw", stagger: 0.03, ease: "none", duration: 0.2 },
        "<0.05"
      );

      // --- 3. Plane & Trail Motion ---
      const tlPlane = gsap.timeline({
        repeat: -1,
        defaults: { duration: 5, ease: "linear" },
      });

      // Combine Plane + All Particles into one target array
      const targets = [planeRef.current, ...trailRef.current.children];

      tlPlane.to(targets, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        // Very tight stagger keeps the big particles close to the plane
        stagger: {
          each: 0.08,
          repeat: -1,
        },
      });

      // --- 4. Trail Turbulence ---
      // We animate scale slightly around 1 (e.g., 0.8 to 1.2).
      // Since SVG transform scale multiplies the base radius 'r', 
      // the large particles stay large and small ones stay small.
      gsap.to(trailRef.current.children, {
        scale: "random(0.8, 1.5)", // Subtle pulsation
        // x: "random(-0.02, 0.02)", // Slight jitter for "smoke" effect
        // y: "random(-0.02, 0.02)",
        duration: "random(0.2, 0.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 1,
          from: "random",
        },
      });

      return () => {
        split1.revert();
        split2.revert();
      };
    },
    { scope: containerRef }
  );

  const pathData =
    "M616.736 6.9532C456.736 -54.0468 285.736 373.953 95.7357 368.953C-94.2642 363.953 37.4214 41.0248 175.736 67.9532C288.736 89.9532 342.714 445.953 509.736 445.953C718.149 445.953 776.736 67.9532 616.736 6.9532Z";

  return (
    <div className="relative bg-[#271CD0] lg:h-screen md:h-[50vh] h-[30vh] w-full flex items-center justify-center">
      <svg
        viewBox="0 0 710 447"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-10 w-1/2 overflow-visible"
      >
        <path ref={pathRef} d={pathData} fill="none" stroke="none" />

        {/* Trail Group */}
        <g ref={trailRef}>
          {particles.map((p) => (
            <circle
              key={p.id}
              r={p.r}
              fill="white"
              opacity={p.opacity}
              // transformBox: "fill-box" ensures scaling happens from the center of the circle
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </g>

        {/* Plane Group */}
        <g ref={planeRef}>
          <path
            d="M0.607892 0.0140339C0.759267 -0.0157448 0.916117 0.00218182 1.05711 0.0648152L1.05906 0.0667683L13.2446 5.55993C13.3764 5.61915 13.4883 5.71595 13.5669 5.83728C13.6453 5.95858 13.687 6.10004 13.687 6.2445C13.6867 6.38937 13.645 6.53134 13.5659 6.65271C13.4868 6.77412 13.3732 6.86934 13.2407 6.9281L1.05906 12.4203C0.917043 12.481 0.759457 12.4978 0.607892 12.4681C0.456456 12.4384 0.317966 12.363 0.209455 12.2533L0.186994 12.2318C-0.0195566 12.0058 -0.0544266 11.6821 0.0795719 11.4066C0.0821896 11.4009 0.0853181 11.3957 0.088361 11.39L1.82762 7.05798C1.86883 6.98084 1.9302 6.91584 2.00438 6.8695C2.07842 6.82329 2.16325 6.79755 2.25047 6.79431L11.6557 6.46423C11.6845 6.46417 11.7131 6.45863 11.7397 6.44763C11.7665 6.43652 11.7915 6.4203 11.812 6.39978C11.8325 6.37928 11.8488 6.35427 11.8598 6.32751C11.8709 6.3009 11.8764 6.27231 11.8764 6.24353C11.8764 6.21451 11.8709 6.18537 11.8598 6.15857C11.8488 6.13191 11.8323 6.10772 11.812 6.08728C11.7915 6.06676 11.7665 6.05053 11.7397 6.03942C11.7131 6.02838 11.6846 6.02191 11.6557 6.02185L2.24852 5.68982C2.16129 5.68657 2.07648 5.66083 2.00242 5.61462C1.92825 5.56828 1.86688 5.50328 1.82567 5.42614L0.0873844 1.09704L0.081525 1.08435C0.0127785 0.946306 -0.0118272 0.790538 0.0112125 0.638057C0.0343307 0.485483 0.103811 0.343359 0.210431 0.231807C0.317186 0.120218 0.456378 0.0439055 0.607892 0.0140339Z"
            fill="white"
            transform="scale(3)"
          />
        </g>
      </svg>

      <div
        ref={containerRef}
        className="h-[11.5vw] flex flex-col items-center justify-start gap-0 overflow-hidden"
      >
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