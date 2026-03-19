import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import Footer from "../../components/Footer";
import ServicesHero from "./sections/servicesHero/ServicesHero";
import MarqueeWhite from "../../components/marquee/MarqueeWhite";
import MarqueeBlue from "../../components/marquee/MarqueeBlue";
import Section2 from "./sections/section2/Section2";
import Section3 from "./sections/section3/Section3";
import Section4 from "./sections/section4/Section4";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Only run if Lenis exists and we have a specific scroll target
    if (!lenis || location.state?.scrollTo !== "services1") return;

    const target = document.querySelector(".services1");

    // Clear the navigation state immediately so refreshing doesn't trigger scroll again
    window.history.replaceState({}, document.title);

    if (!target) return;

    // ⭐ THE FIX: Delay slightly to allow the new page to render fully
    setTimeout(() => {
      // Force Lenis to acknowledge the new page height
      lenis.resize();

      lenis.scrollTo(target, {
        immediate: true,
        force: true, // Force scroll even if Lenis thinks it's busy
      });
    }, 100); // 100ms delay
  }, [location.state?.resetAnimation]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Services hero */}
      <div className="relative w-full">
        <ServicesHero />
        <div className="absolute -translate-x-8 lg:translate-y-35 md:translate-y-27 translate-y-25 lg:rotate-4 md:rotate-4 rotate-5 bottom-0 z-100 w-max">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-7 -translate-x-2 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-99 w-max">
          <MarqueeWhite />
        </div>
      </div>

      <div className="relative w-full">
        <Section2 />
        <div className="absolute -translate-x-8 lg:translate-y-35 md:translate-y-27 translate-y-25 lg:rotate-4 md:rotate-4 rotate-5 bottom-0 z-100 w-max">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-7 -translate-x-2 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-99 w-max">
          <MarqueeWhite />
        </div>
      </div>
      <div className="relative w-full">
        <Section3 />
        <div className="absolute -translate-x-8 lg:translate-y-35 md:translate-y-27 translate-y-25 lg:rotate-4 md:rotate-4 rotate-5 bottom-0 z-100 w-max">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-7 -translate-x-2 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-99 w-max">
          <MarqueeWhite />
        </div>
      </div>

      <Section4 />

      <Footer />
    </div>
  );
};

export default Services;
