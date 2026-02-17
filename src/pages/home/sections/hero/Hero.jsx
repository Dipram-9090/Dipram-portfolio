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
  
  useGSAP(() => {
    // Reduced delay to 0.5s (3s is too long unless you have a loading screen)
    const tl = gsap.timeline({ delay: 2.8 });

    // STEP 1: The Main Text (DIPRAM)
    // Reveal from bottom-up using clip-path. This creates a "curtain" effect.
    tl.fromTo(
      DIPRAMbgRef.current,
      {
        clipPath: "inset(0 100% 0 0)", // Hidden at right
        translateX: "50%", // Slight vertical shift
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)", // Fully revealed
        translateX: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      "<",
    );

    // STEP 2: The Hero Image
    // Overlaps with text animation (starts 0.8s earlier).
    // Adds a subtle scale effect (1.1 -> 1) to make it feel 3D.
    tl.from(heroImgRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // STEP 3: Subtitles (Graphic Designer / UI/UX)
    // We animate the specific <p> tags inside the ref
    tl.fromTo(
      titleRef.current.children,
      {
        clipPath: "inset(0 100% 0 0)",
        // translateX: "50%",
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        // translateX: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=1.0",
    );

    // STEP 4: Action Buttons
    // A slight "pop" effect (back.out) makes them feel clickable/tactile
    tl.fromTo(
      buttonsRef.current.children,
      {
        // y: 40,
        opacity: 0, // Force Start,
        pointerEvents: "none",
      },
      {
        // y: 0,
        opacity: 1, // Force End
        duration: 0.8,
        ease: "power2.inOut",
        pointerEvents: "auto",
      },
      "-=0.5",
    );

    // FIX: Do the same for socials just in case
    tl.fromTo(
      socialsRef.current,
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.5",
    );
  }, []); 


  useGSAP(() => {
    const parallax = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    parallax.to(
      socialsRef.current,
      {
        translateY: -150,
        force3D: true,
      },
      0,
    );
    parallax.to(
      buttonsRef.current,
      {
        translateY: -150,
        force3D: true,
      },
      0,
    );
    parallax.to(
      heroImgRef.current,
      {
        translateY: 50,
        force3D: true,
      },
      0,
    );
    parallax.to(
      mainTextRef.current,
      {
        translateY: 150,
        force3D: true,
      },
      0,
    );
  }, []);

  return (
    <div
      ref={heroSectionRef}
      className="hero-section relative overflow-hidden w-full min-h-screen lg:h-[115vh]"
    >
      <WavyGradient noiseIntensity={4} />

      {/* --- Profile Image --- */}
      <div
        ref={heroImgRef}
        className="absolute w-full h-full pointer-events-none z-5"
      >
        <img
          src="/img/hero/hero-img.webp"
          alt="Profile Image"
          className="absolute h-[90vh] md:h-[90vh] lg:h-full object-cover -translate-x-[50%] left-[50%] bottom-0 z-10"
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
            <p className="text-left ">Graphic Designer</p>
            <p className="text-right ">UI/UX Designer</p>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      {/* ADDED REF HERE */}
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
      {/* ADDED REF HERE */}
      <div
        ref={socialsRef}
        className="lg:flex md:hidden hidden absolute z-20 bottom-8 left-0 w-full justify-center lg:justify-start lg:bottom-48 lg:left-0 lg:w-auto lg:px-8 text-white will-change-transform"
      >
        <Socials />
      </div>
    </div>
  );
};

export default Hero;
