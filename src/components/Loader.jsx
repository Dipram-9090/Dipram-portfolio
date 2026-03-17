import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LOADER_PATHS = [
  "M713.897 544.023L680.868 517.784V517.779V503.396L688.288 512.525L713.897 544.023Z",
  "M718.384 462.432V491.186L688.288 512.525L680.868 503.396L718.384 462.432Z",
  "M736.102 476.439V561.562L718.384 547.556V462.432L736.102 476.439Z",
  "M761.319 536.946L736.1 561.562V538.361L755.471 528.301L761.319 536.946Z",
  "M761.321 525.263V536.946L755.473 528.301L741.562 507.746L761.321 525.263Z",
];

const Loader = ({ fullScreen = true }) => {
  const loaderRef = useRef(null);

  useGSAP(() => {
    // Create an infinitely looping timeline for the loading state
    const tl = gsap.timeline({ repeat: -1 });

    // Blink IN with stagger
    tl.to(".loader-parts", {
      opacity: 1,
      duration: 0.2,
      stagger: 0.05,
    })
    // Blink OUT with stagger
    .to(".loader-parts", {
      opacity: 0,
      duration: 0.2,
      stagger: 0.05,
    }, "+=0.3"); // Adds a tiny pause before they blink out again

    // Continuous smooth pulsing for the text
    gsap.fromTo(".loadingPara", 
      { opacity: 0.3 },
      {
        opacity: 1,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      }
    );

  }, { scope: loaderRef });

  return (
    <div 
      ref={loaderRef}
      className={`relative overflow-hidden ${
        fullScreen ? 'fixed inset-0 z-[9999] w-screen h-screen' : 'w-full h-full min-h-[400px]'
      }`}
    >
      {/* SVG Loader Layer (Matches your Transition layout perfectly) */}
      <div className="absolute top-0 left-0 w-full h-full z-20">
        <svg
          viewBox="0 0 1440 1024"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          fill="none"
        >
          {/* Deep Purple Background */}
          <rect width="100%" height="100%" fill="#000" />
          
          {/* Logo Parts */}
          {LOADER_PATHS.map((d, i) => (
            <path
              key={i}
              className="loader-parts"
              opacity="0"
              d={d}
              fill="white"
            />
          ))}
        </svg>
      </div>

      {/* Loading Text (Matches the exact coordinates of your transition) */}
      <p className="loadingPara absolute z-30 top-[80vh] left-[50%] -translate-x-[50%] font-bebas font-medium text-white text-xl md:text-2xl tracking-widest text-center">
        Loading...
      </p>
    </div>
  );
};

export default Loader;