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

  const particles = useMemo(() => {
    const count = 15;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      r: 8 - (i / count) * 5,
      opacity: 0.8 - (i / count) * 0.8,
    }));
  }, []);

  useGSAP(
    () => {
      // --- Text Animation (Unchanged) ---
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
        { y: "-11.5vw", stagger: 0.03, ease: "none", duration: 0.2 },
      );
      tlText.fromTo(
        split2.chars,
        { y: "0vw" },
        { y: "-11.5vw", stagger: 0.03, ease: "none", duration: 0.2 },
        "<0.05",
      );

      // --- Plane & Trail Motion ---
      const tlPlane = gsap.timeline({
        repeat: -1,
        defaults: { duration: 6, ease: "linear" },
      });

      // KEY CHANGE 1: We select the 'children' of trailRef,
      // which are now the <g> wrappers, NOT the circles.
      const wrapperTargets = [planeRef.current, ...trailRef.current.children];

      tlPlane.to(wrapperTargets, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        stagger: {
          each: 0.04,
          repeat: -1,
        },
      });

      // --- Trail Turbulence ---
      // KEY CHANGE 2: We target the specific class '.trail-circle'
      // to animate the shape INSIDE the moving wrapper.
      gsap.to(".trail-circle", {
        scale: "random(0.2, 1.8)",
        // KEY CHANGE 3: Increased values. SVG units are pixels.
        // 0.002 is invisible. 3px is visible.
        x: "random(-10, 10)",
        y: "random(-30, 30)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      return () => {
        split1.revert();
        split2.revert();
      };
    },
    { scope: containerRef },
  );

  const pathData =
    "M616.736 6.9532C456.736 -54.0468 285.736 373.953 95.7357 368.953C-94.2642 363.953 37.4214 41.0248 175.736 67.9532C288.736 89.9532 342.714 445.953 509.736 445.953C718.149 445.953 776.736 67.9532 616.736 6.9532Z";

  return (
    <div
      ref={containerRef}
      className="relative bg-[#271CD0] lg:h-screen md:h-[50vh] h-[30vh] w-full flex items-center justify-center"
    >
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
            // KEY CHANGE 4: The Wrapper <g>
            // This <g> gets moved by motionPath along the curve
            <g key={p.id}>
              <circle
                className="trail-circle" // Class for selecting in GSAP
                r={p.r}
                fill="white"
                opacity={p.opacity}
                // transformBox is vital here so the circle scales from its own center
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            </g>
          ))}
        </g>

        {/* Plane Group */}
        <g ref={planeRef}>
          <path
            d="M62.0875 0.0483447C62.6073 -0.0542382 63.1459 0.00751602 63.63 0.223278L63.6367 0.230006L105.481 19.1531C105.934 19.3571 106.318 19.6905 106.588 20.1085C106.857 20.5264 107 21.0136 107 21.5113C106.999 22.0103 106.856 22.4994 106.584 22.9175C106.312 23.3357 105.922 23.6638 105.467 23.8662L63.6367 42.7859C63.1491 42.995 62.6079 43.0531 62.0875 42.9507C61.5674 42.8482 61.0919 42.5887 60.7193 42.2106L60.6421 42.1366C59.9328 41.3581 59.8131 40.243 60.2732 39.2939C60.2822 39.2744 60.293 39.2562 60.3034 39.2367L66.2759 24.3136C66.4174 24.0479 66.6282 23.8239 66.8829 23.6643C67.1371 23.5051 67.4284 23.4165 67.7279 23.4053L100.025 22.2682C100.124 22.268 100.222 22.2489 100.313 22.211C100.405 22.1728 100.491 22.1169 100.561 22.0462C100.632 21.9756 100.688 21.8894 100.726 21.7973C100.763 21.7056 100.783 21.6071 100.783 21.5079C100.783 21.408 100.764 21.3076 100.726 21.2153C100.688 21.1234 100.631 21.0401 100.561 20.9697C100.491 20.899 100.405 20.8431 100.313 20.8048C100.222 20.7668 100.124 20.7445 100.025 20.7443L67.7212 19.6005C67.4217 19.5893 67.1305 19.5007 66.8762 19.3415C66.6214 19.1818 66.4107 18.9579 66.2692 18.6922L60.3001 3.77913L60.28 3.7354C60.0439 3.25987 59.9594 2.72328 60.0385 2.198C60.1179 1.67241 60.3565 1.18282 60.7226 0.798539C61.0892 0.414131 61.5672 0.151247 62.0875 0.0483447Z"
            fill="white"
            transform="scale(1.2)"
          />
          <circle cx="3" cy="22" r="3" fill="white" fill-opacity="0.1" />
        </g>
      </svg>

      <div className="h-[11.5vw] flex flex-col items-center justify-start gap-0 overflow-hidden">
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

<svg
  width="107"
  height="43"
  viewBox="0 0 107 43"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
></svg>;
