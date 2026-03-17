import Socials from "./components/Socials";
import WavyGradient from "../../../../components/WavyGradient";
import ProjectsButton from "../../../../components/ProjectsButton";
import ContactButton from "../../../../components/ContactButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // 1. Create refs for all distinct elements
  const heroSectionRef = useRef(null);
  const heroImgRef = useRef(null);
  const DIPRAMbgRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialsRef = useRef(null);
  const mainTextRef = useRef(null);
  const wavyGradientRef = useRef(null);

  useGSAP(() => {
    // Adjusted delay to 0.5s as per your original comment
    const tl = gsap.timeline({ delay: 3.3 });

    // STEP 1: The Hero Image (Cinematic entrance)
    // Adding a slight scale-down + upward movement creates a much more premium 3D feel
    tl.fromTo(
      heroImgRef.current,
      {
        opacity: 0,
        scale: 1.05,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
      }
    );

    // STEP 2: The Main Text (DIPRAM)
    // Restored your side clipping (left-to-right wipe) and horizontal shift
    // Kept the expo.out ease for that premium, snappy finish
    tl.fromTo(
      DIPRAMbgRef.current,
      {
        clipPath: "inset(0 100% 0 0)", // Clipped from the right (hidden)
        xPercent: 50, // Slight horizontal shift instead of vertical
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)", // Fully revealed
        xPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: "expo.out",
      },
      "-=1.2" // Overlaps with the image entrance
    );

    // STEP 3: Subtitles (Graphic Designer / UI/UX)
    // Added the side clip here too, keeping the beautiful off-beat stagger
    tl.fromTo(
      titleRef.current.children,
      {
        clipPath: "inset(0 100% 0 0)",
        x: 20, // Horizontal shift to match the main text's flow
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        x: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15, // Left text reveals slightly before right text
        ease: "power3.out",
      },
      "-=1.0"
    );

    // STEP 4: Action Buttons
    // Added a scale property and a `back.out` ease to create a tactile, snappy "pop"
    tl.fromTo(
      buttonsRef.current.children,
      {
        y: 30,
        opacity: 0,
        scale: 0.9, // Start slightly smaller
        pointerEvents: "none",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1, // Snap to full size
        duration: 0.8,
        ease: "back.out(1.7)", // The tactile "pop" effect
        pointerEvents: "auto",
      },
      "-=0.6"
    );

    // STEP 5: Socials
    tl.fromTo(
      socialsRef.current,
      {
        x: -30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, { scope: heroSectionRef });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          if (isMobile) return;

          // Parallax Timeline
          const parallax = gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
            // Added ease: "none" to defaults so parallax movements track the scroll exactly 1:1
            defaults: { ease: "none", force3D: true } 
          });

          // Condensed the parallax calls since defaults handles force3D
          parallax
            .to(socialsRef.current, { y: -100 }, 0) // Used 'y' instead of 'translateY' (GSAP best practice)
            .to(buttonsRef.current, { y: -100 }, 0)
            .to(heroImgRef.current, { y: 50 }, 0)
            .to(mainTextRef.current, { y: 100 }, 0)
            .to(".wavyGradient-class", { y: 500 }, 0); 
        }
      );
    },
    { scope: heroSectionRef }
  );

  return (
    <div
      ref={heroSectionRef}
      className="hero-section relative overflow-hidden w-full min-h-screen lg:h-[115vh] bg-[#dfddff]"
    >
      <WavyGradient ref={wavyGradientRef} noiseIntensity={4} className=" z-0" />

      {/* --- Profile Image --- */}
      <div
        ref={heroImgRef}
        className="absolute w-full h-full pointer-events-none z-5"
      >
        <img
          src="/img/hero/hero-img.webp"
          alt="Profile Image"
          className="absolute h-[90vh] md:h-[90vh] lg:h-full object-cover -translate-x-[50%] left-[50%] bottom-0 "
        />
      </div>

      {/* --- Main Text Content (DIPRAM + Titles) --- */}
      <div className="absolute z-15 md:z-0 lg:z-0 h-screen w-full flex justify-center pointer-events-none">
        <div
          ref={mainTextRef}
          className="flex flex-col absolute top-[50%] md:top-[25%] lg:top-[35%] w-full max-w-[90%] md:max-w-2xl lg:max-w-[60vw] mx-4 gap-4 md:gap-5 will-change-transform"
        >
          {/* Main Text Image */}
          <img
            ref={DIPRAMbgRef}
            src="/svg/DIPRAM-bg.svg"
            className="w-full h-auto"
            alt="DIPRAM"
          />

          {/* Subtitles */}
          <div
            ref={titleRef}
            className="flex md:flex-row items-start md:items-start justify-between w-full font-euclid font-medium text-base md:text-xl lg:text-[1.8vw] uppercase text-white"
          >
            <p className="text-left">Creative Frontend <br /> Developer </p>
            <p className="text-right">UI/UX Designer <br /> Graphic Designer </p>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div
        ref={buttonsRef}
        className="absolute z-10 left-1/2 -translate-x-1/2 bottom-24 md:bottom-32 lg:bottom-48 flex flex-col md:flex-row justify-center items-center gap-4 w-full px-4 will-change-transform"
      >
        <ContactButton
          className="cursor-pointer flex items-center justify-center font-euclid font-medium 
          text-xl md:text-3xl lg:text-[3.5vw] 
          lg:leading-16 uppercase 
          py-3 px-8 md:px-12 lg:px-[3.5vw] lg:py-[1vw] 
          rounded-full hover:bg-white hover:text-black duration-200 bg-[#32C4A2] text-white whitespace-nowrap w-full md:w-auto border-2 md:border-4 lg:border-5 hover:border-white border-[#32C4A2]"
        >
          Work Together
        </ContactButton>

        <ProjectsButton
          className={
            "flex items-center justify-center w-full md:w-auto whitespace-nowrap rounded-full cursor-pointer font-euclid font-medium uppercase text-xl md:text-3xl lg:text-[3.5vw] lg:leading-16 py-3 px-8 md:px-12 lg:px-[3.5vw] lg:py-[1vw] bg-white lg:bg-transparent text-black border-white border-2 md:border-4 lg:border-5 lg:text-white lg:duration-200 lg:hover:text-black lg:hover:bg-white lg:hover:border-white"
          }
        />
      </div>

      {/* --- Socials --- */}
      <div
        ref={socialsRef}
        className="lg:flex md:hidden hidden absolute z-20 bottom-8 left-0 w-full justify-center lg:justify-start lg:bottom-60 lg:left-0 lg:w-auto lg:px-8 text-white will-change-transform"
      >
        <Socials />
      </div>
    </div>
  );
};

export default Hero;