import React, { memo } from "react";

// Defined outside component — never re-allocated on render
const LOADER_PATHS = [
  "M713.897 544.023L680.868 517.784V517.779V503.396L688.288 512.525L713.897 544.023Z",
  "M718.384 462.432V491.186L688.288 512.525L680.868 503.396L718.384 462.432Z",
  "M736.102 476.439V561.562L718.384 547.556V462.432L736.102 476.439Z",
  "M761.319 536.946L736.1 561.562V538.361L755.471 528.301L761.319 536.946Z",
  "M761.321 525.263V536.946L755.473 528.301L741.562 507.746L761.321 525.263Z",
];

/**
 * OPTIMIZATION NOTES:
 * 1. Replaced GSAP repeat:-1 timelines with pure CSS @keyframes — zero JS overhead,
 *    runs on the compositor thread, no GSAP tick loop kept alive.
 * 2. Removed useRef + useGSAP entirely — no hook overhead for a static animation.
 * 3. memo() prevents re-render if parent re-renders with same props.
 * 4. CSS custom properties drive stagger delay — no JS stagger calculation.
 * 5. will-change: opacity only on animated elements, not wrappers.
 */
const Loader = memo(({ fullScreen = true }) => {
  return (
    <>
      {/* Inject keyframes once via a style tag — avoids a separate CSS file dependency */}
      <style>{`
        @keyframes loader-blink {
          0%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
        }
        @keyframes loader-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .loader-part {
          opacity: 0;
          will-change: opacity;
          animation: loader-blink 1.2s ease-in-out infinite;
        }
        .loader-text {
          animation: loader-pulse 1.6s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`relative overflow-hidden ${
          fullScreen
            ? "fixed inset-0 z-[9999] w-screen h-screen"
            : "w-full h-full min-h-[400px]"
        }`}
      >
        <div className="absolute inset-0 z-20">
          <svg
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
            fill="none"
            aria-hidden="true"
          >
            <rect width="100%" height="100%" fill="#000" />
            {LOADER_PATHS.map((d, i) => (
              <path
                key={i}
                className="loader-part"
                d={d}
                fill="white"
                // CSS custom property drives per-element stagger — no JS needed
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </svg>
        </div>

        <p className="loader-text absolute z-30 top-[80vh] left-1/2 -translate-x-1/2 font-bebas font-medium text-white text-xl md:text-2xl tracking-widest text-center">
          Loading...
        </p>
      </div>
    </>
  );
});

Loader.displayName = "Loader";
export default Loader;