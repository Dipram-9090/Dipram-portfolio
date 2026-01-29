import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";

const LOADER_PATHS = [
  "M713.897 544.023L680.868 517.784V517.779V503.396L688.288 512.525L713.897 544.023Z",
  "M718.384 462.432V491.186L688.288 512.525L680.868 503.396L718.384 462.432Z",
  "M736.102 476.439V561.562L718.384 547.556V462.432L736.102 476.439Z",
  "M761.319 536.946L736.1 561.562V538.361L755.471 528.301L761.319 536.946Z",
  "M761.321 525.263V536.946L755.473 528.301L741.562 507.746L761.321 525.263Z",
];

const MASK_PATH =
  "M736.105 476.441V538.357L755.472 528.304L741.562 507.751L761.321 525.268V536.951L736.105 561.56H736.1L718.384 547.559V491.187L688.288 512.53L713.896 544.028L680.869 517.788V503.399L718.384 462.435L736.105 476.441Z";

const Transition = ({ children }) => {
  const containerRef = useRef(null);
  const location = useLocation();
  const { registerExitAnimation } = useTransition();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Define your responsive logic here
      mm.add(
        {
          // Breakpoints
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1024px)",
          isDesktop: "(min-width: 1025px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions;

          // ============================================
          // CONFIGURATION: TWEAK VALUES HERE
          // ============================================
          let scale, xPercent;

          if (isMobile) {
            scale = 60;
            xPercent = -90;
          } else if (isTablet) {
            scale = 100;
            xPercent = -75;
          } else {
            scale = 150;
            xPercent = -70;
          }

          // 1. ENTRY SETUP
          gsap.set(".transition-overlay", {
            display: "block",
            opacity: 1,
            pointerEvents: "auto",
          });
          gsap.set(".maskSVG", { clearProps: "all", opacity: 0 });
          gsap.set(".loader-logo", { opacity: 1 });
          gsap.set(".loadingPara", { opacity: 1 });
          gsap.set(".exit-layer1", { opacity: 0, scale: 0, xPercent: 0 });
          gsap.set(".exit-layer2", { opacity: 0, scale: 0, xPercent: 0 });

          const tl = gsap.timeline();

          

          // Blinking
          const blinkCount = 4;
          for (let i = 0; i < blinkCount; i++) {
            tl.to(".loader-parts", {
              opacity: i % 2 === 0 ? 0 : 1,
              duration: 0.2,
              stagger: 0.05,
            });
          }

          tl.to(".loadingPara", {
            opacity: 1,
            duration: 0.2,
            ease: "power2.in"
          },"+=0.5")

          // Entry Sequence
          tl.to(".maskSVG", { opacity: 1, duration: 0.1 }, "-=0.1")
            .to(".loader-logo", { opacity: 0, duration: 0.2 })
            .to(".loadingPara", { opacity: 0, duration: 0.2 },"<")
            .to(".maskSVG", {
              scale: scale, // Uses responsive value
              xPercent: xPercent, // Uses responsive value
              duration: 0.3,
              ease: "power3.in",
            })
            .to(".transition-overlay", {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                gsap.set(".transition-overlay", {
                  display: "none",
                  pointerEvents: "none",
                });
              },
            });

          // 2. REGISTER EXIT ANIMATION
          if (registerExitAnimation) {
            registerExitAnimation((onAnimationComplete) => {
              const exitTl = gsap.timeline({ onComplete: onAnimationComplete });

              exitTl
                .set(".transition-overlay", {
                  display: "block",
                  pointerEvents: "auto",
                  opacity: 1,
                })
                .set(".maskSVG", { opacity: 0 })
                .set(".loader-logo", { opacity: 0 })
                .set(".exit-layer1", { display: "block", opacity: 1 })
                .set(".exit-layer2", { display: "block", opacity: 1 })
                .fromTo(
                  ".exit-layer1",
                  { scale: 0, xPercent: 0 },
                  {
                    scale: scale, // Uses responsive value
                    xPercent: xPercent, // Uses responsive value
                    duration: 0.5,
                    ease: "power3.inOut",
                  },
                )
                .fromTo(
                  ".exit-layer2",
                  { scale: 0 },
                  { scale: 1, duration: 0.5, ease: "power3.inOut" },
                  "<",
                );
            });
          }
        },
      );
    },
    { scope: containerRef, dependencies: [location.pathname] },
  );

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* transition overlay */}
      <div className="transition-overlay fixed top-0 left-0 w-screen h-screen z-9999 pointer-events-auto">
        {/* Exit layer div */}
        <div className="exit-layer1 absolute top-0 left-0 w-full h-full z-10 ">
          <svg
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
          >
            <path d={MASK_PATH} fill="#5043FA" />
          </svg>
        </div>
        <div className="exit-layer2 absolute top-0 left-0 w-full h-full z-15 ">
          <svg
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
          >
            <path d={MASK_PATH} fill="#FFFFFF" />
          </svg>
        </div>

        {/* Loader Layer */}
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <svg
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMidYMid slice"
            className="loader-logo w-full h-full"
            fill="none"
          >
            <rect width="100%" height="100%" fill="#5043FA" />
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

        <p className="loadingPara absolute z-31 top-[80vh] left-[50%] -translate-x-[50%] font-bebas font-medium text-white text-xl md:text-xl lg:text-2xl text-center opacity-0">
          Loading...
        </p>

        {/* Mask Layer */}
        <svg
          viewBox="0 0 1440 1024"
          preserveAspectRatio="xMidYMid slice"
          className="maskSVG absolute inset-0 w-full h-full z-30 block"
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <path d={MASK_PATH} fill="black" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#5043FA" mask="url(#mask)" />
        </svg>
      </div>
      <main className="w-full h-full">{children}</main>
    </div>
  );
};

export default Transition;
