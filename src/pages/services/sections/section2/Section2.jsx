import "./servicesSection2.css";

import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Section2 = () => {
  const scrollRef = useRef(null);
  useGSAP(
    () => {
      // ============================
      // TEXT (CHARACTER) ANIMATION
      // ============================
      const split = new SplitText(".section2Class", {
        type: "chars,words",
        charsClass: "char",
      });

      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 60%",
          end: "80% 40%",
          scrub: 0.05,
          toggleActions: "play reverse play reverse",
        },
        opacity: 0.07,
        // filter: "blur(4px)",
        stagger: { amount: 1.5 },
        ease: "power2.out",
      });
    },
    { scope: scrollRef },
    [],
  );
  return (
    <div
      ref={scrollRef}
      className="w-full flex flex-col items-center gap-20 lg:gap-40 my-10 lg:my-15 py-40 px-5 lg:px-20 font-euclid font-medium text-center text-white text-3xl md:text-5xl lg:text-7xl leading-tight"
    >
      <h1 className="section2Class">
        I offer <span>structured design and front-end development support</span>{" "}
        across <span>product, brand</span> and
        <span>interactive digital experiences</span> — working with teams that
        value <span>clarity, consistency, and reliability</span> over one-off
        outputs.
        <br />
        <br />
        Each service is{" "}
        <span> built to move seamlessly from design to development </span>,
        combining <span> UI/UX, visual systems, </span> and{" "}
        <span> motion-driven front-end </span> execution to create experiences
        that grow with the product.
      </h1>
    </div>
  );
};

export default Section2;
