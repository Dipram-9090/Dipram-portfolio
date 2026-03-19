import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import AboutHero from "./sections/aboutHero/AboutHero";
import MarqueeBlue from "../../components/marquee/MarqueeBlue";
import MarqueeWhite from "../../components/marquee/MarqueeWhite";
import Section2 from "./sections/section 2/Section2";
import Section3 from "./sections/section3/Section3";
import Footer from "../../components/Footer";
import Section4 from "./sections/section4/Section4";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col overflow-hidden">
      
      {/* About hero */}
      <div className="relative w-full">
        <AboutHero />
        <div className="absolute translate-y-32 -translate-x-3 rotate-4 bottom-0 z-100 w-max">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 -translate-x-3 -rotate-2 bottom-0 z-99 w-max">
          <MarqueeWhite />
        </div>
      </div>
      
      {/* Section 2 */}
      <div className="relative w-full">
        <Section2 />
        <div className="absolute translate-y-32 -translate-x-3 rotate-4 bottom-0 z-100 w-max">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 -translate-x-3 -rotate-2 bottom-0 z-99 w-max">
          <MarqueeWhite />
        </div>
      </div>
      
      {/* Section 3 */}
      <div className="relative w-full">
        <Section3 />
        <div className="absolute translate-y-32 -translate-x-3 rotate-4 bottom-0 z-100 w-max">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 -translate-x-3 -rotate-2 bottom-0 z-99 w-max">
          <MarqueeWhite />
        </div>
      </div>

      <Section4 />

      <Footer />
      {/* <div className="mt-40 h-screen w-full bg-[#131313]"></div> */}
    </div>
  );
};

export default About;