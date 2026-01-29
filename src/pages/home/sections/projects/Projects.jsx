import { useRef } from "react";
import WavyGradient from "../../../../components/WavyGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FilledPROJECTS from "./components/FilledPROJECTS";
import OutlinePROJECTS from "./components/OutlinePROJECTS";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);
  const bgRef = useRef(null);
  const filledRef = useRef(null);
  const outlineRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play reverse play reverse",
          scrub: 0.3,
        },
        duration: 1,
      });

      const commonFrom = {
        opacity: 0,
        ease: "expoScale",
      };
      
      tl.from([filledRef.current, outlineRef.current, bgRef.current],commonFrom);
    },
    { scope: projectsRef },
  );

  return (
    <div
      ref={projectsRef}
      className="projects-section relative overflow-hidden origin-bottom lg:h-screen md:h-screen h-[70vh] w-full flex items-center justify-center text-4xl font-euclid font-semibold"
    >
      <div ref={bgRef} className="absolute h-full w-full">
        <WavyGradient direction={0} color3="#FFFFFF" />
      </div>

      <img
        ref={imgRef}
        className="absolute bottom-0 lg:h-[110vh] md:h-screen h-[70vh] object-cover md:object-cover z-20"
        src="/img/projects/main-img.png"
        alt=""
      />

      <FilledPROJECTS className="absolute z-10 w-full lg:bottom-0 md:bottom-40 bottom-60" ref={filledRef} />
      <OutlinePROJECTS className="absolute z-30 w-full lg:bottom-0 md:bottom-40 bottom-60" ref={outlineRef} />
    </div>
  );
};

export default Projects;
