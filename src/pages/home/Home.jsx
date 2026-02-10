import Hero from "./sections/hero/Hero";
import MarqueeBlue from "../../components/marquee/MarqueeBlue";
import MarqueeWhite from "../../components/marquee/MarqueeWhite";
import AboutPreview from "./sections/about/AboutPreview";
import ServicesPreview from "./sections/servicesPreview/ServicesPreview";
import Projects from "./sections/projects/Projects";
import ScrollBackgroundChange from "../../components/ScrollBackgroundChange";
import IndiProjectSection from "../../components/indiProjectSection/IndiProjectSection";

import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Contact from "./sections/contact/Contact";
import LogoSectionSimpler from "./sections/logoSection/LogoSectionSimpler";
import LogoSectionDesktop from "./sections/logoSection/LogoSectionDestop";

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const sectionSelectors = {
      projects: ".projects-section",
      contact: ".contact-section",
    };

    const scrollType = location.state?.scrollTo;
    const selector = sectionSelectors[scrollType];

    // Only run if Lenis exists and we have a valid selector for the requested scroll
    if (!lenis || !selector) return;

    const target = document.querySelector(selector);

    // Clear the navigation state immediately
    window.history.replaceState({}, document.title);

    if (!target) return;

    // ⭐ THE FIX: Delay slightly to allow the new page to render fully
    setTimeout(() => {
      lenis.resize();
      lenis.scrollTo(target, {
        immediate: true,
        force: true,
      });
    }, 100);
  }, [lenis, location.state]);

  ScrollBackgroundChange();

  return (
    <div className="w-full overflow-hidden">
      {/* Hero */}
      <div className="relative w-full">
        <Hero />
        <div className="absolute lg:translate-y-15 md:translate-y-15 translate-y-10 lg:rotate-4 md:rotate-4 rotate-9 bottom-0 z-20 justify-start w-full">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-19 flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>

      {/* About */}
      <div className="relative w-full">
        <AboutPreview />
        <div className="absolute lg:translate-y-15 md:translate-y-15 translate-y-10 lg:rotate-4 md:rotate-4 rotate-9 bottom-0 z-20 justify-start w-full">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-19 flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>

      {/* Services Preview */}
      <div className="js-color-stop" data-background-color="rgb(19,19,19)">
        <ServicesPreview />
      </div>

      {/* Projects */}
      <div className="js-color-stop" data-background-color="rgb(255,255,255)">
        <Projects />
        <div className="flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>

      {/* Logofolio */}
      <div className="w-full overflow-hidden">
      <IndiProjectSection text="Logofolio" />
        <div className="flex justify-start w-full ">
          <MarqueeBlue />
        </div>
      </div>

      {/* LogoSectionDesktop */}
      {/* <div className="w-full hidden lg:block">
        <LogoSectionDesktop />
        <div className="flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div> */}

      {/* LogoSectionSimpler */}
      <div className=" w-full ">
        <LogoSectionSimpler />
        <div className="flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>

      {/* Brand Identity */}
      <div className="w-full overflow-hidden">
      <IndiProjectSection text="Brand Identity" />
        <div className="flex justify-start w-full ">
          <MarqueeBlue />
        </div>
      </div>

      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
